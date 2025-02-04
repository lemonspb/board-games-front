import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/shared/ui/button";

import { Sheet, SheetTrigger, SheetContent } from "@/shared/ui/sheet";

export const MainNav = () => {
  return (
    <>
      <nav className="hidden flex-col gap-0 text-lg font-bold md:flex md:flex-row md:items-center md:gap-5 md:text-base lg:gap-6">
        <Link
          href="/boardgames"
          className="text-muted-foreground transition-colors text-lg hover:text-foreground w-32"
        >
          Настольные вечера
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-bold">
            <Link
              href="/boardgames"
              className="text-muted-foreground hover:text-foreground"
            >
              Топ настольных игр
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
};
