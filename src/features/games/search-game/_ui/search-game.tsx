"use client";

import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { Input } from "@/shared/ui/input";
import { ChevronDown, Loader } from "lucide-react";
import { Game } from "../model/types";
import { Label } from "@/shared/ui/label";

// Функция для запроса игр с сервера
const fetchGames = async (query: string): Promise<Game[]> => {
  if (!query) return [];
  const res = await fetch(`http://localhost:3003/bgg/search?query=${query}`);
  return res.json();
};

interface SearchGameProps {
  onSelectGame: (game: Game) => void;
}

export function SearchGame({ onSelectGame }: SearchGameProps) {
  const [search, setSearch] = useState("");
  const [value] = useDebounce(search, 1000);
  const [open, setOpen] = useState(false);

  // Запрос на сервер с debounce
  const { data: games = [], isLoading } = useQuery({
    queryKey: ["games", value],
    queryFn: () => fetchGames(value),
    enabled: Boolean(value),
  });

  useEffect(() => {
    setOpen(games.length > 0);
  }, [games]);

  const handleSelect = useCallback(
    (game: Game) => {
      onSelectGame(game);
      setOpen(false);
    },
    [onSelectGame],
  );

  return (
    <div className="w-full">
      <Label htmlFor="search-game">Поиск по играм</Label>
      <div className="relative mt-2">
        <Input
          name="search-game"
          placeholder="Введите название игры"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {isLoading ? (
          <Loader className="animate-spin absolute right-2 top-2 w-5 h-5 cursor-pointer" />
        ) : (
          <ChevronDown
            onClick={() => setOpen((prev) => !prev)}
            className={`absolute right-2 top-2 w-5 h-5 cursor-pointer ${games.length > 0 ? "visible" : "hidden"}`}
          />
        )}
      </div>
      {open && (
        <div className="border rounded-sm max-h-48 mt-1 overflow-y-auto bg-stone-50">
          {games.map((game) => (
            <div
              key={game.id}
              className="text-sm border-b border-stone-200 w-full cursor-pointer hover:bg-stone-100 p-2"
              onClick={() => handleSelect(game)}
            >
              {game.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
