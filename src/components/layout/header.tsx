import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Mountain } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-card px-4 md:px-6 shadow-sm">
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <Mountain className="h-6 w-6 text-primary" />
        <span className="text-lg font-semibold text-foreground">TradeStart</span>
      </Link>
      <nav className="hidden items-center gap-6 md:flex">
        <Link
          href="/"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          prefetch={false}
        >
          Home
        </Link>
        <Link
          href="/signup"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          prefetch={false}
        >
          Sign Up
        </Link>
        {/* Future links can go here */}
      </nav>
       <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <nav className="grid gap-6 text-lg font-medium">
             <Link href="/" className="flex items-center gap-2" prefetch={false}>
                <Mountain className="h-6 w-6 text-primary" />
                <span className="text-lg font-semibold text-foreground">TradeStart</span>
            </Link>
             <Link
                href="/"
                className="text-muted-foreground transition-colors hover:text-foreground"
                prefetch={false}
            >
                Home
            </Link>
             <Link
                href="/signup"
                className="text-muted-foreground transition-colors hover:text-foreground"
                prefetch={false}
            >
                Sign Up
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
