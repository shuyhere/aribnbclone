import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined
}

// 如果全局变量 prisma 已经存在，就使用它作为 Prisma 客户端；否则，创建一个新的 Prisma 客户端
const client = globalThis.prisma || new PrismaClient();


if (process.env.NODE_ENV !== 'development') globalThis.prisma = client

export default client ;