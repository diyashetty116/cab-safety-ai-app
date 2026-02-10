
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export const getSafetyAssessment = async (tripContext: string) => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze the following trip situation for safety risks and provide advice: ${tripContext}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          advice: { type: Type.STRING },
          riskLevel: { type: Type.STRING, enum: ["low", "medium", "high"] },
          actionItems: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["advice", "riskLevel", "actionItems"]
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    return {
      advice: "Stay alert and keep your phone nearby.",
      riskLevel: "low",
      actionItems: ["Monitor the route", "Share location with a friend"]
    };
  }
};

export const getRouteSafetyGrounding = async (start: string, end: string) => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Identify safe, well-lit routes and nearby emergency services between ${start} and ${end}.`,
    config: {
      tools: [{ googleMaps: {} }]
    }
  });
  
  return {
    text: response.text,
    sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
  };
};
