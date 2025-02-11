"use client";

import { CreateEventForm } from "@/features/game-event/create-game-event";
import { SearchGame, ListGames, Game } from "@/features/games/search-game";
import { useState } from "react";

export function EventCreateWidget() {
  const [games, setGames] = useState<Game[]>([]);

  const handleSelectGame = (newGame: Game) => {
    if (!games.some((game) => game.id === newGame.id)) {
      setGames((prev) => [...prev, newGame]);
    }
  };

  const handleDeleteGame = (id: number) => {
    setGames((prev) => prev.filter((game) => game.id !== id));
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-8 sm:p-20 gap-16 font-[family-name:var(--font-geist-sans)] text-4xl">
      <h1 className="text-3xl font-bold">Создание события</h1>
      <div className="flex w-full gap-12">
        <CreateEventForm />
        <SearchGame onSelectGame={handleSelectGame} />
        <ListGames games={games} onDelete={handleDeleteGame} />
      </div>
    </div>
  );
}
