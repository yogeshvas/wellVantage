/** @format */

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trophy, Calendar, CheckCircle, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const GoalAndRewards = () => {
  const navigate = useNavigate();
  const [isUpdated, setIsUpdated] = useState(false);

  const [monthlyGoal, setMonthlyGoal] = useState("20");
  const [monthlyReward, setMonthlyReward] = useState(
    "20% off on protein supplements!"
  );

  const [yearlyGoal, setYearlyGoal] = useState("150");
  const [yearlyReward, setYearlyReward] = useState(
    "20% off on next year's membership!"
  );

  const handleUpdate = () => {
    // Simulate update action
    setIsUpdated(true);
    toast.success("Goals and Rewards Updated!");
    setTimeout(() => setIsUpdated(false), 3000);
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
              <Trophy className="h-6 w-6" />
              Attendance Goal and Reward
            </CardTitle>
            <CardDescription className="text-base">
              Set attendance goals and rewards for members
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 pb-6">
            {/* Monthly Goal Section */}
            <Card className="shadow-none">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      Monthly
                    </CardTitle>
                    <CardDescription>
                      Set monthly attendance goals and rewards
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Monthly Goal Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                  <Label
                    htmlFor="monthly-goal"
                    className="text-base font-medium md:col-span-1"
                  >
                    Monthly
                  </Label>
                  <div className="flex items-center gap-3 md:col-span-3">
                    <Input
                      type="text"
                      id="monthly-goal"
                      value={monthlyGoal}
                      onChange={(e) => setMonthlyGoal(e.target.value)}
                      className="flex-1 max-w-32"
                      placeholder="Enter days"
                    />
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                      Days
                    </span>
                  </div>
                </div>

                {/* Monthly Reward Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Label
                    htmlFor="monthly-reward"
                    className="text-base font-medium md:col-span-1"
                  >
                    Reward
                  </Label>
                  <div className="md:col-span-3">
                    <Textarea
                      id="monthly-reward"
                      value={monthlyReward}
                      onChange={(e) => setMonthlyReward(e.target.value)}
                      placeholder="Enter reward description"
                      className="min-h-[80px]"
                    />
                  </div>
                </div>

                {/* Monthly Preview */}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-900 mb-1">
                      {monthlyGoal} Days
                    </div>
                    <div className="text-sm text-blue-700">{monthlyReward}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Yearly Goal Section */}
            <Card className="shadow-none">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <Calendar className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      Yearly
                    </CardTitle>
                    <CardDescription>
                      Set yearly attendance goals and rewards
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Yearly Goal Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                  <Label
                    htmlFor="yearly-goal"
                    className="text-base font-medium md:col-span-1"
                  >
                    Yearly
                  </Label>
                  <div className="flex items-center gap-3 md:col-span-3">
                    <Input
                      type="text"
                      id="yearly-goal"
                      value={yearlyGoal}
                      onChange={(e) => setYearlyGoal(e.target.value)}
                      className="flex-1 max-w-32"
                      placeholder="Enter days"
                    />
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                      Days
                    </span>
                  </div>
                </div>

                {/* Yearly Reward Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Label
                    htmlFor="yearly-reward"
                    className="text-base font-medium md:col-span-1"
                  >
                    Reward
                  </Label>
                  <div className="md:col-span-3">
                    <Textarea
                      id="yearly-reward"
                      value={yearlyReward}
                      onChange={(e) => setYearlyReward(e.target.value)}
                      placeholder="Enter reward description"
                      className="min-h-[80px]"
                    />
                  </div>
                </div>

                {/* Yearly Preview */}
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-900 mb-1">
                      {yearlyGoal} Days
                    </div>
                    <div className="text-sm text-green-700">{yearlyReward}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Divider */}
            <div className="border-t border-gray-200 my-4"></div>

            {/* Update Button */}
            <div className="flex justify-center">
              <Button
                onClick={handleUpdate}
                className="flex items-center gap-2"
                size="lg"
              >
                {isUpdated ? (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    Updated!
                  </>
                ) : (
                  "Update"
                )}
              </Button>
            </div>

            {/* Combined Preview Section */}
            <Card className="shadow-none border border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Preview
                </CardTitle>
                <CardDescription>
                  Current active goals and rewards
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Monthly Preview */}
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div>
                      <div className="font-semibold text-blue-900">Monthly</div>
                      <div className="text-lg font-bold text-blue-700">
                        {monthlyGoal} Days
                      </div>
                    </div>
                    <div className="text-right max-w-md">
                      <div className="font-semibold text-blue-900">Reward</div>
                      <div className="text-sm text-blue-700">
                        {monthlyReward}
                      </div>
                    </div>
                  </div>

                  {/* Yearly Preview */}
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div>
                      <div className="font-semibold text-green-900">Yearly</div>
                      <div className="text-lg font-bold text-green-700">
                        {yearlyGoal} Days
                      </div>
                    </div>
                    <div className="text-right max-w-md">
                      <div className="font-semibold text-green-900">Reward</div>
                      <div className="text-sm text-green-700">
                        {yearlyReward}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default GoalAndRewards;
