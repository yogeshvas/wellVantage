/** @format */

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  ComposedChart,
} from "recharts";
import type { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Define TypeScript interfaces for our data structures
interface StatData {
  title: string;
  value: string;
}

interface RevenueData {
  month: string;
  revenue: number;
  profit: number;
  cost: number;
}

interface RevenueBreakdown {
  name: string;
  value: number;
}

interface MembershipTrends {
  month: string;
  signUps: number;
  renewals: number;
  cancellations: number;
}

interface AttendanceTrends {
  month: string;
  members: number;
}

// Generic filter function with proper typing
const filterDataByDate = <T extends { month: string }>(
  data: T[],
  date?: DateRange
): T[] => {
  if (!date?.from || !date?.to) return data;

  // For demo purposes, we'll filter based on month names
  // In a real app, you'd have actual dates in your data
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const fromMonth = date.from.getMonth();
  const toMonth = date.to.getMonth();

  return data.filter((item) => {
    const itemMonth = monthNames.indexOf(item.month);
    return itemMonth >= fromMonth && itemMonth <= toMonth;
  });
};

const Dashboard = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2025, 5, 1), // June 1, 2025
    to: addDays(new Date(2025, 5, 1), 30), // June 30, 2025
  });

  // Base data - in a real app, this would come from an API
  const baseStatsData: StatData[] = [
    { title: "Active Members", value: "30" },
    { title: "Hot Leads", value: "10" },
    { title: "Member Attendance", value: "30" },
    { title: "Staff Attendance", value: "10" },
    { title: "New Joiners (Last 7 days)", value: "50" },
    { title: "Memberships Expiring (Next 7 days)", value: "7" },
    { title: "Memberships Expiring (Next 30 days)", value: "30" },
    { title: "Upcoming Payments (Next 7 days)", value: "£3000" },
    { title: "Pending Payments (Next 7 days)", value: "£2000" },
  ];

  const baseRevenueData: RevenueData[] = [
    { month: "Oct", revenue: 10000, profit: 8000, cost: 2000 },
    { month: "Nov", revenue: 12000, profit: 9000, cost: 3000 },
    { month: "Dec", revenue: 10000, profit: 7500, cost: 2500 },
    { month: "Jan", revenue: 8000, profit: 6000, cost: 2000 },
    { month: "Feb", revenue: 6000, profit: 4500, cost: 1500 },
    { month: "Mar", revenue: 7000, profit: 5500, cost: 1500 },
    { month: "Apr", revenue: 9000, profit: 7000, cost: 2000 },
    { month: "May", revenue: 11000, profit: 8500, cost: 2500 },
    { month: "Jun", revenue: 13000, profit: 10000, cost: 3000 },
  ];

  const baseRevenueBreakdown: RevenueBreakdown[] = [
    { name: "Personal Training", value: 35 },
    { name: "Membership", value: 60 },
    { name: "Other", value: 5 },
  ];

  const baseMembershipTrends: MembershipTrends[] = [
    { month: "Oct", signUps: 25, renewals: 15, cancellations: 5 },
    { month: "Nov", signUps: 30, renewals: 20, cancellations: 8 },
    { month: "Dec", signUps: 20, renewals: 18, cancellations: 6 },
    { month: "Jan", signUps: 15, renewals: 12, cancellations: 7 },
    { month: "Feb", signUps: 10, renewals: 10, cancellations: 4 },
    { month: "Mar", signUps: 12, renewals: 11, cancellations: 3 },
    { month: "Apr", signUps: 18, renewals: 14, cancellations: 5 },
    { month: "May", signUps: 22, renewals: 16, cancellations: 6 },
    { month: "Jun", signUps: 28, renewals: 20, cancellations: 7 },
  ];

  const baseAttendanceTrends: AttendanceTrends[] = [
    { month: "Oct", members: 120 },
    { month: "Nov", members: 140 },
    { month: "Dec", members: 130 },
    { month: "Jan", members: 110 },
    { month: "Feb", members: 100 },
    { month: "Mar", members: 105 },
    { month: "Apr", members: 115 },
    { month: "May", members: 125 },
    { month: "Jun", members: 135 },
  ];

  // Apply date filtering to chart data
  const revenueData = filterDataByDate(baseRevenueData, date);
  const membershipTrends = filterDataByDate(baseMembershipTrends, date);
  const attendanceTrends = filterDataByDate(baseAttendanceTrends, date);

  // Update stats based on date range (simplified for demo)
  const updatedStatsData: StatData[] = baseStatsData.map((stat) => {
    if (stat.title === "Active Members") {
      return {
        ...stat,
        value: Math.floor(30 + (date?.from?.getMonth() || 0) * 5).toString(),
      };
    }
    if (stat.title === "New Joiners (Last 7 days)") {
      return {
        ...stat,
        value: Math.floor(50 + (date?.from?.getMonth() || 0) * 3).toString(),
      };
    }
    return stat;
  });

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  return (
    <ScrollArea className="h-screen">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-4">
            {/* Date Range Picker */}
            <div className={cn("grid gap-2")}>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                      "w-[300px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "LLL dd, y")} -{" "}
                          {format(date.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(date.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {updatedStatsData.map((stat, index) => (
            <Card className="shadow-none" key={index}>
              <CardContent className="p-6">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  {stat.title}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* Revenue Chart */}
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle>Month-to-Month Revenue (£)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`£${value}`, ""]} />
                  <Legend />
                  <Bar dataKey="revenue" fill="#0088FE" name="Revenue" />
                  <Bar dataKey="profit" fill="#00C49F" name="Profit" />
                  <Bar dataKey="cost" fill="#FF8042" name="Cost" />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Revenue Breakdown */}
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle>Revenue Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={baseRevenueBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${
                        typeof percent === "number"
                          ? (percent * 100).toFixed(0)
                          : "0"
                      }%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {baseRevenueBreakdown.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Membership Trends */}
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle>Membership Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={membershipTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="signUps" fill="#00C49F" name="Sign Ups" />
                  <Bar dataKey="renewals" fill="#0088FE" name="Renewals" />
                  <Bar
                    dataKey="cancellations"
                    fill="#FF8042"
                    name="Cancellations"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Attendance Trends */}
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle>Attendance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={attendanceTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="members"
                    stroke="#8884d8"
                    fill="#8884d8"
                    name="Number of Members"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </ScrollArea>
  );
};

export default Dashboard;
