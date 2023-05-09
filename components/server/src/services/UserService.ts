import MiniBrandsRepository from "../db/minibrands";
import UserRepository from "../db/user";
import { AchievementCategory, MiniBrand, MiniBrandTag, MiniBrandType } from "../generated/graphql";

export default class UserService {
  userRepository: UserRepository;
  minibrandsRepository: MiniBrandsRepository;

  constructor(userRepository: UserRepository, minibrandsRepository: MiniBrandsRepository) {
    this.userRepository = userRepository;
    this.minibrandsRepository = minibrandsRepository;
  }

  getBasicInfoById = async (id: number) => {
    return this.userRepository.getBasicInfoById(id);
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
}

const getAchievementsByTag = (
  collected: {
    minibrand: MiniBrand & {
      tags: MiniBrandTag[];
      type: MiniBrandType;
    };
  }[],
  tags: MiniBrandTag[],
  minibrands: MiniBrand[]
) => {
  return tags.reduce((result, tag) => {
    const filteredCollected = collected.filter((item) => {
      return item.minibrand.tags.find((itemTag) => itemTag.id === tag.id);
    });
    const filteredMinibrands = minibrands.filter((item) => {
      return item.tags?.find((itemTag) => itemTag.id === tag.id) ?? false;
    });
    if (filteredMinibrands.length === 0) {
      return result;
    }
    result.push({
      type: {
        id: tag.id,
        value: tag.value
      },
      collectedCount: filteredCollected.length,
      totalCount: filteredMinibrands.length
    });
    return result;
  }, [] as AchievementCategory[]);
};

const getAchievementsByType = (
  collected: {
    minibrand: MiniBrand & {
      tags: MiniBrandTag[];
      type: MiniBrandType;
    };
  }[],
  types: MiniBrandType[],
  minibrands: MiniBrand[]
) => {
  return types.reduce((result, type) => {
    const filteredCollected = collected.filter((item) => {
      return item.minibrand.typeId === type.id;
    });
    const filteredMinibrands = minibrands.filter((item) => {
      return item.typeId === type.id;
    });
    if (filteredMinibrands.length === 0) {
      return result;
    }
    result.push({
      type: {
        id: type.id,
        value: type.value
      },
      collectedCount: filteredCollected.length,
      totalCount: filteredMinibrands.length
    });
    return result;
  }, [] as AchievementCategory[]);
};
