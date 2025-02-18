import { Trash } from "lucide-react";
import { Game } from "../model/types";

interface ListGamesProps {
  games: Game[];
  onDelete: (id: number) => void;
}

export function ListGames({ games, onDelete }: ListGamesProps) {
  return (
    <div className="mt-11">
      <h3 className="text-xl">Добавленные игры</h3>
      <div>
        {games.map((game) => (
          <div
            className="text-lg cursor-pointer group flex items-center gap-2"
            key={game.id}
          >
            <span>
              {game.name} {game.yearpublished}
            </span>
            <Trash
              className="w-5 h-5 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-700"
              onClick={() => onDelete(game.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
