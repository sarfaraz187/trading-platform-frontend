"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"; // Added SheetClose
import { Menu, Mountain, LogIn, LogOut, UserPlus, HomeIcon } from "lucide-react"; // Added icons
import { useAuth } from "@/context/auth-context"; // Import useAuth
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton for loading state
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export function Header() {
  const { user, loading, logout } = useAuth(); // Get user, loading state, and logout function
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    await logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    router.push("/login"); // Redirect to login after logout
  };

  const renderAuthLinks = (isMobile = false) => {
    if (loading) {
      // Show skeletons while loading authentication state
      return (
        <div className={`flex items-center gap-${isMobile ? "4" : "6"}`}>
          <Skeleton className={`h-8 w-${isMobile ? "full" : "20"}`} />
          <Skeleton className={`h-8 w-${isMobile ? "full" : "20"}`} />
        </div>
      );
    }

    const commonLinkClasses = "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground flex items-center gap-2"; // Added flex, items-center, gap
    const mobileLinkClasses = "text-lg"; // Larger text for mobile sheet

    if (user) {
      // User is logged in, show Logout button
      const buttonContent = (
        <>
          <LogOut className="h-4 w-4" /> Logout
        </>
      );

      if (isMobile) {
        return (
          <SheetClose asChild>
            <Button variant="ghost" onClick={handleLogout} className={`${commonLinkClasses} ${mobileLinkClasses} justify-start w-full`}>
              {buttonContent}
            </Button>
          </SheetClose>
        );
      } else {
        return (
          <Button variant="ghost" onClick={handleLogout} className={commonLinkClasses}>
            {buttonContent}
          </Button>
        );
      }
    } else {
      // User is logged out, show Login and Sign Up links
      const loginLink = (
        <Link href="/login" className={`${commonLinkClasses} ${isMobile ? mobileLinkClasses : ""}`} prefetch={false}>
          <LogIn className="h-4 w-4" /> Login
        </Link>
      );

      const signupLink = (
        <Link href="/signup" className={`${commonLinkClasses} ${isMobile ? mobileLinkClasses : ""}`} prefetch={false}>
          <UserPlus className="h-4 w-4" /> Sign Up
        </Link>
      );

      if (isMobile) {
        return (
          <>
            <SheetClose asChild>{loginLink}</SheetClose>
            <SheetClose asChild>{signupLink}</SheetClose>
          </>
        );
      } else {
        return (
          <>
            {loginLink}
            <Button asChild size="sm">
              <Link href="/signup" prefetch={false}>
                <UserPlus className="mr-2 h-4 w-4" /> Sign Up
              </Link>
            </Button>
          </>
        );
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-card px-4 md:px-6 shadow-sm">
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <Mountain className="h-6 w-6 text-primary" />
        <span className="text-lg font-semibold text-foreground">TradeStart</span>
      </Link>
      <nav className="hidden items-center gap-6 md:flex">
        <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground flex items-center gap-2" prefetch={false}>
          <HomeIcon className="h-4 w-4" /> Home
        </Link>
        {/* Render auth links for desktop */}
        {renderAuthLinks()}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <nav className="grid gap-4 py-6 text-lg font-medium">
            <Link href="/" className="flex items-center gap-2 px-2.5 mb-4" prefetch={false}>
              <Mountain className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold text-foreground">TradeStart</span>
            </Link>
            <SheetClose asChild>
              <Link href="/" className="text-muted-foreground transition-colors hover:text-foreground flex items-center gap-2 px-2.5" prefetch={false}>
                <HomeIcon className="h-5 w-5" /> Home
              </Link>
            </SheetClose>
            {/* Render auth links for mobile */}
            <div className="grid gap-4 px-2.5">{renderAuthLinks(true)}</div>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
