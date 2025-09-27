/** @format */

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const FAQ = () => {
  const [activeTab, setActiveTab] = useState("help");
  const navigate = useNavigate();
  // Sample data for messages
  const messages = [
    {
      id: 1,
      title: "Welcome Message",
      content: "Thank you for joining our platform! We're excited to have you.",
      date: "2023-10-15",
      unread: false,
    },
    {
      id: 2,
      title: "System Update",
      content: "We've recently updated our system with new features.",
      date: "2023-10-10",
      unread: true,
    },
    {
      id: 3,
      title: "Payment Processed",
      content: "Your recent payment has been successfully processed.",
      date: "2023-10-08",
      unread: false,
    },
    {
      id: 4,
      title: "Account Verification",
      content: "Your account has been successfully verified.",
      date: "2023-10-05",
      unread: true,
    },
  ];

  // Sample data for notifications
  const notifications = [
    {
      id: 1,
      title: "New feature available",
      content: "Check out our latest feature in the dashboard.",
      date: "2023-10-16",
      type: "info",
    },
    {
      id: 2,
      title: "Maintenance scheduled",
      content: "System maintenance is scheduled for this weekend.",
      date: "2023-10-14",
      type: "warning",
    },
    {
      id: 3,
      title: "Profile update required",
      content: "Please update your profile information to continue.",
      date: "2023-10-12",
      type: "warning",
    },
    {
      id: 4,
      title: "New message received",
      content: "You have a new message from support.",
      date: "2023-10-11",
      type: "info",
    },
  ];

  // FAQ data for accordion
  const faqItems = [
    {
      value: "item-1",
      question: "How do I get started with the platform?",
      answer:
        "To get started, simply create an account, complete your profile setup, and explore the dashboard. You can also take our guided tour for a better understanding of the features.",
    },
    {
      value: "item-2",
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and bank transfers. All payments are securely processed through our encrypted payment gateway.",
    },
    {
      value: "item-3",
      question: "How can I reset my password?",
      answer:
        "Click on the 'Forgot Password' link on the login page. Enter your email address, and we'll send you a link to reset your password. The link will expire in 24 hours for security reasons.",
    },
    {
      value: "item-4",
      question: "Is there a mobile app available?",
      answer:
        "Yes, we have mobile apps available for both iOS and Android devices. You can download them from the respective app stores. The mobile app includes all the features available on the web platform.",
    },
    {
      value: "item-5",
      question: "How do I contact customer support?",
      answer:
        "You can contact our customer support team through the contact form in the help section, via email at support@example.com, or through our live chat feature available during business hours.",
    },
    {
      value: "item-6",
      question: "What are your business hours?",
      answer:
        "Our customer support team is available Monday through Friday from 9:00 AM to 6:00 PM EST. For urgent matters outside these hours, please use our emergency contact form.",
    },
    {
      value: "item-7",
      question: "How do I cancel my subscription?",
      answer:
        "You can cancel your subscription at any time by going to your account settings, selecting 'Billing', and clicking 'Cancel Subscription'. Your access will continue until the end of your current billing period.",
    },
    {
      value: "item-8",
      question: "Do you offer refunds?",
      answer:
        "We offer a 30-day money-back guarantee for all annual subscriptions. Monthly subscriptions can be canceled at any time, but refunds for partial months are not provided.",
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6">
        <ArrowLeft className="mb-5" onClick={() => navigate(-1)} />
        <h1 className="text-3xl font-bold tracking-tight">FAQ & Support</h1>
        <p className="text-muted-foreground mt-2">
          Find answers to common questions and get help with our platform.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="help">Help & FAQ</TabsTrigger>
        </TabsList>

        {/* Messages Tab */}
        <TabsContent value="messages" className="space-y-4 m-0">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Your Messages</CardTitle>
              <CardDescription>
                Review your messages and communications from our team.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[calc(100vh-280px)] overflow-y-auto">
                <div className="space-y-4 p-6 pt-0">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className="border rounded-lg p-4 hover:border-primary/50 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium flex items-center gap-2 truncate">
                            {message.title}
                            {message.unread && (
                              <Badge variant="secondary" className="shrink-0">
                                New
                              </Badge>
                            )}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {message.content}
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground shrink-0 ml-2">
                          {message.date}
                        </span>
                      </div>
                    </div>
                  ))}

                  {messages.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">
                        No messages available.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4 m-0">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Stay updated with the latest announcements and alerts.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[calc(100vh-280px)] overflow-y-auto">
                <div className="space-y-4 p-6 pt-0">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="border rounded-lg p-4 hover:border-primary/50 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium flex items-center gap-2 truncate">
                            {notification.title}
                            <Badge
                              variant={
                                notification.type === "warning"
                                  ? "destructive"
                                  : "default"
                              }
                              className="shrink-0"
                            >
                              {notification.type}
                            </Badge>
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {notification.content}
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground shrink-0 ml-2">
                          {notification.date}
                        </span>
                      </div>
                    </div>
                  ))}

                  {notifications.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">
                        No notifications available.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Help & FAQ Tab */}
        <TabsContent value="help" className="space-y-6 m-0">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Find quick answers to common questions about our platform.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[calc(100vh-400px)] overflow-y-auto">
                <div className="p-6 pt-0">
                  <Accordion type="single" collapsible className="w-full">
                    {faqItems.map((item) => (
                      <AccordionItem key={item.value} value={item.value}>
                        <AccordionTrigger className="text-left hover:no-underline py-4">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="pb-4">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FAQ;
