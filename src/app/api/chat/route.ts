import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from 'ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

const addContextToPrompt = (prompt: string) => {
  return `" ${prompt}`
}

const buildGoogleGenAIPrompt = (messages: Message[]) => ({
  contents: messages
    .filter(message => message.role === 'user' || message.role === 'assistant')
    .map(message => ({
      role: message.role === 'user' ? 'user' : 'model',
      parts: [{ text: addContextToPrompt(message.content) }],
    })),
});

export async function POST(req: Request) {
  
  const { messages } = await req.json();

  const geminiStream = await genAI
    .getGenerativeModel({ model: 'gemini-pro'  })
    .generateContentStream(buildGoogleGenAIPrompt(messages));

  const stream = GoogleGenerativeAIStream(geminiStream);

  return new StreamingTextResponse(stream);
}