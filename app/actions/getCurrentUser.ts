import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try{
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string
      }
    });

    if (!currentUser) {
      return null;
    }

    // return currentUser;
   // ...currentUser 是 JavaScript 的扩展运算符（spread operator），它可以将一个对象的所有可枚举属性复制到新的对象中。  currentUser.createdAt.toISOString() 是将 currentUser.createdAt（一个日期对象）转换为 ISO 格式的字符串。ISO 格式是一种国际标准的日期和时间表示方法，例如 "2022-03-14T11:01:55.021Z"
  return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null
    };

  } catch(error : any){
    return null;
  }
}

