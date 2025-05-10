"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"; // Added SheetClose
import { Menu, Mountain, LogIn, LogOut, UserPlus, HomeIcon, UserCircle, SettingsIcon } from "lucide-react"; // Added UserCircle, SettingsIcon
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
          {user && !isMobile && <Skeleton className="h-8 w-20" />}
          {user && !isMobile && <Skeleton className="h-8 w-20" />}
        </div>
      );
    }

    const commonLinkClasses = "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground flex items-center gap-2";
    const mobileLinkClasses = "text-lg";

    if (user) {
      // User is logged in
      const profileLink = (
        <Link href="/user/profile" className={`${commonLinkClasses} ${isMobile ? mobileLinkClasses + " justify-start w-full" : ""}`} prefetch={false}>
          <UserCircle className={isMobile ? "h-5 w-5" : "h-4 w-4"} /> Profile
        </Link>
      );
      const settingsLink = (
        <Link href="/user/settings" className={`${commonLinkClasses} ${isMobile ? mobileLinkClasses + " justify-start w-full" : ""}`} prefetch={false}>
          <SettingsIcon className={isMobile ? "h-5 w-5" : "h-4 w-4"} /> Settings
        </Link>
      );
      const logoutButton = (
        <Button variant="ghost" onClick={handleLogout} className={`${commonLinkClasses} ${isMobile ? mobileLinkClasses + " justify-start w-full" : ""}`}>
          <LogOut className={isMobile ? "h-5 w-5" : "h-4 w-4"} /> Logout
        </Button>
      );

      if (isMobile) {
        return (
          <>
            <SheetClose asChild>{profileLink}</SheetClose>
            <SheetClose asChild>{settingsLink}</SheetClose>
            <SheetClose asChild>{logoutButton}</SheetClose>
          </>
        );
      } else {
        return (
          <>
            {profileLink}
            {settingsLink}
            {logoutButton}
          </>
        );
      }
    } else {
      // User is logged out, show Login and Sign Up links
      const loginLink = (
        <Link href="/login" className={`${commonLinkClasses} ${isMobile ? mobileLinkClasses : ""}`} prefetch={false}>
          <LogIn className={isMobile ? "h-5 w-5" : "h-4 w-4"} /> Login
        </Link>
      );
      const signupButtonLink = // Changed to a button for desktop to match style
        (
          <Button asChild size="sm" variant={isMobile ? "ghost" : "default"} className={isMobile ? `${commonLinkClasses} ${mobileLinkClasses} justify-start w-full` : ""}>
            <Link href="/signup" prefetch={false}>
              <UserPlus className={isMobile ? "h-5 w-5" : "mr-2 h-4 w-4"} /> Sign Up
            </Link>
          </Button>
        );

      if (isMobile) {
        return (
          <>
            <SheetClose asChild>{loginLink}</SheetClose>
            <SheetClose asChild>{signupButtonLink}</SheetClose>
          </>
        );
      } else {
        return (
          <>
            {loginLink}
            {signupButtonLink}
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
            <SheetClose asChild>
              <Link href="/" className="flex items-center gap-2 px-2.5 mb-4" prefetch={false}>
                <Mountain className="h-6 w-6 text-primary" />
                <span className="text-lg font-semibold text-foreground">TradeStart</span>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href="/" className="text-muted-foreground transition-colors hover:text-foreground flex items-center gap-2 px-2.5 text-lg" prefetch={false}>
                <HomeIcon className="h-5 w-5" /> Home
              </Link>
            </SheetClose>
            {/* Render auth links for mobile */}
            <div className="grid gap-2 px-2.5">{renderAuthLinks(true)}</div>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
