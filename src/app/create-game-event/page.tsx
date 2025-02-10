import { CreateEventForm } from "@/features/game-event/create-game-event";

export default function CreateGameEvent() {
  return (
    <div className=" items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-background: text-foreground text-4xl">
      <CreateEventForm />
    </div>
  );
}
