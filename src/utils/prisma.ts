import { PrismaClient } from "@prisma/client";

// アプリケーション全体で一つの PrismaClient インスタンスを共有する
const prisma = new PrismaClient();

export default prisma;
