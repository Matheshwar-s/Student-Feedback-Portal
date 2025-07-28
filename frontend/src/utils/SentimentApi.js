// utils/sentimentapi.js
import axios from "axios";

export async function analyzeSentiment(text) {
  try {
    const response = await axios.post("http://localhost:5001/analyze-sentiment", { text });
    return response.data.sentiment; // "positive", "neutral", or "negative"
  } catch (error) {
    console.error("Sentiment API error:", error);
    return "neutral"; // fallback
  }
}
