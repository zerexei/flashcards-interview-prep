import { useState } from "react";
import { GoogleGenAI, ThinkingLevel } from "@google/genai";

const apiKey = import.meta.env.VITE_GOOGLE_GEN_AI_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export function useModel() {
    const [response, setResponse] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const generate = async (prompt: string): Promise<string> => {
        setLoading(true);
        setError(null);
        setResponse("");

        if (!ai) {
            const err = new Error("Gemini API key is not configured. Deep Mode is disabled.");
            setError(err);
            setLoading(false);
            return "";
        }

        try {
            const result = await ai.models.generateContent({
                model: "gemini-3-flash-preview",
                contents: prompt,
                config: {
                    thinkingConfig: {
                        thinkingLevel: ThinkingLevel.MINIMAL,
                    }
                },
            });

            const text = result.text || "";
            setResponse(text);
            return text;
        } catch (err) {
            setError(err as Error);
            console.error(err);
            return "";
        } finally {
            setLoading(false);
        }
    };

    return {
        response,
        loading,
        error,
        generate,
    };
}