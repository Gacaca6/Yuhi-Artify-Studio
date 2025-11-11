import { GoogleGenAI, Modality, Type } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

/**
 * Generates an image from a text prompt using the Gemini Flash Image model.
 * @param prompt The text prompt describing the desired image.
 * @returns A promise that resolves to the base64 encoded string of the generated image.
 */
export async function generateImageFromPrompt(prompt: string): Promise<string> {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          text: prompt,
        },
      ],
    },
    config: {
        responseModalities: [Modality.IMAGE],
    },
  });

  // Extract the image data from the response
  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return part.inlineData.data;
    }
  }

  throw new Error("No image was generated in the API response.");
}

/**
 * Generates an artistic title and description for an image.
 * @param imageBase64 The base64 encoded image string of the artwork.
 * @param mimeType The MIME type of the image.
 * @param userPrompt The original prompt used to create the art, for context.
 * @returns A promise that resolves to an object with `title` and `description`.
 */
export async function generateArtDescription(imageBase64: string, mimeType: string, userPrompt: string): Promise<{ title: string; description: string }> {
  const descriptionSystemPrompt = `Analyze this image, which was generated from the user prompt: "${userPrompt}". Your task is to act as an art curator. Generate a poetic and artistic title, and a short, evocative description for the final image.`;
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [
      {
        parts: [
          { inlineData: { data: imageBase64, mimeType: mimeType } },
          { text: descriptionSystemPrompt }
        ]
      }
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: {
            type: Type.STRING,
            description: "A poetic and artistic title for the image, between 3 and 7 words."
          },
          description: {
            type: Type.STRING,
            description: "An evocative, artistic description of the image, between 20 and 40 words."
          }
        },
        required: ["title", "description"]
      }
    }
  });

  const text = response.text.trim();
  try {
    const result = JSON.parse(text);
    return {
      title: result.title || "Untitled Masterpiece",
      description: result.description || "A captivating work of digital art, born from a fusion of human creativity and artificial intelligence."
    };
  } catch (e) {
    console.error("Failed to parse JSON from Gemini:", text);
    throw new Error("The model returned an invalid description format.");
  }
}