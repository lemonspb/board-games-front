import { MainNav } from "./_ui/nav";
import { ModeToggle } from "@/features/theme/theme-menu";
export function AppHeader() {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <MainNav />
      <ModeToggle />
    </header>
  );
}
