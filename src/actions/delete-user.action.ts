"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";


import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function deleteUserAction({ userId }: { userId: string }) {
    const headerlist = await headers();
  const session = await auth.api.getSession({
    headers: headerlist
  });

  if (!session) throw new Error("UnAuthorized");

  if (session.user.role !== "ADMIN" ) {
    throw new Error("FORBIDDEN");
  }

  try {
    await prisma.user.delete({
      where: {
        id: userId,
        role: "USER",
      },
    });
    if(session.user.id === userId){
     await auth.api.signOut({
        headers:headerlist,
     })
     redirect("/auth/login");
    }
    revalidatePath("/admin/dashboard")
    return {error: null};
  } catch (err) {
    if (err instanceof Error) {
      return { error: err.message };
    }
    return { error: "internal server errror" };
  }
}
