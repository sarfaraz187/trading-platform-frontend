'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  // Basic form state/submission logic would go here
  const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      // Handle login logic
      console.log("Login attempt");
  };

  return (
    <div className="flex items-center justify-center py-12">
      <Card className="w-full max-w-md bg-card text-card-foreground shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Login to TradeStart</CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                className="bg-input text-foreground placeholder:text-muted-foreground transition-shadow duration-300 focus:shadow-md"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="ml-auto inline-block text-sm text-primary hover:underline" prefetch={false}>
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                placeholder="********"
                className="bg-input text-foreground placeholder:text-muted-foreground transition-shadow duration-300 focus:shadow-md"
              />
            </div>
            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300 hover:scale-[1.02] active:scale-[0.98]">
              Login
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
             <span className="text-muted-foreground">Don&apos;t have an account? </span>
            <Link href="/signup" className="font-medium text-primary hover:underline" prefetch={false}>
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
