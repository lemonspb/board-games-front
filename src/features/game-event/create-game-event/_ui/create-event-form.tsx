"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/shared/ui/button";
import { Textarea } from "@/shared/ui/textarea";
import { DatePicker } from "@/shared/ui/datePicker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/shared/ui/form";
import { Game } from "@/features/games/search-game";
import { useMutation } from "@tanstack/react-query";
import { Input } from "@/shared/ui/input";
import { useCallback, useEffect } from "react";
import { ru } from "date-fns/locale";
import { useToast } from "@/shared/hooks/use-toast";

const formSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  eventDate: z.date(),
  boardGames: z.array(z.number()).optional(),
  count: z.number().optional(),
});

export function CreateEventForm({
  boardGames,
  clearGames,
}: {
  boardGames: Game[];
  clearGames: () => void;
}) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      eventDate: undefined,
      boardGames: [],
      count: NaN,
    },
  });

  const updateBoardGames = useCallback(() => {
    form.setValue(
      "boardGames",
      (boardGames ?? []).map((game) => Number(game.id)),
      { shouldValidate: true },
    );
  }, [boardGames, form]);

  useEffect(() => {
    updateBoardGames();
  }, [updateBoardGames]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      console.log(values);
      const res = await fetch("http://localhost:3003/events/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
    },
    onSuccess: () => {
      form.reset();
      clearGames();
      toast({
        description: "Событие успешно создано",
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Название</FormLabel>
                <FormControl>
                  <Input placeholder="Напишите название" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Описание</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Напишите описание"
                    {...field}
                    className="resize-none h-28"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="eventDate"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col mt-4">
                <FormLabel className="">Дата</FormLabel>
                <FormControl>
                  <DatePicker
                    locale={ru}
                    className="w-full"
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    placeholderText="Выберите дату и время"
                    timeCaption="Время"
                    dateFormat="MMMM d, yyyy HH:mm"
                    selected={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="count"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Количество людей</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                    type="number"
                    placeholder="Количество людей"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            isLoading={isPending}
            className="mt-10 min-w-40"
            type="submit"
          >
            Создать
          </Button>
        </form>
      </Form>
    </div>
  );
}
