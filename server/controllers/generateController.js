import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); // server-side: process.env

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
];

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash", // use the flash model (faster & free)
  safetySettings,
});

export const generateWebsiteFromPrompt = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const inputPrompt = `Generate responsive HTML and CSS layout for: ${prompt}. Only include HTML and CSS code.`;

    const result = await model.generateContent({
      contents: [{ parts: [{ text: inputPrompt }] }],
    });

    const generatedText = result.response.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      return res.status(500).json({ error: "Failed to generate content." });
    }

    const htmlMatch = generatedText.match(/<html[\s\S]*<\/html>/i);
    const cssMatch = generatedText.match(/<style[^>]*>([\s\S]*?)<\/style>/i);

    const html = htmlMatch ? htmlMatch[0].replace(cssMatch?.[0], "") : "<p>HTML could not be parsed.</p>";
    const css = cssMatch ? cssMatch[1] : "";

    return res.json({ html, css });
    

  } catch (err) {
    console.error("Gemini API error:", err.message || err);
    res.status(500).json({ error: "Failed to generate website." });
  }
};
