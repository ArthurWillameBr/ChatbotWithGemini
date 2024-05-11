"use client";

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
  const { messages, input, handleInputChange, handleSubmit  } = useChat({
    api: "/api/chat",
  });

  return (
    <Card className="w-full  text-slate-50 bg-transparent border-none lg:w-[32rem] lg:bg-neutral-700 md:bg-neutral-700 lg:border lg:shadow-2xl md:max-w-[26rem] md:border md:shadow-2xl">
      <CardHeader className="text-center ">
        <CardTitle>Chat AI</CardTitle>
        <CardDescription className="text-slate-100">
          Chatbot feito com Gemini e Nextjs
        </CardDescription>
      </CardHeader>
      <CardContent >
        {messages.length === 0 ? (
          <div className="flex flex-col gap-2 items-center justify-center h-[60vh] space-y-5 md:max-h-[64vh]">
            <Avatar>
              <AvatarFallback>RS</AvatarFallback>
              <AvatarImage src="https://github.com/GAwesomeBot.png" />
            </Avatar>
            <p>Como posso ajudá-lo hoje?</p>
          </div>
        ) : (
          <ScrollArea className="h-[60vh]  space-y-5 overflow-y-hidden md:max-h-[64vh] ">
            {messages.map((message) => {
              return (
                <div
                  key={message.id}
                  className="flex gap-3 mb-2 text-slate-50 text-sm"
                >
                  {message.role === "user" && (
                    <Avatar>
                      <AvatarFallback>AW</AvatarFallback>
                      <AvatarImage  className="size-10" src="https://github.com/Cat7373.png" />
                    </Avatar>
                  )}
                  {message.role === "assistant" && (
                    <Avatar>
                      <AvatarFallback>RS</AvatarFallback>
                      <AvatarImage src="https://github.com/GAwesomeBot.png" />
                    </Avatar>
                  )}
                  <p className="leading-relaxed mb-4 mr-3">
                    <span className="block font-bold text-slate-50">
                      {message.role === "user" ? "Usuário" : "AI"}
                    </span>
                    {message.content}
                  </p>
                </div>
              );
            })}
          </ScrollArea>
        )}
      </CardContent>
      <CardFooter>
        <form
          className="w-full flex gap-2 items-center  "
          onSubmit={handleSubmit}
        >
          <Input
            placeholder="Pergunte ao chatbot"
            className="text-black"
            value={input}
            onChange={handleInputChange}
          />
          <Button type="submit">Enviar</Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default Chat;
