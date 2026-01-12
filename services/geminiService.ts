import { GoogleGenAI, Type } from "@google/genai";
import { Track, PlaylistAnalysis } from "../types";

export const analyzePlaylistWithGemini = async (tracks: Track[]): Promise<PlaylistAnalysis> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key missing");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Format the track list for the prompt
  const trackListString = tracks.map(t => `"${t.title}" by ${t.artist} (${t.genre})`).join(", ");

  const prompt = `
    Analyze the following list of songs. 
    Act as a futuristic Cyberpunk DJ AI.
    Respond entirely in Vietnamese.
    
    Create a cool, neon-themed playlist name (can be English or Vietnamese, whatever sounds cooler).
    Write a 2-sentence description of the vibe in Vietnamese.
    Suggest 3-4 genre tags.
    Rate the overall energy level from 0 to 100.
    
    Songs: ${trackListString}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            playlistName: { type: Type.STRING },
            vibeDescription: { type: Type.STRING },
            suggestedTags: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            energyLevel: { type: Type.INTEGER }
          },
          required: ["playlistName", "vibeDescription", "suggestedTags", "energyLevel"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    return JSON.parse(text) as PlaylistAnalysis;
  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    // Fallback if AI fails - Vietnamese
    return {
      playlistName: "HỆ THỐNG NGOẠI TUYẾN // GHI ĐÈ THỦ CÔNG",
      vibeDescription: "Liên kết thần kinh bị ngắt. Đang hiển thị luồng dữ liệu thô. Đầu ra âm thanh vẫn tối ưu.",
      suggestedTags: ["Lỗi", "Ngoại tuyến", "Analog"],
      energyLevel: 50
    };
  }
};