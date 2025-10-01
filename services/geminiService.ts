import { GoogleGenAI } from "@google/genai";
import { Chapter, Mode } from '../types';

// IMPORTANT: This key is managed externally. Do not modify.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const TEXTBOOK_CONTEXT_抜粋 = `
From Chapter 1: Book-keeping means recording business transactions systematically. It's the primary stage. Accountancy is wider, including summarizing, analyzing, and interpreting financial data. Key concepts include Assets, Liabilities, Capital, Revenue, and Expenditure.
From Chapter 2: The Double Entry System, introduced by Luca Pacioli, states every transaction has two aspects: a debit and a credit. Accounts are classified as Personal, Real, and Nominal. Golden Rules: Debit the receiver, credit the giver (Personal). Debit what comes in, credit what goes out (Real). Debit all expenses/losses, credit all incomes/gains (Nominal).
From Chapter 3: A Journal is the book of original entry where transactions are recorded chronologically. An entry includes the accounts to be debited and credited, the amount, and a narration. GST (Goods and Services Tax) has components like CGST, SGST, and IGST.
From Chapter 9: Final Accounts include the Trading Account (to find Gross Profit/Loss), Profit & Loss Account (to find Net Profit/Loss), and the Balance Sheet (to show financial position). Adjustments like closing stock, depreciation, and outstanding expenses are crucial.
`;

const getSystemInstruction = (chapter: Chapter, mode: Mode): string => {
  let modeSpecificInstruction = '';
  switch (mode) {
    case 'LEARN':
      modeSpecificInstruction = "Your role is a friendly teacher. Explain concepts from the textbook clearly. Use examples from the text. Ask clarifying questions to guide the student. When asked for a summary, provide bullet points of key topics in the chapter.";
      break;
    case 'PRACTICE':
      modeSpecificInstruction = "Your role is a practice coach. Generate one practice question at a time based on the chapter content. The questions should be varied: MCQs, fill-in-the-blanks, or short 'what is the journal entry for...' problems. After the user answers, provide feedback and the correct answer with a brief explanation.";
      break;
    case 'ASSESS':
      modeSpecificInstruction = "Your role is an examiner. Generate a short quiz of 3-5 questions based on the chapter. Present one question at a time. After the user answers all questions, provide a final score and a summary of which answers were right or wrong.";
      break;
  }

  return `You are "Accounts Tutor 11," an expert AI tutor for Class 11 Accountancy. Your knowledge is strictly limited to the provided textbook content on Book Keeping and Accountancy.
  CURRENT CONTEXT: You are teaching/quizzing on "${chapter.title}".
  ${modeSpecificInstruction}
  Base all your explanations, examples, and questions on the provided textbook context. Do not use outside knowledge. If asked about a topic not in the context, politely state: "My knowledge is focused on your Class 11 textbook. I can't find information on that topic."`;
};

// FIX: Removed redundant `prompt` parameter. The full chat history is passed in the `history` array.
export const generateResponse = async (history: { role: string, parts: { text: string }[] }[], chapter: Chapter, mode: Mode): Promise<string> => {
  try {
    if (!API_KEY) {
      throw new Error("API key is not configured.");
    }
    const model = 'gemini-2.5-flash';
    
    const response = await ai.models.generateContent({
        model: model,
        // FIX: The `history` parameter now contains the complete conversation history including the latest user message.
        contents: history,
        config: {
            systemInstruction: getSystemInstruction(chapter, mode) + `\n\nTextbook Context:\n${TEXTBOOK_CONTEXT_抜粋}`,
        }
    });

    return response.text;
  } catch (error) {
    console.error("Error generating response from Gemini API:", error);
    return "Sorry, I encountered an error. Please check your API key configuration or try again later.";
  }
};