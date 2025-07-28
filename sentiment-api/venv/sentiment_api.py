from flask import Flask, request, jsonify
from transformers import pipeline
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

# Load sentiment analysis model
sentiment_analyzer = pipeline("sentiment-analysis")

@app.route('/analyze-sentiment', methods=['POST'])
def analyze_sentiment():
    data = request.json
    text = data.get("text", "")

    if not text.strip():
        return jsonify({"error": "No text provided"}), 400

    # Get sentiment result
    results = sentiment_analyzer(text)
    label = results[0]['label']
    score = results[0]['score']

    print("🧠 INPUT TEXT:", text)
    print("🔍 RAW RESULT:", results)

    # Direct label mapping
    if label == "POSITIVE":
        sentiment = "positive"
    elif label == "NEGATIVE":
        sentiment = "negative"
    else:
        sentiment = "neutral"

    return jsonify({
        "sentiment": sentiment,
        "confidence": float(score),
        "label": label
    })

if __name__ == '__main__':
    app.run(port=5001)
