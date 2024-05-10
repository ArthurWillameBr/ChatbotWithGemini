"use client"

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useChat } from "ai/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

const Chat = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
  });

  return (
    <Card className="w-[540px]">
      <CardHeader>
        <CardTitle>Chat AI</CardTitle>
        <CardDescription>Chatbot feito com Gemini e Nextjs</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] w-full space-y-5 ">
        {messages.map((message) => {
          return (
            <div key={message.id} className="flex gap-4 mb-2 text-slate-600 text-sm">
              {message.role === "user" && (
                <Avatar>
                  <AvatarFallback>AW</AvatarFallback>
                  <AvatarImage src="https://github.com/ArthurWillameBr.png" />
                </Avatar>
              )}
              {message.role === "assistant" && (
                <Avatar>
                  <AvatarFallback>RS</AvatarFallback>
                  <AvatarImage src="https://github.com/GAwesomeBot.png" />
                </Avatar>
              )}
              <p className="leading-relaxed mb-2 mr-2">
                <span className="block font-bold text-slate-700">
                  {message.role === "user" ? "Usuário" : "AI"}
                </span>
                {message.content}
              </p>
            </div>
          );
        })}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form className=" w-full flex gap-2 items-center " onSubmit={handleSubmit}>
          <Input
            placeholder="O que eu posso de ajudar?"
            value={input}
            onChange={handleInputChange}
          />
          <Button type="submit" >Send</Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default Chat;
