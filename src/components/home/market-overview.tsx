import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

// Mock data for demonstration
const marketData = [
  { name: "S&P 500", value: "4,500.50", change: "+0.5%", changeType: "positive" as const },
  { name: "Dow Jones", value: "35,000.75", change: "-0.2%", changeType: "negative" as const },
  { name: "Nasdaq", value: "14,000.20", change: "+1.1%", changeType: "positive" as const },
  { name: "Russell 2000", value: "1,950.00", change: "0.0%", changeType: "neutral" as const },
];

export function MarketOverview() {
  const renderChange = (change: string, changeType: 'positive' | 'negative' | 'neutral') => {
    const Icon = changeType === 'positive' ? TrendingUp : changeType === 'negative' ? TrendingDown : Minus;
    const colorClass = changeType === 'positive' ? 'text-accent' : changeType === 'negative' ? 'text-destructive' : 'text-muted-foreground';

    return (
      <span className={`flex items-center gap-1 text-sm ${colorClass}`}>
        <Icon className="h-4 w-4" />
        {change}
      </span>
    );
  };

  return (
    <Card className="bg-card text-card-foreground shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle>Market Overview</CardTitle>
        <CardDescription>Key market indices performance.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {marketData.map((index) => (
            <div key={index.name} className="p-4 border rounded-lg bg-secondary/50">
              <h3 className="text-sm font-medium text-muted-foreground">{index.name}</h3>
              <p className="text-lg font-semibold text-foreground mt-1">{index.value}</p>
              <div className="mt-1">{renderChange(index.change, index.changeType)}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
