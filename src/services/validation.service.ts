// services/validation-service.ts
export function validateAnswer(
  questionContent: string,
  answer: string
): { isValid: boolean; feedback?: string } {
  // 質問文に応じてルールを定義
  if (questionContent.includes("メール") && !answer.includes("@")) {
    return {
      isValid: false,
      feedback: "メールアドレスの形式で入力してください。",
    };
  }

  if (questionContent.includes("年齢")) {
    const num = Number(answer);
    if (isNaN(num) || num <= 0 || num > 120) {
      return {
        isValid: false,
        feedback: "正しい年齢を半角数字で入力してください。",
      };
    }
  }

  // それ以外はOK
  return { isValid: true };
}
