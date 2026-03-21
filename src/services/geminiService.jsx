import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the API (usually handled via an environment variable)
const genAI = new GoogleGenerativeAI("YOUR_API_KEY_HERE");

/**
 * Generates a full sports article based on raw news data.
 */
export const generateArticle = async (newsItem) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    You are a world-class football journalist for a high-end digital news network.
    Transform the following raw news into a professional, engaging article.
    
    RAW NEWS: ${newsItem.content}
    TITLE: ${newsItem.title}

    REQUIREMENTS:
    1. Tone: Bold, authoritative, and slightly aggressive (like a sports tabloid).
    2. Format: Return JSON with:
       - title: A punchy, uppercase-style headline.
       - summary: A 2-sentence hook.
       - content: A 4-paragraph detailed report.
       - tags: 3 relevant keywords (e.g., "Transfer", "Premier League", "Injury").
       - eventType: One of [match, transfer, club, rumors].
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return JSON.parse(response.text());
};

/**
 * Generates a placeholder image URL based on article context.
 * Note: Since Gemini text models don't "output" images directly, 
 * this service constructs a query for a high-quality stock source.
 */
export const generateFeaturedImage = (title, type) => {
  const query = encodeURIComponent(`${title} football soccer stadium professional`);
  // Using a high-quality seed-based source for the demo
  return `https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1200&auto=format&fit=crop`;
};