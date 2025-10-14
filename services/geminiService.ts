
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generatePitchScript = async (idea: string): Promise<string> => {
    const prompt = `
    Você é um especialista em startups e negócios. Crie um roteiro de pitch conciso e impactante para a seguinte ideia de negócio. O roteiro deve estar em português e seguir a estrutura clássica de um pitch, incluindo:

    1.  **O Problema:** Descreva o problema que a startup resolve de forma clara e relatable.
    2.  **A Solução:** Apresente o produto/serviço como a solução ideal para esse problema.
    3.  **Mercado Alvo:** Quem são os clientes ideais?
    4.  **Modelo de Negócio:** Como a startup vai ganhar dinheiro?
    5.  **Diferenciais:** O que torna essa solução única ou melhor que a concorrência?
    6.  **Call to Action (Chamada para Ação):** O que o pitch deve pedir (investimento, parceria, etc.)?

    Formate a saída de forma clara, usando títulos para cada seção com markdown (e.g., **O Problema**).

    Ideia de Negócio: "${idea}"
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating pitch script:", error);
        throw new Error("Failed to generate pitch script from Gemini API.");
    }
};

export const generateLogoImage = async (idea: string): Promise<string> => {
    const prompt = `A modern, minimalist logo for a startup based on this idea: "${idea}". The logo should be clean, professional, and iconic. Use a flat design style, suitable for a tech company. The logo should be on a clean, solid, dark background.`;
    
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/png',
                aspectRatio: '1:1',
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
            return `data:image/png;base64,${base64ImageBytes}`;
        } else {
            throw new Error("No image was generated.");
        }
    } catch (error) {
        console.error("Error generating logo image:", error);
        throw new Error("Failed to generate logo image from Imagen API.");
    }
};
