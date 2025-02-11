"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Game } from "../model/types";
import { useDebounce } from "use-debounce";
import { Input } from "@/shared/ui/input";

// Функция для запроса игр с сервера
const fetchGames = async (query: string): Promise<Game[]> => {
  if (!query) return [];
  const res = await fetch(`http://localhost:3003/bgg/search?query=${query}`);
  return res.json();
};

export function SearchGame({
  onSelectGame,
}: {
  onSelectGame: (game: Game) => void;
}) {
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [value] = useDebounce(search, 1000);

  // Запрос на сервер с debounce
  const { data: games } = useQuery({
    queryKey: ["games", value],
    queryFn: () => fetchGames(value),
    enabled: !!value, // Запрос отправляется только если есть поисковая строка
  });

  //   if (isLoading) return <div>Загрузка...</div>;
  //   if (isError) return <div>Произошла ошибка</div>;

  return (
    <div className="w-full">
      <Input
        placeholder="Введите название игры"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div
        className={`border-l border-r rounded-sm  max-h-48 mt-2 overflow-y-auto bg-slate-50 ${open ? "hidden" : "visible"}`}
      >
        {games &&
          games?.length > 0 &&
          games?.map((game: Game) => (
            <div
              className="text-sm
            border-b 
                w-full h-auto  cursor-pointer hover:bg-slate-100 p-2"
              key={game.id}
              onClick={() => {
                onSelectGame(game);
                setOpen(false);
              }}
            >
              {game.name}
            </div>
          ))}
      </div>
    </div>
  );
}
