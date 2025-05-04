import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:py-12">
      <Card className="bg-card text-card-foreground">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Terms of Service</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            Welcome to TradeStart! These terms and conditions outline the rules and regulations for the use of TradeStart's Website, located at tradestart.com.
          </p>
          <p>
            By accessing this website we assume you accept these terms and conditions. Do not continue to use TradeStart if you do not agree to take all of the terms and conditions stated on this page.
          </p>
          <h2 className="text-xl font-semibold text-foreground pt-4">Cookies</h2>
          <p>
            We employ the use of cookies. By accessing TradeStart, you agreed to use cookies in agreement with the TradeStart's Privacy Policy.
          </p>
          <h2 className="text-xl font-semibold text-foreground pt-4">License</h2>
          <p>
            Unless otherwise stated, TradeStart and/or its licensors own the intellectual property rights for all material on TradeStart. All intellectual property rights are reserved. You may access this from TradeStart for your own personal use subjected to restrictions set in these terms and conditions.
          </p>
          <p>You must not:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Republish material from TradeStart</li>
            <li>Sell, rent or sub-license material from TradeStart</li>
            <li>Reproduce, duplicate or copy material from TradeStart</li>
            <li>Redistribute content from TradeStart</li>
          </ul>
          <p>This Agreement shall begin on the date hereof.</p>
          {/* Add more detailed terms here */}
          <p className="pt-4">
            Please read these terms carefully before using our service. Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
