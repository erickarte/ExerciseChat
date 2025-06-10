// src/services/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from '@env';


const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function askGemini(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Erro no Gemini:", error);
    return "Desculpe, ocorreu um erro.";
  }
}