import { MarketOverview } from "@/components/home/market-overview";
import { TopStocks } from "@/components/home/top-stocks";
import { PortfolioSummary } from "@/components/home/portfolio-summary";

export default function Home() {
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
