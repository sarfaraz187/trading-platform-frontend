import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toaster"; // Import Toaster
import { AuthProvider } from "@/context/auth-context"; // Import AuthProvider
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "TradeStart",
  description: "Your starting point for stock trading.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`min-h-screen bg-background font-sans antialiased dark ${inter.variable}`}>
        <AuthProvider>
          {/* Wrap content with AuthProvider */}
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 md:px-6 lg:py-12">{children}</main>
            <Footer />
          </div>
          <Toaster /> {/* Add Toaster here, outside the main flex container if positioned fixed */}
        </AuthProvider>
      </body>
    </html>
  );
}
