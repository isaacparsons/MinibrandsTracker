import { LocalAuth, Prisma, PrismaClient, User } from "@prisma/client";

export type LocalAuthInput = Omit<LocalAuth, "id">;

export default class LocalAuthRepository {
  db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  create = async (auth: LocalAuthInput) => {
    const { email, passwordHash, userId } = auth;
    return await this.db.localAuth.create({
      data: {
        email: email.toLowerCase(),
        passwordHash,
        user: {
          connect: {
            id: userId
          }
        }
      }
    });
  };

  getByEmail = async (email: string) => {
    const emailLowercase = email.toLowerCase();
    return await this.db.localAuth.findUnique({
      where: { email: emailLowercase }
    });
  };
}
