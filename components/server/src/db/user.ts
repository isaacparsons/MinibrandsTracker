import { GoogleAuth, LocalAuth, PrismaClient, Role, User } from "@prisma/client";

export type UserWithAuth = User & {
  localAuth: LocalAuth | null;
  googleAuth: GoogleAuth | null;
};

export default class UserRepository {
  db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  create = async (): Promise<UserWithAuth> => {
    return await this.db.user.create({
      data: {
        role: Role.Member
      },
      include: {
        googleAuth: true,
        localAuth: true
      }
    });
  };

  getAuthInfoById = async (id: number): Promise<UserWithAuth | null> => {
    return await this.db.user.findUnique({
      where: {
        id
      },
      include: {
        googleAuth: true,
        localAuth: true
      }
    });
  };
  getBasicInfoById = async (id: number) => {
    return await this.db.user.findUnique({
      where: {
        id
      },
      include: {
        googleAuth: true,
        localAuth: true,
        collected: {
          include: {
            minibrand: true
          }
        }
      }
    });
  };
  getCollectedById = async (id: number) => {
    return await this.db.user.findUnique({
      where: {
        id
      },
      select: {
        collected: {
          select: {
            minibrand: {
              include: {
                tags: true,
                type: true
              }
            }
          }
        }
      }
    });
  };
}
