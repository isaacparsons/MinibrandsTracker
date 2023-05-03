import { GoogleAuth, PrismaClient } from "@prisma/client";

export default class GoogleAuthRepository {
  db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  getById = async (id: string) => {
    return await this.db.googleAuth.findUnique({
      where: { id }
    });
  };

  create = async (data: GoogleAuth) => {
    return await this.db.googleAuth.create({
      data: {
        id: data.id,
        email: data.email,
        user: {
          connect: { id: data.userId }
        }
      }
    });
  };
}
