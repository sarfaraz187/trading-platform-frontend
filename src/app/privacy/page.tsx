import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:py-12">
      <Card className="bg-card text-card-foreground">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            Your privacy is important to us. It is TradeStart's policy to respect your privacy regarding any information we may collect from you across our website, tradestart.com, and other sites we own and operate.
          </p>
          <h2 className="text-xl font-semibold text-foreground pt-4">Information We Collect</h2>
          <p>
            We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.
          </p>
          <p>
            Log data: Like most website operators, TradeStart collects non-personally-identifying information of the sort that web browsers and servers typically make available, such as the browser type, language preference, referring site, and the date and time of each visitor request.
          </p>
           <p>
            Personal Information: We may ask you for personal information, such as your name, email address, and contact details when you register for an account or subscribe to our newsletter.
          </p>
          <h2 className="text-xl font-semibold text-foreground pt-4">How We Use Information</h2>
          <p>
            We use the information we collect in various ways, including to:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Provide, operate, and maintain our website</li>
            <li>Improve, personalize, and expand our website</li>
            <li>Understand and analyze how you use our website</li>
            <li>Develop new products, services, features, and functionality</li>
            <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
            <li>Send you emails</li>
            <li>Find and prevent fraud</li>
          </ul>
           <h2 className="text-xl font-semibold text-foreground pt-4">Security</h2>
           <p>
             The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.
           </p>
          {/* Add more detailed privacy policy points here */}
          <p className="pt-4">
            This policy is effective as of [Date]. We reserve the right to update or change our Privacy Policy at any time and you should check this Privacy Policy periodically.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
