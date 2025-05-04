import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, DollarSign, PieChart } from "lucide-react"

// Mock data for demonstration
const portfolioData = {
  totalValue: 12500.75,
  todayChange: 75.50,
  todayChangePercent: 0.61,
  totalGainLoss: 1500.25,
  totalGainLossPercent: 13.64,
};

export function PortfolioSummary() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  const changeColor = portfolioData.todayChange >= 0 ? 'text-accent' : 'text-destructive';

  return (
    <Card className="bg-card text-card-foreground shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Portfolio Summary</CardTitle>
        <DollarSign className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-foreground">{formatCurrency(portfolioData.totalValue)}</div>
        <p className={`text-sm mt-1 ${changeColor}`}>
          {portfolioData.todayChange >= 0 ? '+' : ''}{formatCurrency(portfolioData.todayChange)} ({portfolioData.todayChangePercent.toFixed(2)}%) Today
        </p>
        <div className="mt-4 border-t pt-4">
            <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Gain/Loss</span>
                <span className={portfolioData.totalGainLoss >= 0 ? 'text-accent' : 'text-destructive'}>
                    {portfolioData.totalGainLoss >= 0 ? '+' : ''}{formatCurrency(portfolioData.totalGainLoss)} ({portfolioData.totalGainLossPercent.toFixed(2)}%)
                </span>
            </div>
        </div>
        <Button className="mt-6 w-full transition-transform duration-300 hover:scale-105">
          <PieChart className="mr-2 h-4 w-4" /> View Details
        </Button>
      </CardContent>
    </Card>
  );
}
