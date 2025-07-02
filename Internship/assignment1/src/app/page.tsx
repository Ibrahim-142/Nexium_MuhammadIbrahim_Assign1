"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "./globals.css";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

const quotesByTopic: Record<string, string[]> = {
  Coding: [
    "Code is like humor. When you have to explain it, it’s bad.",
    "Programs must be written for people to read, and only incidentally for machines to execute.",
    "Talk is cheap. Show me the code.",
  ],
  Football: [
    "Success is no accident. It is hard work, perseverance, learning, and most of all, love of what you are doing.",
    "The more difficult the victory, the greater the happiness in winning.",
    "You have to fight to reach your dream. You have to sacrifice and work hard for it.",
  ],
  Cricket: [
    "You don’t play for the crowd; you play for the country.",
    "Enjoy the game and chase your dreams. Dreams do come true!",
    "Every morning I wake up, I believe I can score runs for Pakistan.",
  ],
  Gaming: [
    "Gamers don’t fear the apocalypse. They’ve seen it many times.",
    "Winning doesn’t always mean being first. It means doing better than you’ve ever done before.",
    "The only thing better than winning is leveling up.",
  ],
};

const formSchema = z.object({
  topic: z.string().min(1, "Please select a topic."),
});

export default function Home() {
  const [submittedTopic, setSubmittedTopic] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setSubmittedTopic(values.topic);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-100 via-blue-100 to-purple-100">
      <header className="w-full shadow p-4 bg-white/80 backdrop-blur">
        <div className="max-w-4xl mx-auto text-xl font-bold text-gray-800 text-center">
          Welcome to Muhammad Ibrahim&apos;s Assignment 1
        </div>
      </header>

      <Separator />

      <main className="flex-grow flex justify-center items-center px-4 mt-5">
        <div className="bg-white/90 shadow-2xl rounded-2xl p-8 w-full max-w-md backdrop-blur-sm">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Select a Topic
          </h1>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
              noValidate
            >
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Choose a topic</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                          <SelectValue placeholder="Select a topic..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Coding">💻 Coding</SelectItem>
                        <SelectItem value="Football">⚽ Football</SelectItem>
                        <SelectItem value="Cricket">🏏 Cricket</SelectItem>
                        <SelectItem value="Gaming">🎮 Gaming</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full transition-all duration-200 hover:scale-105"
              >
                Submit
              </Button>
            </form>
          </Form>

        {submittedTopic && (
  <Dialog open={!!submittedTopic} onOpenChange={() => setSubmittedTopic(null)}>
    <DialogTrigger asChild>
      <div className="hidden" />
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Motivational Quotes - {submittedTopic}</DialogTitle>
        <DialogDescription>
          Here are 3 motivational quotes for your selected topic:
        </DialogDescription>
      </DialogHeader>

      <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2">
        {quotesByTopic[submittedTopic]?.map((quote, index) => (
          <li key={index}>&quot;{quote}&quot;</li>
        ))}
      </ul>
    </DialogContent>
  </Dialog>
)}

        </div>
      </main>

      <footer className="w-full bg-white/80 backdrop-blur border-t mt-8 py-4">
        <div className="max-w-4xl mx-auto text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Muhammad Ibrahim. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
