import { db } from "../firebase";

export async function confirmProgress(userId: string) {
  const snapshot = await db
    .collection("state")
    .where("userId", "==", userId)
    .get();

  if (snapshot.empty) {
    return [{ type: "text", text: "現在、申請中の奨学金はありません。" }];
  }

  const columns: any[] = []; // LINEのカルーセルメッセージの各カードを格納するための空の配列を宣言

  for (const doc of snapshot.docs) {
    const data = doc.data();
    const scholarshipDoc = await db
      .collection("scholarships")
      .doc(data.scholarshipId)
      .get();
    const scholarship = scholarshipDoc.data();

    let statusText = "";
    let actionLabel = "";
    let actionData = "";

    if (data.isSuspend) {
      statusText = "申請中断中です";
      actionLabel = "再開する";
      actionData = `action=resumeApply&scholarshipId=${data.scholarshipId}`;
    } else {
      statusText = "申請中（継続中）";
      actionLabel = "進行中";
      actionData = `action=viewDetail&scholarshipId=${data.scholarshipId}`;
    }

    columns.push({
      thumbnailImageUrl:
        scholarship?.imageUrl || "https://i.imgur.com/abc123.jpg",
      title: scholarship?.name || "奨学金",
      text: statusText,
      actions: [
        {
          type: "postback",
          label: actionLabel,
          data: actionData,
        },
      ],
    });
  }

  return [
    {
      type: "template",
      altText: "申請進捗の一覧です。",
      template: {
        type: "carousel",
        columns: columns.slice(0, 5),
      },
    },
  ];
}
