import { Resolvers } from "../generated/graphql";
import MiniBrandsRepository from "../db/minibrands";
import MiniBrandsService from "../services/MiniBrandsService";
import S3Service from "../services/S3Service";

const MiniBrandsResolver: Resolvers = {
  Query: {
    getMiniBrands: async (parent, args, context) => {
      const miniBrandsRepository = new MiniBrandsRepository(context.db);
      return miniBrandsRepository.getMiniBrands();
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
    }
  },
  Mutation: {
    saveMiniBrandsMetaData: async (parent, args, context) => {
      const { types, series, tags } = args;
      const miniBrandsRepository = new MiniBrandsRepository(context.db);
      const miniBrandsService = new MiniBrandsService(miniBrandsRepository);
      return await miniBrandsService.saveMinibrandsMetadata(types, series, tags);
    },
    saveMiniBrand: async (parent, args, context) => {
      const { input } = args;
      const miniBrandsRepository = new MiniBrandsRepository(context.db);
      const miniBrandsService = new MiniBrandsService(miniBrandsRepository);
      return miniBrandsService.saveMiniBrand(input);
    },
    deleteMiniBrand: async (parent, args, context) => {
      const { id } = args;
      const miniBrandsRepository = new MiniBrandsRepository(context.db);
      const miniBrandsService = new MiniBrandsService(miniBrandsRepository);
      return miniBrandsService.deleteMiniBrand(id);
    },
    updateMiniBrand: async (parent, args, context) => {
      const { id, input } = args;
      const { imgUrl } = input;
      const miniBrandsRepository = new MiniBrandsRepository(context.db);
      const miniBrandsService = new MiniBrandsService(miniBrandsRepository);
      const s3Service = new S3Service();

      const nonUpdatedMinibrand = await miniBrandsService.getMiniBrand(id);
      const updatedMinibrand = await miniBrandsService.updateMiniBrand(id, input);
      if (imgUrl && nonUpdatedMinibrand) {
        s3Service.deleteIcon(nonUpdatedMinibrand.imgUrl);
      }
      return updatedMinibrand;
    }
  }
  // login: async (parent, args, context) => {
  //   const { password, email } = args;
  //   const userRepository = new UserRepository(context.db);
  //   const user = await userRepository.getUserByEmail({ email });
  //   if (!user) {
  //     throw new Error(`No user found with email: ${email}`);
  //   }
  //   if (!user.accountCreated) {
  //     throw new Error(`Account has not been setup, go to signup to complete`);
  //   }
  //   const valid = await bcrypt.compare(password, user.passwordHash);
  //   if (!valid) {
  //     throw new Error("Password is incorrect");
  //   }
  //   const userWithoutPassword = exclude<User, "passwordHash">(user, "passwordHash");
  //   const token = tokenService.createAccessToken(user.id);
  //   const refreshToken = tokenService.createRefreshToken(user.id);
  //   return {
  //     token,
  //     refreshToken,
  //     user: userWithoutPassword
  //   };
  // }
  // }
};

export default MiniBrandsResolver;
