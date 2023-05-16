import _ from "lodash";
import MiniBrandsRepository from "../db/minibrands";
import {
  MiniBrandSeriesInput,
  MiniBrandTypeInput,
  MiniBrandTagInput,
  MiniBrandInput,
  UpdateMiniBrandInput,
  CollectMinibrandInput
} from "../generated/graphql";
import FriendsRepository from "../db/friends";

export default class MiniBrandsService {
  miniBrandsRepository: MiniBrandsRepository;
  friendsRepository: FriendsRepository;

  constructor(miniBrandsRepository: MiniBrandsRepository, friendsRepository: FriendsRepository) {
    this.miniBrandsRepository = miniBrandsRepository;
    this.friendsRepository = friendsRepository;
  }

  saveMinibrandsMetadata = async (
    types: MiniBrandTypeInput[],
    series: MiniBrandSeriesInput[],
    tags: MiniBrandTagInput[]
  ) => {
    const existingTypes = await this.miniBrandsRepository.getMiniBrandTypes();
    const typesToDelete = _.differenceWith(
      existingTypes,
      types,
      (val1, val2) => val1.value === val2.value
    );
    const savedTypes = await Promise.all(
      types.map(async (type) => {
        const existingType = existingTypes.find((item) => item.value === type.value);
        if (!existingType) {
          return await this.miniBrandsRepository.createMiniBrandType(type);
        }
        return existingType;
      })
    );
    await Promise.all(
      typesToDelete.map(async (item) => {
        await this.miniBrandsRepository.deleteMiniBrandTypeById(item.id);
      })
    );

    const existingSeries = await this.miniBrandsRepository.getMiniBrandSeries();
    const seriesToDelete = _.differenceWith(
      existingSeries,
      series,
      (val1, val2) => val1.value === val2.value
    );
    const savedSeries = await Promise.all(
      series.map(async (_series) => {
        const _existingSeries = existingSeries.find((item) => item.value === _series.value);
        if (!_existingSeries) {
          return await this.miniBrandsRepository.createMiniBrandSeries(_series);
        }
        return _existingSeries;
      })
    );
    await Promise.all(
      seriesToDelete.map(async (item) => {
        await this.miniBrandsRepository.deleteMiniBrandSeriesById(item.id);
      })
    );

    const existingTags = await this.miniBrandsRepository.getMiniBrandTags();
    const tagsToDelete = _.differenceWith(
      existingTags,
      tags,
      (val1, val2) => val1.value === val2.value
    );
    const savedTags = await Promise.all(
      tags.map(async (tag) => {
        const existingTag = existingTags.find((item) => item.value === tag.value);
        if (!existingTag) {
          return await this.miniBrandsRepository.createMiniBrandTag(tag);
        }
        return existingTag;
      })
    );
    await Promise.all(
      tagsToDelete.map(async (item) => {
        await this.miniBrandsRepository.deleteMiniBrandTagById(item.id);
      })
    );

    return {
      types: savedTypes,
      series: savedSeries,
      tags: savedTags
    };
  };

  getMiniBrands = async () => {
    return this.miniBrandsRepository.getMiniBrands();
  };

  getMiniBrand = async (id: number) => {
    return this.miniBrandsRepository.getMiniBrand(id);
  };

  saveMiniBrand = async (data: MiniBrandInput) => {
    return this.miniBrandsRepository.createMiniBrand(data);
  };

  deleteMiniBrand = async (id: number) => {
    return this.miniBrandsRepository.deleteMiniBrand(id);
  };

  updateMiniBrand = async (id: number, input: UpdateMiniBrandInput) => {
    return this.miniBrandsRepository.updateMiniBrand(id, input);
  };

  collectMinibrand = async (id: number, userId: number, input: CollectMinibrandInput) => {
    return this.miniBrandsRepository.collectMinibrand(id, userId, input);
  };

  updateCollectedMinibrand = async (id: number, userId: number, input: CollectMinibrandInput) => {
    return this.miniBrandsRepository.updateCollectedMinibrand(id, userId, input);
  };

  getCollectedMinibrandsByUserId = async (
    userId: number,
    profileId: number,
    cursor?: number | null
  ) => {
    const friendShip = await this.friendsRepository.getAcceptedFriendRequest(userId, profileId);
    if (!friendShip) {
      throw new Error(`No friendship exists between users with id: ${userId} and ${profileId}`);
    }
    return this.miniBrandsRepository.getCollectedMinibrandsByUserId(profileId, cursor);
  };
}
