
import { GoogleGenAI, Type } from "@google/genai";
import type { AIFilters } from '../types';

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        location: {
            type: Type.STRING,
            description: "The city and/or state mentioned. e.g. 'San Francisco', 'CA'"
        },
        propertyType: {
            type: Type.STRING,
            description: "The type of property.",
            enum: ['House', 'Apartment', 'Condo', 'Plot']
        },
        bedrooms: {
            type: Type.INTEGER,
            description: "The minimum number of bedrooms."
        },
        minPrice: {
            type: Type.INTEGER,
            description: "The minimum price, if mentioned."
        },
        maxPrice: {
            type: Type.INTEGER,
            description: "The maximum price, if mentioned. For queries like 'under $500k', this would be 500000."
        },
    },
};

export async function run(prompt: string): Promise<AIFilters | null> {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Extract real estate search filters from this user query: "${prompt}". Respond with only the JSON object.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });
        
        const jsonText = response.text.trim();
        if (!jsonText) {
            console.error("Gemini API returned an empty response.");
            return null;
        }

        const parsedJson = JSON.parse(jsonText);
        return parsedJson as AIFilters;

    } catch (e) {
        console.error("Error calling Gemini API:", e);
        return null;
    }
}
   