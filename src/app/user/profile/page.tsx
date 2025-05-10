"use client";

import { useAuth } from "@/context/auth-context";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { UserCircle, Mail, Edit3 } from "lucide-react";

export default function ProfilePage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-1/4" />
        <Card className="w-full max-w-2xl mx-auto shadow-lg">
          <CardHeader className="items-center text-center">
            <Skeleton className="h-24 w-24 rounded-full" />
            <Skeleton className="h-6 w-1/2 mt-4" />
            <Skeleton className="h-4 w-3/4 mt-2" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-4 w-full" />
            </div>
            <div className="flex items-center space-x-3">
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-4 w-full" />
            </div>
            <Skeleton className="h-10 w-1/3 mt-6 mx-auto" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) {
    // This case should ideally be handled by middleware, but as a fallback:
    return (
      <div className="text-center py-10">
        <p className="text-lg text-muted-foreground">Please log in to view your profile.</p>
      </div>
    );
  }

  const userInitial = user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || "U";

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">My Profile</h1>
      <Card className="w-full max-w-2xl mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="items-center text-center">
          <Avatar className="h-24 w-24 text-4xl border-2 border-primary">
            <AvatarImage src={user.photoURL || `https://picsum.photos/seed/${user.uid}/100/100`} alt={user.displayName || user.email || "User Avatar"} data-ai-hint="person portrait" />
            <AvatarFallback className="bg-primary text-primary-foreground">{userInitial}</AvatarFallback>
          </Avatar>
          <CardTitle className="mt-4 text-2xl">{user.displayName || "User"}</CardTitle>
          <CardDescription>View and manage your personal information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {user.displayName && (
            <div className="flex items-center space-x-3 p-3 bg-secondary/30 rounded-md">
              <UserCircle className="h-5 w-5 text-primary" />
              <span className="text-sm text-foreground">{user.displayName}</span>
            </div>
          )}
          {user.email && (
            <div className="flex items-center space-x-3 p-3 bg-secondary/30 rounded-md">
              <Mail className="h-5 w-5 text-primary" />
              <span className="text-sm text-foreground">{user.email}</span>
            </div>
          )}

          <div className="pt-4 text-center">
            <Button variant="outline" className="transition-transform duration-300 hover:scale-105">
              <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
