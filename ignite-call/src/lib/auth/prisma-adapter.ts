import { Adapter } from "next-auth/adapters";
import { prisma } from "../prisma";

export function PrismaAdapter(): Adapter {
  return {
    async createUser(user) {
      return;
    },

    async getUser(id) {
      const user = await prisma.user.findUniqueOrThrow({
        where: {
          id,
        },
      });

      return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email!,
        avatar_url: user.avatar_url!,
        emailVerified: null,
      };
    },
    async getUserByEmail(email) {
      const user = await prisma.user.findUniqueOrThrow({
        where: {
          email,
        },
      });

      return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email!,
        avatar_url: user.avatar_url!,
        emailVerified: null,
      };
    },
    async getUserByAccount({ providerAccountId, provider }) {
      const { user } = await prisma.account.findFirstOrThrow({
        where: {
          provider_provider_account_id: {
            provider,
            _provider_account_id: providerAccountId,
          },
        },
        include: {
          user: true,
        },
      });

      return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email!,
        avatar_url: user.avatar_url!,
        emailVerified: null,
      };
    },
    async updateUser(user) {
      const prismaUser = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          name: user.name,
          email: user.email,
          avatar_url: user.avatar_url,
        },
      });

      return {
        id: prismaUser.id,
        name: prismaUser.name,
        username: prismaUser.username,
        email: prismaUser.email!,
        avatar_url: prismaUser.avatar_url!,
        emailVerified: null,
      };
    },

    async linkAccount(account) {
      await prisma.account.create({
        data: {
          user_id: account.user_id,
          type: account.type,
          provider: account.provider,
          provider_account_id: account.providerAccountId,
          refresh_token: account.refresh_token,
          access_token: account.access_token,
          expires_at: account.expires_at,
          token_type: account.token_type,
          scope: account.scope,
          id_token: account.id_token,
          session_state: account.session_state,
        },
      });
    },

    async createSession({ sessionToken, userId, expires }) {
      await prisma.session.create({
        data: {
          user_id: userId,
          expires,
          session_token: sessionToken,
        },
      });

      return {
        sessionToken,
        userId,
        expires,
      };
    },
    async getSessionAndUser(sessionToken) {
      const { user, ...session} = await prisma.session.findFirstOrThrow({
        where: {
          session_token: sessionToken 
        },
        include: {
            user: true 
        }
      })

      return {
        session: {
            sessionToken : session.session_token,
            userId: session.user_id,
            expires: session.expires
        },
        user: {
            id: user.id,
            name: user.name,
            username: user.username,
            avatar_url: user.avatar_url!,
            email: user.email!,
            emailVerified: null 
        }
      }
    },
    async updateSession({ sessionToken, userId, expires }) {
        const prismaSession = await prisma.session.update({
            where: {
              session_token: sessionToken
            },
            data: {
              expires,
              user_id: userId
            },
          });
    
          return {
            sessionToken: prismaSession.session_token,
            userId: prismaSession.user_id,
            expires: prismaSession.expires
          };
    },
  };
}
