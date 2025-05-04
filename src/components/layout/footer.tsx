import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-auto border-t bg-card py-6 px-4 md:px-6">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} TradeStart. All rights reserved.</p>
        <nav className="flex gap-4 sm:gap-6">
          <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors" prefetch={false}>
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
}
