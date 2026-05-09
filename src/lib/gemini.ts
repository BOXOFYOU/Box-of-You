import { GoogleGenAI, Type } from "@google/genai";
import { Question } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function generateQuizQuestions(topic: string, count: number = 5): Promise<Question[]> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate a quiz about "${topic}" with ${count} multiple-choice questions.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            text: { type: Type.STRING },
            options: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Four multiple-choice options."
            },
            correctAnswer: { type: Type.STRING },
            explanation: { type: Type.STRING }
          },
          required: ["id", "text", "options", "correctAnswer"]
        }
      }
    }
  });

  const text = response.text;
  try {
    return JSON.parse(text);
  } catch (e) {
    console.error("Failed to parse Gemini response", text);
    throw new Error("Invalid quiz data generated");
  }
}
