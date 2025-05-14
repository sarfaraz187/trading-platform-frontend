"use client";

import { useEffect } from "react";
import { MarketOverview } from "@/components/home/market-overview";
import { TopStocks } from "@/components/home/top-stocks";
import { PortfolioSummary } from "@/components/home/portfolio-summary";
import { useAuth } from "@/context/auth-context";
import { proxyToBackend } from "@/lib/api-proxy";

export default function Home() {
  const { user, loading } = useAuth();

  useEffect(() => {
    async function checkHealth() {
      try {
        const res = await fetch("/api/check-health");
        if (!res.ok) throw new Error("Health check failed");
        const data = await res.json();
        console.log("Health:", data);
      } catch (err) {
        console.error("Health check error:", err);
      }
    }

    checkHealth();
  }, []);

  useEffect(() => {
    console.log("Current user:", user);
    async function fetchUserData() {
      if (user) {
        try {
          const res = await fetch(`/api/user/${user.uid}`, { method: "GET" });
          if (!res.ok) throw new Error("Failed to fetch user data");
          const data = await res.json();
          console.log("User data:", data);
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      }
    }

    fetchUserData();
  }, [user]);
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>

      {/* Grid layout for the components */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
        {/* Market Overview spanning full width on small screens, 2/3 on large */}
        <div className="lg:col-span-2">
          <MarketOverview />
        </div>

        {/* Portfolio Summary taking 1/3 width on large screens */}
        <div className="lg:col-span-1">
          <PortfolioSummary />
        </div>
      </div>

      {/* Top Stocks table */}
      <div>
        <TopStocks />
      </div>

      {/* Add more sections/components as needed */}
    </div>
  );
}
