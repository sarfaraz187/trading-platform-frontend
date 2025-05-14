"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useAuth, signupSchema } from "@/context/auth-context";
import { useAuthRedirect } from "@/hooks/use-redirect";

export default function SignupPage() {
  const { signup, loading } = useAuth(); // Get signup function and loading state
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [authAttempted, setAuthAttempted] = useState(false);
  useAuthRedirect(authAttempted, () => setAuthAttempted(false));

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: { username: "", email: "", password: "" },
  });

  async function onSubmit(values: z.infer<typeof signupSchema>) {
    const { success, error } = await signup(values);

    if (success) {
      toast({ title: "Account Created!", description: "You have successfully signed up.", variant: "default" });
      setAuthAttempted(true);
    } else {
      console.error("Signup failed:", error);
      // Map Firebase error codes to user-friendly messages
      let errorMessage = "An unexpected error occurred. Please try again.";
      if (error?.code === "auth/email-already-in-use") {
        errorMessage = "This email address is already in use.";
      } else if (error?.code === "auth/weak-password") {
        errorMessage = "The password is too weak.";
      }

      // Add more specific error handling as needed
      toast({ title: "Signup Failed", description: errorMessage, variant: "destructive" });
    }
  }

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="flex items-center justify-center py-12">
      <Card className="w-full max-w-md bg-card text-card-foreground shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
          <CardDescription className="text-center text-muted-foreground">Enter your details below to start trading with TradeStart.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Your username" {...field} className="bg-input text-foreground placeholder:text-muted-foreground transition-shadow duration-300 focus:shadow-md" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="email@example.com"
                        {...field}
                        className="bg-input text-foreground placeholder:text-muted-foreground transition-shadow duration-300 focus:shadow-md"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="********"
                          {...field}
                          className="bg-input text-foreground placeholder:text-muted-foreground transition-shadow duration-300 focus:shadow-md pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          onClick={togglePasswordVisibility}
                          tabIndex={-1} // Make button unfocusable
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300 hover:scale-[1.02] active:scale-[0.98]" disabled={loading}>
                {loading ? "Signing up..." : "Sign Up"}
              </Button>
            </form>
          </Form>
          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link href="/login" className="font-medium text-primary hover:underline" prefetch={false}>
              Log in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
