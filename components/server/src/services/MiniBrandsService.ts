import MiniBrandsRepository from "../db/minibrands";
import {
  MiniBrandSeriesInput,
  MiniBrandTypeInput,
  MiniBrandTagInput,
  MiniBrandInput,
  UpdateMiniBrandInput,
  CollectMinibrandInput
} from "../generated/graphql";

export default class MiniBrandsService {
  miniBrandsRepository: MiniBrandsRepository;

  constructor(miniBrandsRepository: MiniBrandsRepository) {
    this.miniBrandsRepository = miniBrandsRepository;
  }

  saveMinibrandsMetadata = async (
    types: MiniBrandTypeInput[],
    series: MiniBrandSeriesInput[],
    tags: MiniBrandTagInput[]
  ) => {
    await this.miniBrandsRepository.deleteMinBrandTypes();
    const savedTypes = await Promise.all(
      types.map(async (type) => {
        return this.miniBrandsRepository.createMiniBrandType(type);
      })
    );
    await this.miniBrandsRepository.deleteMiniBrandSeries();
    const savedSeries = await Promise.all(
      series.map(async (seriesItem) => {
        return this.miniBrandsRepository.createMiniBrandSeries(seriesItem);
      })
    );
    await this.miniBrandsRepository.deleteMinBrandTags();
    const savedTags = await Promise.all(
      tags.map(async (tag) => {
        return this.miniBrandsRepository.createMiniBrandTag(tag);
      })
    );
    return {
      types: savedTypes,
      series: savedSeries,
      tags: savedTags
    };
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
}
