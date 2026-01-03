import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { BookOpen, Brain, GraduationCap, Zap } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-600">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-purple-900">
              TopicToTest
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/auth">
              <Button variant="ghost">Sign in</Button>
            </Link>
            <Link href="/auth">
              <Button className="bg-purple-600 hover:bg-purple-700">
                Get started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
            <Zap className="h-4 w-4" />
            AI-powered question generation
          </div>

          <h1 className="mb-6 text-5xl font-bold text-purple-600 md:text-6xl">
            Turn Any Topic Into Exam-Ready Questions
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">
            Drop in your study topics and instantly get practice questions that
            actually match your syllabus. Simple, fast, and built for real exam prep.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/auth">
              <Button
                size="lg"
                className="bg-purple-600 px-8 hover:bg-purple-700"
              >
                Start generating questions
              </Button>
            </Link>

            <Button
              size="lg"
              variant="outline"
              className="bg-transparent px-8"
            >
              Watch demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Why students actually use this
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            TopicToTest helps you practice smarter by creating questions that focus
            on what really matters for your exams.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          <Card className="border-0 shadow-lg transition-shadow hover:shadow-xl">
            <CardHeader className="pb-4 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl">
                Topic-focused questions
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-base">
                Enter exactly what you’re studying and get questions that stay
                on topic—no filler, no randomness.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg transition-shadow hover:shadow-xl">
            <CardHeader className="pb-4 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                <GraduationCap className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-xl">
                Different exam formats
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-base">
                Practice MCQs, short answers, or longer questions—whatever your
                exam style demands.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg transition-shadow hover:shadow-xl">
            <CardHeader className="pb-4 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                <Brain className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-xl">
                Smarter question quality
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-base">
                The AI focuses on key ideas and understanding—not just surface-level
                recall.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-purple-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Ready to study with better questions?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-blue-100">
            Join students who are already using TopicToTest to feel more confident
            going into exams.
          </p>

          <Link href="/auth">
            <Button
              size="lg"
              className="bg-white px-8 text-blue-600 hover:bg-gray-100"
            >
              Get started for free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">TopicToTest</span>
          </div>

          <p className="text-gray-400">
            © 2024 TopicToTest. Built to make studying less painful.
          </p>
        </div>
      </footer>
    </div>
  )
}
