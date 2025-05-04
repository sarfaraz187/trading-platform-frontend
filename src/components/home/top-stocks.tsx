import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowUp, ArrowDown } from "lucide-react"

// Mock data for demonstration
const topStocks = [
  { symbol: "AAPL", name: "Apple Inc.", price: 175.50, change: "+1.2%", marketCap: "2.8T" },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 330.25, change: "+0.8%", marketCap: "2.5T" },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 2800.75, change: "-0.5%", marketCap: "1.9T" },
  { symbol: "AMZN", name: "Amazon.com, Inc.", price: 140.00, change: "+2.1%", marketCap: "1.4T" },
  { symbol: "TSLA", name: "Tesla, Inc.", price: 750.80, change: "+3.5%", marketCap: "0.8T" },
];

export function TopStocks() {
  const renderChange = (change: string) => {
    const isPositive = change.startsWith('+');
    const Icon = isPositive ? ArrowUp : ArrowDown;
    const colorClass = isPositive ? 'text-accent' : 'text-destructive';

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
        <CardTitle>Top Performing Stocks</CardTitle>
         <CardDescription>Based on recent market activity.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead className="hidden md:table-cell">Name</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Change</TableHead>
              <TableHead className="text-right hidden sm:table-cell">Market Cap</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topStocks.map((stock) => (
              <TableRow key={stock.symbol} className="hover:bg-secondary/30 transition-colors duration-200">
                <TableCell>
                  <Badge variant="secondary">{stock.symbol}</Badge>
                </TableCell>
                 <TableCell className="font-medium hidden md:table-cell">{stock.name}</TableCell>
                <TableCell className="text-right">${stock.price.toFixed(2)}</TableCell>
                <TableCell className="text-right">{renderChange(stock.change)}</TableCell>
                <TableCell className="text-right hidden sm:table-cell">{stock.marketCap}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
