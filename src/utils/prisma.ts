import { PrismaClient } from "@prisma/client";

// アプリケーション全体で一つの PrismaClient インスタンスを共有する
export const prisma = new PrismaClient();
