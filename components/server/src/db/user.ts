import { Prisma, PrismaClient, User } from "@prisma/client";

export default class UserRepository {
  db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  //   getUserByEmail = async (data: { email: string }) => {
  //     const { email } = data;
  //     const emailLowercase = email.toLowerCase();
  //     return await this.db.user.findUnique({
  //       where: { email: emailLowercase }
  //     });
  //   };
}
