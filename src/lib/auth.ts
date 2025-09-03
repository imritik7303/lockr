import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { hashPassword, verifyPassword } from "./argon2";
import { nextCookies } from "better-auth/next-js";
import { createAuthMiddleware, APIError } from "better-auth/api";
import { getValidDomain, normalizeName } from "./utils";
import { UserRole } from "@/generated/prisma";
import { admin } from "better-auth/plugins";
import { ac , roles } from "./permission";
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    autoSignIn: false,
    //setting custom hashing and verification
    password: {
      hash: hashPassword,
      verify: verifyPassword,
    },
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/sign-up/email") {
        const email = String(ctx.body.email);
        const domain = email.split("@")[1];
        const validDomain = getValidDomain();
        if (!validDomain.includes(domain)) {
          throw new APIError("BAD_REQUEST", {
            message: "invalid domain . Please use valid email",
          });
        }

        const name = normalizeName(ctx.body.name);
        return {
          context: {
            ...ctx,
            body: {
              ...ctx.body,
              name,
            },
          },
        };
      }
    }),
  },
  databaseHooks:{
    //before creating user checking if user email is that of an admin if yes then adding role= ADMIN
    user:{
      create:{
        before: async (user) => {
          const AdminEmail= process.env.ADMIN_EMAIL?.split(";") ?? [];
          if(AdminEmail.includes(user.email)){
            return {data :{...user , role:UserRole.ADMIN}};
          }
          return {data:user};
        }
      }
    }
  },
  user: {
    additionalFields: {
      role: {
        type: ["USER", "ADMIN"] as Array<UserRole>,
        //do not need to pass role argument in signin email
        input: false,
      },
    },
  },
  session: {
    //expires in 6 hour
    expiresIn: 6 * 60 * 60,
  },
  advanced: {
    database: {
      //disable the automatically generated id
      generateId: false,
    },
  },
  plugins: [nextCookies(),
    admin({
      defaultRole:UserRole.USER,
      adminRoles:[UserRole.ADMIN],
      ac,
      roles
    }),
  ],
});

export type ErrorCode = keyof typeof auth.$ERROR_CODES | "UNKNOWN";
