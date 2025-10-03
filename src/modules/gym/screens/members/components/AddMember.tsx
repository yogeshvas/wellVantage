/** @format */

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const AddMember = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // For edit mode
  const isEditMode = Boolean(id);

  const handleBack = () => {
    navigate("/members");
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={handleBack}>
            <ArrowLeft />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">
            {isEditMode ? "Edit Member" : "Add New Member"}
          </h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleBack}>
            Cancel
          </Button>
          <Button>Save Member</Button>
        </div>
      </div>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="membership">Membership</TabsTrigger>
          <TabsTrigger value="pt">PT</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="mt-6 space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  defaultValue={isEditMode ? "Shalu" : ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input id="lastName" defaultValue={isEditMode ? "Yadav" : ""} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" defaultValue={isEditMode ? "+91" : ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={isEditMode ? "shaluyadev@gmail.com" : ""}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select defaultValue={isEditMode ? "female" : undefined}>
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input id="dob" type="date" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="height">Height</Label>
                <Input id="height" placeholder="e.g., 5'6&quot;" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight</Label>
                <Input id="weight" placeholder="e.g., 60 kg" />
              </div>
            </div>
          </div>

          {isEditMode && (
            <div>
              <Label className="text-base font-semibold">Gym Memberships</Label>
              <Table className="mt-2">
                <TableHeader>
                  <TableRow>
                    <TableHead>Gym</TableHead>
                    <TableHead>Start</TableHead>
                    <TableHead>End</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Evolve Fitness</TableCell>
                    <TableCell>20 Apr 2024</TableCell>
                    <TableCell>19 Apr 2025</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Evolve Fitness</TableCell>
                    <TableCell>23 Apr 2022</TableCell>
                    <TableCell>22 Apr 2023</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          )}

          <div className="flex justify-end">
            <Button>Update</Button>
          </div>
        </TabsContent>

        <TabsContent value="preferences" className="mt-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Activity Level</Label>
              <Select defaultValue={isEditMode ? "very active" : undefined}>
                <SelectTrigger>
                  <SelectValue placeholder="Select activity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary</SelectItem>
                  <SelectItem value="lightly active">Lightly Active</SelectItem>
                  <SelectItem value="moderately active">
                    Moderately Active
                  </SelectItem>
                  <SelectItem value="very active">Very Active</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Wellness Goals</Label>
              <Select defaultValue={isEditMode ? "lose weight" : undefined}>
                <SelectTrigger>
                  <SelectValue placeholder="Select goals" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lose weight">Lose Weight</SelectItem>
                  <SelectItem value="gain muscle">Gain Muscle</SelectItem>
                  <SelectItem value="improve endurance">
                    Improve Endurance
                  </SelectItem>
                  <SelectItem value="build strength">Build Strength</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Primary Fitness Focus</Label>
              <Select defaultValue={isEditMode ? "gym workout" : undefined}>
                <SelectTrigger>
                  <SelectValue placeholder="Select focus" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gym workout">Gym Workout</SelectItem>
                  <SelectItem value="cardio">Cardio</SelectItem>
                  <SelectItem value="yoga">Yoga</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Preferred Gym Time</Label>
              <Select defaultValue={isEditMode ? "morning" : undefined}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning</SelectItem>
                  <SelectItem value="afternoon">Afternoon</SelectItem>
                  <SelectItem value="evening">Evening</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Preferred Workout Intensity</Label>
              <Select defaultValue={isEditMode ? "light" : undefined}>
                <SelectTrigger>
                  <SelectValue placeholder="Select intensity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="intense">Intense</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Medical Concerns</Label>
              <Select defaultValue={isEditMode ? "diabetes" : undefined}>
                <SelectTrigger>
                  <SelectValue placeholder="Select concerns" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="diabetes">Diabetes</SelectItem>
                  <SelectItem value="hypertension">Hypertension</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Previous Gym Experience</Label>
            <Select defaultValue={isEditMode ? "yes" : undefined}>
              <SelectTrigger>
                <SelectValue placeholder="Select experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end">
            <Button>Update</Button>
          </div>
        </TabsContent>

        <TabsContent value="membership" className="mt-6 space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="membershipName">Membership Name *</Label>
                <Select defaultValue="Gym - 12 Month Membership">
                  <SelectTrigger id="membershipName">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Gym - 12 Month Membership">
                      Gym - 12 Month Membership
                    </SelectItem>
                    <SelectItem value="Gym - 6 Month Membership">
                      Gym - 6 Month Membership
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Total Price of Membership</Label>
                <Input value="₹20,000" readOnly className="bg-muted" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="discount">Discount %</Label>
                <Input id="discount" defaultValue="10" />
              </div>
              <div className="space-y-2">
                <Label>Final Amount</Label>
                <Input value="₹18,000" readOnly className="bg-muted" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="amountPaid">Amount Paid *</Label>
                <Input id="amountPaid" defaultValue="INR 9,000" />
              </div>
              <div className="space-y-2">
                <Label>Balance</Label>
                <Input value="₹9,000" readOnly className="bg-muted" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="paymentSource">Payment Source *</Label>
                <Select defaultValue="Cash">
                  <SelectTrigger id="paymentSource">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="UPI">UPI</SelectItem>
                    <SelectItem value="Card">Card</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate">Membership Start Date *</Label>
                <Input id="startDate" type="date" defaultValue="2024-06-12" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input id="endDate" type="date" defaultValue="2025-06-12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nextPayment">Next Payment Date *</Label>
                <Input id="nextPayment" type="date" defaultValue="2025-07-12" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="assignTrainer">Assign General Trainer</Label>
                <Select>
                  <SelectTrigger id="assignTrainer">
                    <SelectValue placeholder="Select trainer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="trainer1">Trainer 1</SelectItem>
                    <SelectItem value="trainer2">Trainer 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Note</Label>
                <Input defaultValue="Customer did not have enough money to pay all" />
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button>Update</Button>
              <Button variant="outline">Add Payment</Button>
            </div>
          </div>

          {isEditMode && (
            <>
              <div>
                <Label className="text-base font-semibold">
                  Payment History
                </Label>
                <Table className="mt-2">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>Updated by</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>1 Feb 2024</TableCell>
                      <TableCell>$600</TableCell>
                      <TableCell>UPI</TableCell>
                      <TableCell>Archana Sharma</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="flex gap-2 justify-end">
                <Button variant="secondary">Archived</Button>
                <Button>Adjust Membership</Button>
              </div>
            </>
          )}
        </TabsContent>

        <TabsContent value="pt" className="mt-6 space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="ptMembershipName">Membership Name *</Label>
                <Select defaultValue="Gym - 12 Month Membership">
                  <SelectTrigger id="ptMembershipName">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Gym - 12 Month Membership">
                      Gym - 12 Month Membership
                    </SelectItem>
                    <SelectItem value="Gym - 6 Month Membership">
                      Gym - 6 Month Membership
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Total Price of Membership</Label>
                <Input value="₹20,000" readOnly className="bg-muted" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="ptDiscount">Discount %</Label>
                <Input id="ptDiscount" defaultValue="10" />
              </div>
              <div className="space-y-2">
                <Label>Final Amount</Label>
                <Input value="₹18,000" readOnly className="bg-muted" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="ptAmountPaid">Amount Paid *</Label>
                <Input id="ptAmountPaid" defaultValue="INR 9,000" />
              </div>
              <div className="space-y-2">
                <Label>Balance</Label>
                <Input value="₹9,000" readOnly className="bg-muted" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="ptPaymentSource">Payment Source *</Label>
                <Select defaultValue="Cash">
                  <SelectTrigger id="ptPaymentSource">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="UPI">UPI</SelectItem>
                    <SelectItem value="Card">Card</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ptStartDate">Membership Start Date *</Label>
                <Input id="ptStartDate" type="date" defaultValue="2025-06-12" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="ptEndDate">End Date</Label>
                <Input id="ptEndDate" type="date" defaultValue="2025-06-12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ptNextPayment">Next Payment Date *</Label>
                <Input
                  id="ptNextPayment"
                  type="date"
                  defaultValue="2025-07-12"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="assignPersonalTrainer">
                  Assign Personal Trainer *
                </Label>
                <Select>
                  <SelectTrigger id="assignPersonalTrainer">
                    <SelectValue placeholder="Select trainer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="trainer1">Trainer 1</SelectItem>
                    <SelectItem value="trainer2">Trainer 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Note</Label>
                <Input defaultValue="Customer did not have enough money to pay all" />
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button>Update</Button>
              <Button variant="outline">Add Payment</Button>
            </div>
          </div>

          {isEditMode && (
            <>
              <div>
                <Label className="text-base font-semibold">
                  Payment History
                </Label>
                <Table className="mt-2">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>Updated by</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>1 Feb 2024</TableCell>
                      <TableCell>$600</TableCell>
                      <TableCell>UPI</TableCell>
                      <TableCell>Archana Sharma</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div>
                <Label className="text-base font-semibold">PT Plans</Label>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex gap-2">
                    <Input placeholder="Search" className="max-w-sm" />
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="personal">
                          Personal Trainer
                        </SelectItem>
                        <SelectItem value="general">General</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button>+</Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Sessions</TableHead>
                      <TableHead>Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>24 Sessions PT Plan</TableCell>
                      <TableCell>1 Month</TableCell>
                      <TableCell>Personal Trainer</TableCell>
                      <TableCell>24</TableCell>
                      <TableCell>$250</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-muted-foreground">
                    Showing 1 to 10 of 68 entries
                  </p>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm">
                      1
                    </Button>
                    <Button variant="outline" size="sm">
                      2
                    </Button>
                    <Button variant="outline" size="sm">
                      3
                    </Button>
                    <Button variant="outline" size="sm">
                      ...
                    </Button>
                    <Button variant="outline" size="sm">
                      10
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AddMember;
