import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import {prisma} from "./prisma"
import { hashPassword, verifyPassword } from "./argon2";
 
export const auth = betterAuth({
  database:prismaAdapter(prisma , {
    provider :"postgresql",
  }),
  emailAndPassword :{
    enabled: true,
    minPasswordLength:6,
    autoSignIn:false,
    //setting custom hashing and verification
    password:{
        hash:hashPassword,
        verify:verifyPassword,
    }
  },
  advanced:{
    database:{
        //disable the automatically generated id
        generateId:false,
    }
  }
});