/** @format */

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  CheckCircle,
  Calendar,
  Users,
  Zap,
  ArrowLeft,
  Crown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Subscription = () => {
  const navigate = useNavigate();

  const currentPlan = {
    name: "Standard",
    price: "$49.99",
    period: "per month",
    features: [
      "Remove all limits — leads, members, and staff, without restrictions",
      "Save time and effort on member communication and scheduling",
      "Boost client retention with wellness tools and automated reminders",
      "Save time and grow smarter with scheduling, communication, and deep insights",
    ],
  };

  const premiumPlan = {
    name: "Premium",
    price: "$79.99",
    period: "per month",
    features: [
      "Everything in Standard, plus:",
      "Advanced analytics and reporting",
      "Custom branding and white-label options",
      "Priority customer support",
      "API access for integrations",
      "Advanced automation workflows",
    ],
  };

  return (
    <div className="w-full">
      <Card className="h-[calc(100vh-3rem)] shadow-none border-none">
        <ScrollArea className="h-full">
          <CardHeader className="pb-4">
            <ArrowLeft
              className="mb-5 cursor-pointer"
              onClick={() => navigate(-1)}
            />
            <CardTitle className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Crown className="h-6 w-6" />
              Wellvantage Subscription
            </CardTitle>
            <CardDescription className="text-base">
              Manage your WellVantage Membership
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 pb-6">
            {/* Current Plan Section */}
            <Card className="shadow-none border-2 border-blue-200">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      Current Plan
                      <Badge
                        variant="secondary"
                        className="ml-2 bg-blue-100 text-blue-800"
                      >
                        Active
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      Your current subscription details
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600">
                      {currentPlan.price}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {currentPlan.period}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  {currentPlan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upgrade Section */}
            <Card className="shadow-none border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-2xl text-purple-700">
                      <Zap className="h-5 w-5" />
                      Upgrade to Premium
                    </CardTitle>
                    <CardDescription className="text-purple-600">
                      Get access to advanced features and tools
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-purple-600">
                      {premiumPlan.price}
                    </div>
                    <div className="text-sm text-purple-500">
                      {premiumPlan.period}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  {premiumPlan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Zap className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-purple-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-2.5">
                  Upgrade to Premium
                </Button>

                <div className="text-center">
                  <Badge variant="outline" className="bg-white text-purple-700">
                    🎉 Most popular choice among growing businesses
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Plan Comparison */}
            <Card className="shadow-none border border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Plan Comparison
                </CardTitle>
                <CardDescription>
                  See how our plans compare side by side
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Standard Plan */}
                  <div className="space-y-4 p-4 border border-blue-200 rounded-lg">
                    <div className="text-center">
                      <h3 className="font-bold text-lg text-blue-600">
                        Standard
                      </h3>
                      <div className="text-2xl font-bold mt-1">
                        {currentPlan.price}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {currentPlan.period}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Unlimited members</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Basic analytics</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Email support</span>
                      </div>
                    </div>
                  </div>

                  {/* Premium Plan */}
                  <div className="space-y-4 p-4 border border-purple-200 rounded-lg bg-purple-50">
                    <div className="text-center">
                      <h3 className="font-bold text-lg text-purple-600">
                        Premium
                      </h3>
                      <div className="text-2xl font-bold mt-1">
                        {premiumPlan.price}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {premiumPlan.period}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-purple-500" />
                        <span className="text-sm">Advanced analytics</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-purple-500" />
                        <span className="text-sm">Custom branding</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-purple-500" />
                        <span className="text-sm">Priority support</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-purple-500" />
                        <span className="text-sm">API access</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <Card className="shadow-none border border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calendar className="h-5 w-5" />
                  Billing Information
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="grid gap-4 text-sm">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">
                      Next billing date
                    </span>
                    <span className="font-medium">October 27, 2025</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Billing cycle</span>
                    <span className="font-medium">Monthly</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">
                      Payment method
                    </span>
                    <span className="font-medium">•••• •••• •••• 4242</span>
                  </div>
                </div>

                <div className="flex gap-3 mt-4">
                  <Button variant="outline" className="flex-1">
                    Update Payment Method
                  </Button>
                  <Button variant="outline" className="flex-1">
                    View Billing History
                  </Button>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default Subscription;
