const positiveWords = [
  "good",
  "great",
  "excellent",
  "amazing",
  "wonderful",
  "fantastic",
  "love",
  "enjoy",
  "like",
  "best",
]
const negativeWords = [
  "bad",
  "terrible",
  "awful",
  "horrible",
  "worst",
  "hate",
  "dislike",
  "poor",
  "disappointing",
  "boring",
]

export function analyzeSentiment(text: string): string {
  const lowercaseText = text.toLowerCase()
  const words = lowercaseText.match(/\b(\w+)\b/g) || []

  let positiveCount = 0
  let negativeCount = 0

  words.forEach((word) => {
    if (positiveWords.includes(word)) positiveCount++
    if (negativeWords.includes(word)) negativeCount++
  })

  if (positiveCount > negativeCount) return "positive"
  if (negativeCount > positiveCount) return "negative"
  return "neutral"
}

