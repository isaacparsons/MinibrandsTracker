import MiniBrandsRepository from "../db/minibrands";
import UserRepository from "../db/user";
import { AchievementCategory } from "../generated/graphql";
import { getAchievementsByTag, getAchievementsByType } from "./utils/achievements";
import FriendsRepository from "../db/friends";

export default class UserService {
  userRepository: UserRepository;
  minibrandsRepository: MiniBrandsRepository;
  friendsRepository: FriendsRepository;

  constructor(
    userRepository: UserRepository,
    minibrandsRepository: MiniBrandsRepository,
    friendsRepository: FriendsRepository
  ) {
    this.userRepository = userRepository;
    this.minibrandsRepository = minibrandsRepository;
    this.friendsRepository = friendsRepository;
  }

  getBasicInfoById = async (id: number) => {
    return this.userRepository.getBasicInfoById(id);
  };

  getAchievementsForUser = async (userId: number, id: number) => {
    const friendShip = await this.friendsRepository.getAcceptedFriendRequest(userId, id);
    if (!friendShip) {
      throw new Error(`No friendship exists between users with id: ${userId} and ${id}`);
    }

    return this.getAchievementsByUserId(id);
  };

  getAchievementsByUserId = async (id: number) => {
    const _collected = await this.userRepository.getCollectedById(id);
    const collected = _collected ? _collected.collected : [];
    const minibrands = await this.minibrandsRepository.getMiniBrands();
    const minibrandTypes = await this.minibrandsRepository.getMiniBrandTypes();
    const minibrandTags = await this.minibrandsRepository.getMiniBrandTags();

    const achievementsByType = minibrandTypes.reduce((result, minibrandType) => {
      const filteredCollected = collected.filter(
        (item) => item.minibrand.typeId === minibrandType.id
      );
      const filteredMinibrands = minibrands.filter((item) => item.typeId === minibrandType.id);
      if (filteredMinibrands.length === 0) {
        return result;
      }
      result.push({
        type: {
          id: minibrandType.id,
          value: minibrandType.value
        },
        totalCount: filteredMinibrands.length,
        collectedCount: filteredCollected.length,
        subCategories: getAchievementsByTag(filteredCollected, minibrandTags, filteredMinibrands)
      });
      return result;
    }, [] as AchievementCategory[]);

    const achievementsByTag = minibrandTags.reduce((result, minibrandTag) => {
      const filteredCollected = collected.filter((item) => {
        return item.minibrand.tags.find((itemTag) => itemTag.id === minibrandTag.id);
      });
      const filteredMinibrands = minibrands.filter((item) => {
        return item.tags?.find((itemTag) => itemTag.id === minibrandTag.id) ?? false;
      });
      if (filteredMinibrands.length === 0) {
        return result;
      }
      result.push({
        type: {
          id: minibrandTag.id,
          value: minibrandTag.value
        },
        totalCount: filteredMinibrands.length,
        collectedCount: filteredCollected.length,
        subCategories: getAchievementsByType(filteredCollected, minibrandTypes, filteredMinibrands)
      });
      return result;
    }, [] as AchievementCategory[]);

    return {
      totalCollected: collected.length,
      type: achievementsByType,
      tag: achievementsByTag
    };
  };

  searchUsers = async (query: string, cursor?: number | null) => {
    return this.userRepository.searchUsers(query, cursor);
  };
}
