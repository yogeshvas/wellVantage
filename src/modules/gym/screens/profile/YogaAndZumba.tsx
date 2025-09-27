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
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, CheckCircle, Dumbbell, Heart, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const YogaAndZumba = () => {
  const [yogaEnabled, setYogaEnabled] = useState(true);
  const [zumbaEnabled, setZumbaEnabled] = useState(true);
  const navigate = useNavigate();

  const [yogaSlot, setYogaSlot] = useState({ from: "9:00 am", to: "10:00 am" });
  const [zumbaSlot, setZumbaSlot] = useState({
    from: "9:00 am",
    to: "10:00 am",
  });

  const [isUpdated, setIsUpdated] = useState(false);

  // Generate time options from 6:00 am to 10:00 pm
  const timeOptions: string[] = [];
  for (let hour = 6; hour <= 22; hour++) {
    const period = hour >= 12 ? "pm" : "am";
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;

    // Add :00 and :30 minutes for each hour
    timeOptions.push(`${displayHour}:00 ${period}`);
    if (hour < 22) {
      timeOptions.push(`${displayHour}:30 ${period}`);
    }
  }

  const handleYogaFromChange = (value: string) => {
    setYogaSlot({ ...yogaSlot, from: value });
  };

  const handleYogaToChange = (value: string) => {
    setYogaSlot({ ...yogaSlot, to: value });
  };

  const handleZumbaFromChange = (value: string) => {
    setZumbaSlot({ ...zumbaSlot, from: value });
  };

  const handleZumbaToChange = (value: string) => {
    setZumbaSlot({ ...zumbaSlot, to: value });
  };

  const handleUpdate = () => {
    // Simulate update action
    setIsUpdated(true);
    toast.success("Settings Updated");
    setTimeout(() => setIsUpdated(false), 3000);
  };

  // Filter "To" time options to be after "From" time
  const getFilteredToTimes = (fromTime: string) => {
    if (!fromTime) return timeOptions;

    const fromIndex = timeOptions.indexOf(fromTime);
    return timeOptions.filter((_, index) => index > fromIndex);
  };

  return (
    <div className="w-full">
      <Card className="h-[calc(100vh-3rem)] shadow-none border-none">
        <ScrollArea className="h-full">
          <CardHeader className="pb-4">
            <ArrowLeft className="mb-5" onClick={() => navigate(-1)} />

            <CardTitle className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Heart className="h-6 w-6" />
              Yoga and Zumba Classes
            </CardTitle>
            <CardDescription className="text-base">
              Manage your class schedules and timings
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 pb-6">
            {/* Yoga Class Section */}
            <Card className="shadow-none ">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Dumbbell className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        Yoga Classes
                        <Badge variant={yogaEnabled ? "default" : "secondary"}>
                          {yogaEnabled ? "Active" : "Inactive"}
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        Manage yoga class schedules and availability
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={yogaEnabled}
                      onCheckedChange={setYogaEnabled}
                    />
                    <span className="text-sm font-medium">
                      {yogaEnabled ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {yogaEnabled ? (
                  <>
                    <div className="space-y-3">
                      <Label className="text-base flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Class Time Slot
                      </Label>

                      {/* Single Time Slot */}
                      <div className="border rounded-lg p-4 bg-muted/50">
                        <div className="flex flex-col sm:flex-row gap-4">
                          <div className="flex-1">
                            <Label
                              htmlFor="yoga-from"
                              className="text-sm font-medium"
                            >
                              From Time
                            </Label>
                            <Select
                              value={yogaSlot.from}
                              onValueChange={handleYogaFromChange}
                            >
                              <SelectTrigger className="mt-2">
                                <SelectValue placeholder="Select start time" />
                              </SelectTrigger>
                              <SelectContent>
                                {timeOptions.map((time) => (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="flex-1">
                            <Label
                              htmlFor="yoga-to"
                              className="text-sm font-medium"
                            >
                              To Time
                            </Label>
                            <Select
                              value={yogaSlot.to}
                              onValueChange={handleYogaToChange}
                              disabled={!yogaSlot.from}
                            >
                              <SelectTrigger className="mt-2">
                                <SelectValue placeholder="Select end time" />
                              </SelectTrigger>
                              <SelectContent>
                                {getFilteredToTimes(yogaSlot.from).map(
                                  (time) => (
                                    <SelectItem key={time} value={time}>
                                      {time}
                                    </SelectItem>
                                  )
                                )}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {/* Current Time Slot Display */}
                        <div className="mt-4 p-3 bg-white border rounded-lg">
                          <div className="flex items-center justify-center gap-4 text-center">
                            <div>
                              <span className="text-sm text-muted-foreground">
                                From
                              </span>
                              <div className="font-medium text-lg">
                                {yogaSlot.from}
                              </div>
                            </div>
                            <div className="text-muted-foreground text-xl">
                              →
                            </div>
                            <div>
                              <span className="text-sm text-muted-foreground">
                                To
                              </span>
                              <div className="font-medium text-lg">
                                {yogaSlot.to}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    <Dumbbell className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Yoga classes are currently disabled</p>
                    <p className="text-sm">
                      Enable yoga classes to manage schedules
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Zumba Class Section */}
            <Card className="shadow-none">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-pink-50 rounded-lg">
                      <Heart className="h-5 w-5 text-pink-600" />
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        Zumba Classes
                        <Badge variant={zumbaEnabled ? "default" : "secondary"}>
                          {zumbaEnabled ? "Active" : "Inactive"}
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        Manage Zumba class schedules and availability
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={zumbaEnabled}
                      onCheckedChange={setZumbaEnabled}
                    />
                    <span className="text-sm font-medium">
                      {zumbaEnabled ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {zumbaEnabled ? (
                  <>
                    <div className="space-y-3">
                      <Label className="text-base flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Class Time Slot
                      </Label>

                      {/* Single Time Slot */}
                      <div className="border rounded-lg p-4 bg-muted/50">
                        <div className="flex flex-col sm:flex-row gap-4">
                          <div className="flex-1">
                            <Label
                              htmlFor="zumba-from"
                              className="text-sm font-medium"
                            >
                              From Time
                            </Label>
                            <Select
                              value={zumbaSlot.from}
                              onValueChange={handleZumbaFromChange}
                            >
                              <SelectTrigger className="mt-2">
                                <SelectValue placeholder="Select start time" />
                              </SelectTrigger>
                              <SelectContent>
                                {timeOptions.map((time) => (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="flex-1">
                            <Label
                              htmlFor="zumba-to"
                              className="text-sm font-medium"
                            >
                              To Time
                            </Label>
                            <Select
                              value={zumbaSlot.to}
                              onValueChange={handleZumbaToChange}
                              disabled={!zumbaSlot.from}
                            >
                              <SelectTrigger className="mt-2">
                                <SelectValue placeholder="Select end time" />
                              </SelectTrigger>
                              <SelectContent>
                                {getFilteredToTimes(zumbaSlot.from).map(
                                  (time) => (
                                    <SelectItem key={time} value={time}>
                                      {time}
                                    </SelectItem>
                                  )
                                )}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {/* Current Time Slot Display */}
                        <div className="mt-4 p-3 bg-white border rounded-lg">
                          <div className="flex items-center justify-center gap-4 text-center">
                            <div>
                              <span className="text-sm text-muted-foreground">
                                From
                              </span>
                              <div className="font-medium text-lg">
                                {zumbaSlot.from}
                              </div>
                            </div>
                            <div className="text-muted-foreground text-xl">
                              →
                            </div>
                            <div>
                              <span className="text-sm text-muted-foreground">
                                To
                              </span>
                              <div className="font-medium text-lg">
                                {zumbaSlot.to}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    <Heart className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Zumba classes are currently disabled</p>
                    <p className="text-sm">
                      Enable Zumba classes to manage schedules
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Update Button */}
            <Card className="shadow-none border-none">
              <CardContent className="pt-6">
                <Button
                  onClick={handleUpdate}
                  disabled={!yogaEnabled && !zumbaEnabled}
                  className="w-full sm:w-auto flex items-center gap-2 mx-auto"
                  size="lg"
                >
                  {isUpdated ? (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      Schedule Updated!
                    </>
                  ) : (
                    "Update"
                  )}
                </Button>

                {!yogaEnabled && !zumbaEnabled && (
                  <p className="text-sm text-muted-foreground text-center mt-2">
                    Enable at least one class type to update schedules
                  </p>
                )}
              </CardContent>
            </Card>
          </CardContent>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default YogaAndZumba;
