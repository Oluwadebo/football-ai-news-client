import { GoogleGenAI } from "@google/generative-ai";

// Using Vite's environment variable syntax
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenAI(apiKey);

export const generateArticle = async (newsItem) => {
  // Logic to force variety in the "Hook System"
  const hooks = [
    "Breaking news",
    "Suspense",
    "Question",
    "Narrative",
    "Statistic",
    "Fan reaction",
  ];
  const selectedHook = hooks[Math.floor(Math.random() * hooks.length)];

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash", // Using the stable flash model
  });

  const prompt = `
    Build a professional sports journalism article based on this news: "${newsItem.title} - ${newsItem.content}".
    
    MANDATORY HOOK SYSTEM:
    Use a ${selectedHook.toUpperCase()} hook for the first 1-2 sentences.
    
    ARTICLE STRUCTURE:
    1. ${selectedHook} introduction
    2. News explanation
    3. Player or club background
    4. Tactical or competition impact
    5. Future implications
    6. Short summary conclusion
    
    LENGTH: 600-900 words.
    STYLE: Vary sentence length, avoid repetitive AI language. Write like Fabrizio Romano.
    
    OUTPUT FORMAT: JSON
    {
      "title": "Catchy headline",
      "content": "Full article body with paragraphs",
      "player": "Main player name",
      "club": "Main club name",
      "eventType": "e.g., Transfer, Match, Injury",
      "summary": "1-sentence summary for notifications",
      "tags": ["tag1", "tag2"]
    }
  `;

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      responseMimeType: "application/json",
    },
  });

  const response = await result.response;
  return JSON.parse(response.text());
};

export const generateFeaturedImage = async (article) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Placeholder for image logic if supported via your specific tier
  const prompt = `Football news graphic style for ${article.player} at ${article.club}. Professional sports journalism aesthetic, high quality, dynamic action. No text.`;

  try {
    const result = await model.generateContent(prompt);
    // Note: If using a text-to-image specific endpoint, logic would change here.
    // Falling back to your robust placeholder logic for stability:
    return `https://picsum.photos/seed/${encodeURIComponent(article.title)}/1200/675`;
  } catch (e) {
    console.error("Image generation failed, using placeholder", e);
    return `https://picsum.photos/seed/${encodeURIComponent(article.title)}/1200/675`;
  }
};
