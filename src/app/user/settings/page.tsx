"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import React from "react"; // Import React for useState

export default function SettingsPage() {
  // Example state for controlled components, if needed later.
  // For now, using defaultChecked/defaultValue.
  // const [theme, setTheme] = React.useState("dark");
  // const [emailNotifications, setEmailNotifications] = React.useState(true);
  // const [pushNotifications, setPushNotifications] = React.useState(false);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>

      <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Customize the look and feel of the application.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="theme-mode" className="text-base font-medium">
              Theme Mode
            </Label>
            <RadioGroup defaultValue="dark" id="theme-mode" className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div>
                <RadioGroupItem value="light" id="theme-light" />
                <Label htmlFor="theme-light" className="ml-2 cursor-pointer">
                  Light
                </Label>
              </div>
              <div>
                <RadioGroupItem value="dark" id="theme-dark" />
                <Label htmlFor="theme-dark" className="ml-2 cursor-pointer">
                  Dark
                </Label>
              </div>
              <div>
                <RadioGroupItem value="system" id="theme-system" />
                <Label htmlFor="theme-system" className="ml-2 cursor-pointer">
                  System
                </Label>
              </div>
            </RadioGroup>
            <p className="text-sm text-muted-foreground">Select your preferred theme. &apos;System&apos; will match your operating system&apos;s setting.</p>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Manage your notification preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-2 p-3 bg-secondary/30 rounded-md">
            <Label htmlFor="email-notifications" className="flex flex-col space-y-1 cursor-pointer">
              <span>Email Notifications</span>
              <span className="font-normal leading-snug text-muted-foreground">Receive important updates and alerts via email.</span>
            </Label>
            <Switch id="email-notifications" defaultChecked aria-labelledby="email-notifications" />
          </div>
          <div className="flex items-center justify-between space-x-2 p-3 bg-secondary/30 rounded-md">
            <Label htmlFor="push-notifications" className="flex flex-col space-y-1 cursor-pointer">
              <span>Push Notifications</span>
              <span className="font-normal leading-snug text-muted-foreground">Get real-time alerts directly on your device (if supported).</span>
            </Label>
            <Switch id="push-notifications" aria-labelledby="push-notifications" />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end pt-4">
        <Button className="transition-transform duration-300 hover:scale-105 active:scale-95">
          <Save className="mr-2 h-4 w-4" /> Save Changes
        </Button>
      </div>
    </div>
  );
}
