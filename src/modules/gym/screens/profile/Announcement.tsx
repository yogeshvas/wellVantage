/** @format */

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Megaphone, CheckCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Announcement = () => {
  const [announcement, setAnnouncement] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);

  const wordLimit = 15;
  const words = announcement.trim() ? announcement.trim().split(/\s+/) : [];
  const wordCount = words.length;
  const wordsLeft = wordLimit - wordCount;
  const isOverLimit = wordCount > wordLimit;
  const navigate = useNavigate();

  const handleAnnouncementChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setAnnouncement(e.target.value);
  };

  const handleUpdate = () => {
    if (isOverLimit || wordCount === 0) return;

    // Simulate update action
    setIsUpdated(true);
    setTimeout(() => setIsUpdated(false), 3000);
  };

  const getWordCountColor = () => {
    if (isOverLimit) return "text-red-500";
    if (wordsLeft <= 5) return "text-yellow-500";
    return "text-green-500";
  };

  return (
    <div className="w-full  space-y-6">
      <div className="mb-6">
        <ArrowLeft className="mb-5" onClick={() => navigate(-1)} />
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Megaphone className="h-6 w-6" />
          Gym Notification
        </h1>
        <p className="text-muted-foreground mt-2">
          Create announcements to notify your gym members
        </p>
      </div>

      <Card className="shadow-none border-none">
        <CardHeader>
          <CardTitle>Create Announcement</CardTitle>
          <CardDescription>
            Send important updates and notifications to your gym members
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="announcement" className="text-base">
                Announcement Text
              </Label>
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    isOverLimit
                      ? "destructive"
                      : wordsLeft <= 5
                      ? "secondary"
                      : "default"
                  }
                  className={getWordCountColor()}
                >
                  {wordsLeft} words left
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Up to {wordLimit} words
                </span>
              </div>
            </div>

            <Textarea
              id="announcement"
              placeholder="Enter your announcement here (e.g., 'Special yoga class this Saturday at 10 AM!')"
              value={announcement}
              onChange={handleAnnouncementChange}
              className="min-h-[120px] resize-none"
            />

            <div className="flex justify-between items-center text-sm">
              <span className={`${getWordCountColor()} font-medium`}>
                {wordCount} / {wordLimit} words
              </span>
              {isOverLimit && (
                <span className="text-red-500 font-medium">
                  Exceeded word limit by {Math.abs(wordsLeft)} words
                </span>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t" />

          <Button
            onClick={handleUpdate}
            disabled={isOverLimit || wordCount === 0}
            className="w-full sm:w-auto flex items-center gap-2"
            size="lg"
          >
            {isUpdated ? (
              <>
                <CheckCircle className="h-4 w-4" />
                Announcement Updated!
              </>
            ) : (
              "Update"
            )}
          </Button>

          {wordCount === 0 && (
            <p className="text-sm text-muted-foreground text-center">
              Please enter an announcement to update
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Announcement;
