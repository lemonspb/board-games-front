export type GameEvent = {
  id: number;
  title: string;
  description?: string;
  date: string;
  participants: string[];
  boardGames: number[];
  count: number;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
};
