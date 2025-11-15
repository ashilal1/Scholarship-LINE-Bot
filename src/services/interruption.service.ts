import { sendLineReply } from "./line.service";
import { prisma } from "../utils/prisma";

export async function interruptionReply(userId: string) {
  // ユーザーの進行中 state を検索
  const stateQuery = await prisma
    .collection("state")
    .where("userId", "==", userId)
    .where("isSuspend", "==", false)
    .limit(1)
    .get();

  if (stateQuery.empty) {
    return [{ type: "text", text: "中断できる申請はありません。" }];
  }

  const stateDoc = stateQuery.docs[0].ref; // refはデータの住所を示す。→updateには住所を示す必要がある
  await stateDoc.update({ isSuspend: true, progress: "interrupted" });

  return [
    {
      type: "text",
      text: "申請を中断しました。再開する場合はリッチメニューから操作してください。",
    },
  ];
}
