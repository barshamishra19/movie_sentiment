"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FilmIcon, ThumbsUpIcon, ThumbsDownIcon, MinusIcon } from "lucide-react"

export default function Home() {
  const [review, setReview] = useState("")
  const [sentiment, setSentiment] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const analyzeSentiment = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ review }),
      })
      const data = await response.json()
      setSentiment(data.sentiment)
    } catch (error) {
      console.error("Error:", error)
      setSentiment("Error occurred")
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center flex items-center justify-center gap-2">
            <FilmIcon className="w-8 h-8 text-indigo-600" />
            Movie Review Sentiment Analysis
          </CardTitle>
          <CardDescription className="text-center">
            Enter your movie review below and we'll analyze its sentiment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Type your movie review here..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="min-h-[150px]"
          />
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-4">
          <Button onClick={analyzeSentiment} disabled={isLoading || !review.trim()}>
            {isLoading ? "Analyzing..." : "Analyze Sentiment"}
          </Button>
          {sentiment && (
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">Sentiment:</h2>
              <div className="flex items-center justify-center gap-2">
                {sentiment === "positive" ? (
                  <ThumbsUpIcon className="w-8 h-8 text-green-500" />
                ) : sentiment === "negative" ? (
                  <ThumbsDownIcon className="w-8 h-8 text-red-500" />
                ) : (
                  <MinusIcon className="w-8 h-8 text-yellow-500" />
                )}
                <span className="text-lg capitalize">{sentiment}</span>
              </div>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

