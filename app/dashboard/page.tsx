"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useSession,signOut } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Brain, Plus, X, Sparkles, BookOpen, Clock, User, LogOut } from "lucide-react"
import Link from "next/link"
import toast from "react-hot-toast"

export default function Dashboard() {
  const {data:session}=useSession()
  const [topics, setTopics] = useState<string>()
  const [currentTopic, setCurrentTopic] = useState("")
  const [examType, setExamType] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [questionCount, setQuestionCount] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedQuestions, setGeneratedQuestions] = useState<any[]>([])


 if(!session) return 
  const generateQuestions = async () => {
    if (!currentTopic|| !examType || !difficulty || !questionCount) return

    setIsGenerating(true)

    // Simulate AI question generation
    // setTimeout(() => {
    //   const sampleQuestions = [
    //     {
    //       id: 1,
    //       type: "Multiple Choice",
    //       question: `Which of the following best describes ${topics[0]}?`,
    //       options: ["Option A", "Option B", "Option C", "Option D"],
    //       difficulty: difficulty,
    //       topic: topics[0],
    //     },
    //     {
    //       id: 2,
    //       type: "Short Answer",
    //       question: `Explain the key concepts related to ${topics[0]} and provide examples.`,
    //       difficulty: difficulty,
    //       topic: topics[0],
    //     },
    //     {
    //       id: 3,
    //       type: "Essay",
    //       question: `Analyze the importance of ${topics[0]} in modern context. Discuss its applications and implications.`,
    //       difficulty: difficulty,
    //       topic: topics[0],
    //     },
    //   ]

    //   setGeneratedQuestions(sampleQuestions)
    //   setIsGenerating(false)
    // }, 2000)
if(currentTopic!==''){
  console.log('Topic received:', currentTopic);
    console.log('Exam Type:', examType);
    console.log('QUestion COunt:', questionCount);

  setIsGenerating(true);
  const res = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ currentTopic,questionCount,examType }),
  });

  const data = await res.json();
  console.log(data.questions);
  setGeneratedQuestions(data.questions)
    setIsGenerating(false);
    }

  }


  const handleLogout=async()=>{
    await signOut({redirect:false})
    toast.success('You Have Been Logged Out')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-purple-600">
              TopicToTest
            </span>
          </Link>
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <User className="w-4 h-4" />
              {session.user.name||'GUEST'}
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-purple-600">
              Generate Your Exam Questions
            </h1>
            <p className="text-gray-600 text-lg">
              Add your study topics and let AI create personalized practice questions for you
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card className="border-0 shadow-lg h-[75vh]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Question Setup
                </CardTitle>
                <CardDescription>
                  Configure your exam questions by adding topics and selecting preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Topics Input */}
                <div className="space-y-3">
                  <Label htmlFor="topic">Study Topics</Label>
                  <div className="flex gap-2">
                    <Input
                      id="topic"
                      placeholder="e.g., Photosynthesis, World War II, Calculus..."
                      value={currentTopic}
                      onChange={(e) => setCurrentTopic(e.target.value)}
                      // onKeyDown={(e) => e.key === "Enter" && addTopic()}
                    />
                  </div>
                </div>

                <Separator />

                {/* Exam Configuration */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Exam Type</Label>
                    <Select value={examType} onValueChange={setExamType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="midterm">Midterm Exam</SelectItem>
                        <SelectItem value="final">Final Year Exam</SelectItem>
                        <SelectItem value="practice test">Practice Test</SelectItem>
                        <SelectItem value="waec">WAEC</SelectItem>
                        <SelectItem value="jamb">JAMB</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Difficulty Level</Label>
                    <Select value={difficulty} onValueChange={setDifficulty}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Number of Questions</Label>
                  <Select value={questionCount} onValueChange={setQuestionCount}>
                    <SelectTrigger>
                      <SelectValue placeholder="How many questions?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 Questions</SelectItem>
                      <SelectItem value="10">10 Questions</SelectItem>
                      <SelectItem value="15">15 Questions</SelectItem>
                      <SelectItem value="20">20 Questions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={generateQuestions}
                  className="w-full bg-purple-800 hover:to-purple-700"
                  disabled={!currentTopic || !examType || !difficulty || !questionCount || isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Generating Questions...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Questions
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>











            {/* Results Section */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  Generated Questions
                </CardTitle>
                <CardDescription>
                  {generatedQuestions.length > 0
                    ? `${generatedQuestions.length} questions generated for your ${examType}`
                    : "Your generated questions will appear here"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {generatedQuestions.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <Brain className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>Add topics and click "Generate Questions" to get started</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {generatedQuestions.map((question, index) => (
                      <div key={question.id} className="border rounded-lg p-4 bg-gray-50">
                        <div className="flex items-center justify-between mb-3">
                          <Badge variant="outline" className="text-xs">
                            Question {index + 1}
                          </Badge>
                          {topics}
                          <div className="flex gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {question.type}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {question.difficulty}
                            </Badge>
                          </div>
                        </div>
                        <p className="font-medium text-gray-900 mb-3">{question.question}</p>
                        {question.options && (
                          <div className="space-y-1">
                            {question.options.map((option: string, optIndex: number) => (
                              <div key={optIndex} className="text-sm text-gray-600 pl-4">
                                {String.fromCharCode(65 + optIndex)}. {option}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}

                    {/* <div className="flex gap-3 pt-4">
                      <Button variant="outline" className="flex-1 bg-transparent">
                        Export Questions
                      </Button>
                      <Button variant="outline" className="flex-1 bg-transparent">
                        Save for Later
                      </Button>
                    </div> */}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
