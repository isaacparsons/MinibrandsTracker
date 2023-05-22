import { Resolvers } from "../generated/graphql";
import MiniBrandsRepository from "../db/minibrands";
import MiniBrandsService from "../services/MiniBrandsService";
import S3Service from "../services/S3Service";
import FriendsRepository from "../db/friends";

const MiniBrandsResolver: Resolvers = {
  Query: {
    test: async (parent, args, context) => {
      return 1;
    },
    getMiniBrands: async (parent, args, context) => {
      const { filter, cursor } = args;
      const miniBrandsRepository = new MiniBrandsRepository(context.db);
      const friendsRepository = new FriendsRepository(context.db);
      const miniBrandsService = new MiniBrandsService(miniBrandsRepository, friendsRepository);
      return miniBrandsService.getMiniBrands(context.user?.id, filter, cursor);
    },
    getMiniBrand: async (parent, args, context) => {
      const { id } = args;
      const miniBrandsRepository = new MiniBrandsRepository(context.db);
      const miniBrand = await miniBrandsRepository.getMiniBrand(id);
      if (!miniBrand) {
        throw new Error(`minibrand with id: ${id} does not exist`);
      }
      return miniBrand;
    },
    getMiniBrandsMetaData: async (parent, args, context) => {
      const miniBrandsRepository = new MiniBrandsRepository(context.db);
      const types = await miniBrandsRepository.getMiniBrandTypes();
      const series = await miniBrandsRepository.getMiniBrandSeries();
      const tags = await miniBrandsRepository.getMiniBrandTags();

      return {
        types,
        series,
        tags
      };
    },
    getImageUploadLink: async (parent, args, context) => {
      const { name } = args;
      const s3Service = new S3Service();
      const url = await s3Service.createUploadLink(name);
      return url;
    },
    getCollectedMinibrands: async (parent, args, context) => {
      const { userId, cursor } = args;
      const miniBrandsRepository = new MiniBrandsRepository(context.db);
      const friendsRepository = new FriendsRepository(context.db);
      const miniBrandsService = new MiniBrandsService(miniBrandsRepository, friendsRepository);
      if (!context.user) {
        throw new Error("User does not exist");
      }
      return miniBrandsService.getCollectedMinibrandsByUserId(context.user.id, userId, cursor);
    }
  },
  Mutation: {
    saveMiniBrandsMetaData: async (parent, args, context) => {
      const { types, series, tags } = args;
      const miniBrandsRepository = new MiniBrandsRepository(context.db);
      const friendsRepository = new FriendsRepository(context.db);
      const miniBrandsService = new MiniBrandsService(miniBrandsRepository, friendsRepository);
      return await miniBrandsService.saveMinibrandsMetadata(types, series, tags);
    },
    saveMiniBrand: async (parent, args, context) => {
      const { input } = args;
      const miniBrandsRepository = new MiniBrandsRepository(context.db);
      const friendsRepository = new FriendsRepository(context.db);
      const miniBrandsService = new MiniBrandsService(miniBrandsRepository, friendsRepository);
      return miniBrandsService.saveMiniBrand(input);
    },
    deleteMiniBrand: async (parent, args, context) => {
      const { id } = args;
      const miniBrandsRepository = new MiniBrandsRepository(context.db);
      const friendsRepository = new FriendsRepository(context.db);
      const miniBrandsService = new MiniBrandsService(miniBrandsRepository, friendsRepository);
      const s3Service = new S3Service();
      const deletedMinibrand = await miniBrandsService.deleteMiniBrand(id);

      if (deletedMinibrand) {
        s3Service.deleteIcon(deletedMinibrand.imgUrl);
      }
      return deletedMinibrand;
    },
    updateMiniBrand: async (parent, args, context) => {
      const { id, input } = args;
      const { imgUrl } = input;
      const miniBrandsRepository = new MiniBrandsRepository(context.db);
      const friendsRepository = new FriendsRepository(context.db);
      const miniBrandsService = new MiniBrandsService(miniBrandsRepository, friendsRepository);
      const s3Service = new S3Service();

      const nonUpdatedMinibrand = await miniBrandsService.getMiniBrand(id);
      const updatedMinibrand = await miniBrandsService.updateMiniBrand(id, input);
      if (imgUrl && nonUpdatedMinibrand) {
        s3Service.deleteIcon(nonUpdatedMinibrand.imgUrl);
      }
      return updatedMinibrand;
    },
    collectMinibrand: async (parent, args, context) => {
      const { id, input } = args;
      if (!context.user) {
        throw new Error("User does not exist");
      }
      const miniBrandsRepository = new MiniBrandsRepository(context.db);
      const friendsRepository = new FriendsRepository(context.db);
      const miniBrandsService = new MiniBrandsService(miniBrandsRepository, friendsRepository);

      return miniBrandsService.collectMinibrand(id, context.user.id, input);
    },
    updateCollectedMinibrand: async (parent, args, context) => {
      const { id, input } = args;
      if (!context.user) {
        throw new Error("User does not exist");
      }
      const miniBrandsRepository = new MiniBrandsRepository(context.db);
      const friendsRepository = new FriendsRepository(context.db);
      const miniBrandsService = new MiniBrandsService(miniBrandsRepository, friendsRepository);

      return miniBrandsService.updateCollectedMinibrand(id, context.user.id, input);
    }
  }
};

export default MiniBrandsResolver;
