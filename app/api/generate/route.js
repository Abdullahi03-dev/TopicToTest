// app/api/generate/route.js
import { GoogleGenAI } from '@google/genai';

export async function POST(req) {
  try {
    console.log('Incoming POST request');

    const body = await req.json();
    const { currentTopic,questionCount,examType } = body;

    console.log('Topic received:', currentTopic);
    console.log('Exam Type:', examType);
    console.log('QUestion COunt:', questionCount);


    if (!process.env.GEMINI_API_KEY) {
      console.error('Missing GEMINI_API_KEY in environment');
      return new Response(JSON.stringify({ error: 'API key not set' }), { status: 500 });
    }

    const genAI = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const response = await genAI.models.generateContent({
      model: 'gemini-2.0-flash-001',
      contents: `Generate "${questionCount}" quiz questions in JSON array format for the topic: "${currentTopic}". Generate them based on THIS EXAM TYPE "${examType}". Each object in the array should follow this structure:

{
  "id": number,
  "question": string,
  "type": "true/false" | "essay" ,
  "difficulty": "easy" | "medium" | "hard"
}

Return only the array as raw JSON (no explanation or markdown).`,
    });

    const raw = await response.text;

    const clean = raw.replace(/```json|```/g, '').trim();

    const questions = JSON.parse(clean);

    console.log('Successfully parsed questions:', questions);

    return new Response(JSON.stringify({ questions }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error occurred:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}