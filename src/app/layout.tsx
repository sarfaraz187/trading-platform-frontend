import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Using Inter font
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/toaster"; // Import Toaster
import { Header } from "@/components/layout/header"; // Import Header

const inter = Inter({ subsets: ['latin'], variable: "--font-sans" });

export const metadata: Metadata = {
  title: 'TradeStart', // Updated App Name
  description: 'Your starting point for stock trading.', // Updated Description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
       {/* Added suppressHydrationWarning for potential theme mismatches initially */}
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased dark", // Apply dark class by default
          inter.variable
        )}
      >
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8 md:px-6 lg:py-12">
            {children}
          </main>
          {/* Optionally add a footer here */}
        </div>
        <Toaster /> {/* Add Toaster component */}
      </body>
    </html>
  );
}
