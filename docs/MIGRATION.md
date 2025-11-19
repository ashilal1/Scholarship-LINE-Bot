# TypeScript → Java 移行ドキュメント

## 📅 移行時期
2025年1月19日 (開発開始から約1週間後)

## 🎯 移行理由

### 1. LINEヤフーの技術スタックへの適合
LINEヤフーのインターン募集要項を確認したところ、バックエンドは **Java (Spring Boot)** が主要技術として記載されていました。

- 実務環境での技術スタック理解を深めるため
- 大規模開発における型安全性の重要性を学ぶため
- Spring Bootエコシステム全体を経験するため

### 2. 技術的な判断
初期のTypeScript/Prisma実装は以下の利点がありました：
- ✅ 開発速度が速い
- ✅ スキーマファーストで設計しやすい
- ✅ TypeScriptの型推論が優秀

しかし、以下の理由からJavaへの移行を決断：
- 🎯 LINEヤフーの技術スタックとの一致
- 🎯 Spring Bootの豊富なエコシステム
- 🎯 JPA/Hibernateによる柔軟なエンティティ設計
- 🎯 LINE Bot SDK for Java の公式サポート

### 3. 学習目標の再定義
当初は「動くものを早く作る」ことが目標でしたが、インターン選考を見据え「実務で使われる技術を深く理解する」ことに重点を移しました。

## 🔄 移行内容

| 項目 | Before (TypeScript) | After (Java) |
|------|---------------------|--------------|
| **言語** | TypeScript 5.x | Java 21 (LTS) |
| **フレームワーク** | Express | Spring Boot 3.x |
| **ORM** | Prisma | JPA/Hibernate |
| **マイグレーション** | Prisma Migrate | Flyway |
| **LINE SDK** | @line/bot-sdk | line-bot-spring-boot |
| **API仕様** | 手動管理 | OpenAPI/Swagger |
| **テスト** | Jest | JUnit 5 + Mockito |

## 📊 Prisma Schema → JPA Entity の変換例

### Before: Prisma Schema
```prisma
model User {
  lineUserId  String   @id @map("line_user_id")
  displayName String?  @map("display_name")
  applications Application[]
  
  @@map("users")
}

model Application {
  id            String   @id @default(uuid())
  userId        String   @map("user_id")
  user          User     @relation(fields: [userId], references: [lineUserId])
  scholarshipId String   @map("scholarship_id")
  answers       Json
  status        String
  
  @@map("applications")
}
```

### After: JPA Entity
```java
@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    @Column(name = "line_user_id")
    private String lineUserId;
    
    @Column(name = "display_name")
    private String displayName;
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Application> applications;
}

@Entity
@Table(name = "applications")
@Data
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    
    @Column(name = "scholarship_id")
    private String scholarshipId;
    
    @Type(JsonType.class)
    @Column(columnDefinition = "jsonb")
    private Map<String, Object> answers;
    
    @Enumerated(EnumType.STRING)
    private ApplicationStatus status;
}
```

## 🎓 移行から学んだこと

### 1. ORMの設計思想の違い
- **Prisma**: スキーマファースト。DBスキーマからコードを生成
- **JPA**: コードファースト。Entityクラスからテーブルを生成（ただしFlywayで制御）

### 2. 型システムの違い
- **TypeScript**: 構造的型付け (Structural Typing)
- **Java**: 名目的型付け (Nominal Typing)

### 3. エコシステムの違い
- **TypeScript**: npm/yarn の軽量パッケージ文化
- **Java**: Spring Boot の「batteries included」思想

## 📈 今後の展開
1. ✅ Spring Boot による LINE Bot 実装
2. ✅ OpenAPI によるスキーマ駆動開発
3. 🔄 React (TypeScript) による LIFF フロントエンド
4. 🔄 GitHub Actions による CI/CD パイプライン
5. 🔄 Docker Compose による本番相当環境

## 🔗 参考資料
- [LINE Developers - Messaging API SDK for Java](https://github.com/line/line-bot-sdk-java)
- [Spring Boot 公式ドキュメント](https://spring.io/projects/spring-boot)
- [Flyway - Database Migrations](https://flywaydb.org/)

---

**作成日**: 2025-01-19  
**作成者**: @ashilal1