
import { GoogleGenAI, Type } from "@google/genai";

/**
 * Creates a new GoogleGenAI instance using the API key from environment variables.
 * Initializing right before use ensures the latest key is used.
 */
const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

// Function to analyze images using the gemini-2.5-flash-image model
export const analyzeGymImage = async (imageBuffer: string, prompt: string) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: 'image/jpeg',
            data: imageBuffer,
          },
        },
        { text: prompt },
      ],
    },
  });
  // Accessing text as a property of GenerateContentResponse
  return response.text;
};

// Function to get workout advice using the gemini-3-flash-preview model
export const getWorkoutAdvice = async (userGoal: string) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `أنت مدرب رياضي محترف. قم بإنشاء خطة تدريب قصيرة ومركزة لـ: ${userGoal}. قدمها بتنسيق نقاط واضح باللغة العربية.`,
    config: {
      temperature: 0.7,
    }
  });
  // Accessing text as a property of GenerateContentResponse
  return response.text;
};

// Function to generate gym stats in JSON format using the gemini-3-flash-preview model
export const getGymStats = async () => {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Generate 5 random gym membership stats for a dashboard in JSON format with properties 'label' and 'value'.",
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        label: {
                          type: Type.STRING,
                          description: 'The label for the statistic',
                        },
                        value: {
                          type: Type.NUMBER,
                          description: 'The numeric value of the statistic as a percentage',
                        }
                    },
                    required: ["label", "value"],
                    propertyOrdering: ["label", "value"],
                }
            }
        }
    });
    // response.text is a property, not a method
    return JSON.parse(response.text || '[]');
};
