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

  create = async (username: string): Promise<UserWithAuth> => {
    return await this.db.user.create({
      data: {
        username,
        role: Role.Member
      },
      include: {
        googleAuth: true,
        localAuth: true
      }
    });
  };

  getLocalAuthByEmail = async (email: string) => {
    return this.db.localAuth.findUnique({
      where: {
        email
      }
    });
  };

  updateLocalPassword = async (id: number, passwordHash: string) => {
    return this.db.localAuth.update({
      where: {
        userId: id
      },
      data: {
        passwordHash
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

  searchUsers = async (query: string, cursor?: number | null) => {
    const PAGE_SIZE = 25;
    const users = await this.db.user.findMany({
      ...(cursor && { skip: 1 }),
      ...(cursor && {
        cursor: {
          id: cursor
        }
      }),
      take: PAGE_SIZE,
      orderBy: {
        id: "asc"
      },
      where: {
        username: {
          contains: query,
          mode: "insensitive"
        }
      }
    });
    return {
      data: users,
      cursor: users.length > 0 ? users[users.length - 1].id : cursor
    };
  };
}
