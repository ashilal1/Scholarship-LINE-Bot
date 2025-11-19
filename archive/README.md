# TypeScript プロトタイプ (アーカイブ)

このディレクトリには、Java移行前の初期プロトタイプが格納されています。

## 開発期間
2025-01-12 ~ 2025-01-19 (約1週間)

## 技術スタック
- TypeScript 5.x
- Express
- Prisma
- PostgreSQL
- LINE Messaging API SDK

## なぜアーカイブしたのか
詳細は [`../docs/MIGRATION.md`](../docs/MIGRATION.md) を参照してください。

## 主な実装内容
- ✅ Prismaスキーマ設計 (User, Application, Scholarship, Question)
- ✅ LINE Bot Webhook受信
- ✅ 対話フロー制御
- ✅ PDF生成機能
- ✅ PostgreSQL接続

## 主な学び
- Prismaのスキーマファースト設計
- TypeScriptでの非同期処理パターン
- LINE Messaging API の基本的な使い方
- Firestore から Prisma への移行経験

## ディレクトリ構成

archive/
├── src/
│   ├── controllers/
│   ├── services/
│   └── index.ts
├── prisma/
│   └── schema.prisma
├── package.json
└── tsconfig.json

このコードは現在実行できませんが、設計思想や初期の判断を振り返るために残してあります。

---

**このプロトタイプでの経験が、Java実装の品質向上に大きく貢献しました。**
