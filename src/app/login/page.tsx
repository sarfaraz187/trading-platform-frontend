"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAuth, loginSchema } from "@/context/auth-context"; // Import useAuth and schema
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const { login, loading } = useAuth(); // Get login function and loading state
  const { toast } = useToast();
  const router = useRouter(); // Initialize router
  const [showPassword, setShowPassword] = useState(false);
  const [authAttempted, setAuthAttempted] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  useEffect(() => {
    const checkCookie = async () => {
      if (!authAttempted) return;
      try {
        const response = await fetch("/api/auth/check-cookie");
        const data = await response.json(); // ✅ Needed

        console.log("Cookie check response:", data);

        if (data.authenticated) {
          router.push("/"); // ✅ Redirect if cookie exists
        } else {
          setTimeout(checkCookie, 200); // Poll until cookie appears
        }
      } catch (error) {
        console.error("Error checking cookie:", error);
        setAuthAttempted(false);
      }
    };

    checkCookie();
  }, [authAttempted]);

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log("Submit Triggered =========");
    const { success, error } = await login(values);
    if (success) {
      toast({
        title: "Login Successful",
        description: "Welcome back!",
        variant: "default",
      });
      setAuthAttempted(true);
    } else {
      console.error("Login failed:", error);
      toast({
        title: "Login Failed",
        description: error?.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  }

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="flex items-center justify-center py-12">
      <Card className="w-full max-w-md bg-card text-card-foreground shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Login to TradeStart</CardTitle>
          <CardDescription className="text-center text-muted-foreground">Enter your email and password below to login.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="m@example.com"
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
                    <div className="flex items-center">
                      <FormLabel>Password</FormLabel>
                      <Link href="#" className="ml-auto inline-block text-sm text-primary hover:underline" prefetch={false}>
                        Forgot your password?
                      </Link>
                    </div>
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
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </Form>
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
