import {
  MiniBrandTypeInput,
  MiniBrandSeriesInput,
  MiniBrandTagInput,
  MiniBrandInput,
  MiniBrandTag,
  UpdateMiniBrandInput,
  CollectMinibrandInput,
  UpdateCollectedMinibrandInput
} from "../generated/graphql";
import { PrismaClient } from "@prisma/client";

export default class MiniBrandsRepository {
  db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  getMiniBrands = async () => {
    return await this.db.miniBrand.findMany({
      include: {
        tags: true,
        series: true,
        type: true
      }
    });
  };

  getMiniBrandTypes = async () => {
    return await this.db.miniBrandType.findMany();
  };

  getMiniBrandTypeByValue = async (value: string) => {
    return await this.db.miniBrandType.findUnique({
      where: {
        value
      }
    });
  };

  createMiniBrandType = async (data: MiniBrandTypeInput) => {
    return await this.db.miniBrandType.create({
      data
    });
  };

  deleteMinBrandTypes = async () => {
    return await this.db.miniBrandType.deleteMany();
  };

  deleteMiniBrandTypeById = async (id: number) => {
    return await this.db.miniBrandType.delete({
      where: {
        id
      }
    });
  };

  getMiniBrandSeries = async () => {
    return await this.db.miniBrandSeries.findMany();
  };

  getMiniBrandSeriesByValue = async (value: string) => {
    return await this.db.miniBrandSeries.findUnique({
      where: {
        value
      }
    });
  };

  createMiniBrandSeries = async (data: MiniBrandSeriesInput) => {
    return await this.db.miniBrandSeries.create({
      data
    });
  };
  deleteMiniBrandSeriesById = async (id: number) => {
    return await this.db.miniBrandSeries.delete({
      where: {
        id
      }
    });
  };

  deleteMiniBrandSeries = async () => {
    return await this.db.miniBrandSeries.deleteMany();
  };

  getMiniBrandTags = async () => {
    return await this.db.miniBrandTag.findMany();
  };

  getMiniBrandTagByValue = async (value: string) => {
    return await this.db.miniBrandTag.findUnique({
      where: {
        value
      }
    });
  };
  deleteMiniBrandTagById = async (id: number) => {
    return await this.db.miniBrandTag.delete({
      where: {
        id
      }
    });
  };

  createMiniBrandTag = async (data: MiniBrandTagInput) => {
    return await this.db.miniBrandTag.create({
      data
    });
  };

  deleteMinBrandTags = async () => {
    return await this.db.miniBrandTag.deleteMany();
  };

  createMiniBrand = async (data: MiniBrandInput) => {
    const { name, seriesId, typeId, tagIds, imgUrl } = data;

    const tags = tagIds.map((tagId) => ({ id: tagId }));
    return await this.db.miniBrand.create({
      data: {
        name,
        seriesId,
        typeId,
        imgUrl,
        tags: {
          connect: tags
        }
      },
      include: {
        tags: true
      }
    });
  };

  getMiniBrand = async (id: number) => {
    return this.db.miniBrand.findUnique({
      where: {
        id
      },
      include: {
        tags: true,
        series: true,
        type: true
      }
    });
  };

  updateMiniBrand = async (id: number, input: UpdateMiniBrandInput) => {
    const inputWithoutNulls = {};
    for (const param in input) {
      if (input[param]) inputWithoutNulls[param] = input[param];
    }
    return this.db.miniBrand.update({
      where: {
        id
      },
      data: inputWithoutNulls,
      include: {
        tags: true
      }
    });
  };

  deleteMiniBrand = async (id: number) => {
    return this.db.miniBrand.delete({
      where: {
        id
      },
      include: {
        tags: true
      }
    });
  };

  collectMinibrand = async (id: number, userId: number, input: CollectMinibrandInput) => {
    return this.db.collectedMinibrand.create({
      data: {
        ...input,
        dateCollected: new Date().toUTCString(),
        user: {
          connect: {
            id: userId
          }
        },
        minibrand: {
          connect: {
            id
          }
        }
      },
      include: {
        minibrand: true
      }
    });
  };
  updateCollectedMinibrand = async (
    id: number,
    userId: number,
    input: UpdateCollectedMinibrandInput
  ) => {
    const { quantity } = input;
    if (quantity === 0) {
      return this.db.collectedMinibrand.delete({
        where: {
          userId_minibrandId: {
            userId,
            minibrandId: id
          }
        }
      });
    }
    return this.db.collectedMinibrand.update({
      where: {
        userId_minibrandId: {
          userId,
          minibrandId: id
        }
      },
      data: input
    });
  };
}
