import { NextResponse } from "next/server"
import { analyzeSentiment } from "@/lib/sentiment-analysis"

export async function POST(req: Request) {
  const { review } = await req.json()

  if (!review) {
    return NextResponse.json({ error: "Review is required" }, { status: 400 })
  }

  const sentiment = analyzeSentiment(review)

  return NextResponse.json({ sentiment })
}

