/** @format */

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Plus } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useLeadStore, type Lead } from "@/store/leadStore";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";

const LeadForm = ({
  leadId,
  onClose,
  isNew,
}: {
  leadId: string | null;
  onClose: () => void;
  isNew: boolean;
}) => {
  const { leads, addLead, updateLead, addNote } = useLeadStore();
  const existingLead = leads.find((l) => l.id === leadId);
  const [formData, setFormData] = useState<Partial<Lead>>(
    isNew ? {} : existingLead || {}
  );
  const [newNoteDate, setNewNoteDate] = useState<Date | undefined>(new Date());
  const [newNoteText, setNewNoteText] = useState("");
  const [showOtherMedical, setShowOtherMedical] = useState(
    formData.medicalConcerns === "Others"
  );

  useEffect(() => {
    if (formData.medicalConcerns === "Others") {
      setShowOtherMedical(true);
    } else {
      setShowOtherMedical(false);
      handleChange("medicalConcernsOther", "");
    }
  }, [formData.medicalConcerns]);

  const handleChange = (field: keyof Lead, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (isNew) {
      addLead(formData as Omit<Lead, "id" | "notes" | "createdAt" | "status">);

      toast.success("Lead Created Successfully");
    } else if (leadId) {
      updateLead(leadId, formData);
      toast.success("Lead Updated Successfully");
    }
    onClose();
  };

  const handleAddNote = () => {
    if (leadId && newNoteText && newNoteDate) {
      addNote(leadId, {
        date: format(newNoteDate, "yyyy-MM-dd"),
        note: newNoteText,
      });
      setNewNoteText("");
      setNewNoteDate(new Date());

      // Update the form data to reflect the new note
      const updatedLead = leads.find((l) => l.id === leadId);
      if (updatedLead) {
        setFormData(updatedLead);
      }
      toast.success("New note has been added to the lead.");
    }
  };

  return (
    <Tabs defaultValue="basic">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="basic">Basic</TabsTrigger>
        <TabsTrigger value="preferences">Preferences</TabsTrigger>
        <TabsTrigger value="status">Status</TabsTrigger>
      </TabsList>

      {/* Basic Information Tab */}
      <TabsContent value="basic" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name*</Label>
            <Input
              id="firstName"
              placeholder="First Name*"
              value={formData.firstName || ""}
              onChange={(e) => handleChange("firstName", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name*</Label>
            <Input
              id="lastName"
              placeholder="Last Name*"
              value={formData.lastName || ""}
              onChange={(e) => handleChange("lastName", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <div className="flex">
              <Select defaultValue="+91">
                <SelectTrigger className="w-20">
                  <SelectValue placeholder="+91" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="+91">+91</SelectItem>
                </SelectContent>
              </Select>
              <Input
                id="phone"
                placeholder="Phone"
                value={formData.phone || ""}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="Email"
              value={formData.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select
              value={formData.gender || ""}
              onValueChange={(v) => handleChange("gender", v)}
            >
              <SelectTrigger id="gender">
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Non-binary/Other">
                  Non-binary/Other
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dob">Date of Birth</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="dob"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.dob && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.dob ? (
                    format(new Date(formData.dob), "PPP")
                  ) : (
                    <span>Date of Birth</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.dob ? new Date(formData.dob) : undefined}
                  onSelect={(date) =>
                    handleChange("dob", date ? format(date, "yyyy-MM-dd") : "")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="height">Height</Label>
            <div className="flex">
              <Input
                id="height"
                type="number"
                placeholder="Height"
                value={formData.height || ""}
                onChange={(e) =>
                  handleChange("height", parseFloat(e.target.value) || null)
                }
              />
              <Button variant="outline" disabled>
                cm
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight">Weight</Label>
            <div className="flex">
              <Input
                id="weight"
                type="number"
                placeholder="Weight"
                value={formData.weight || ""}
                onChange={(e) =>
                  handleChange("weight", parseFloat(e.target.value) || null)
                }
              />
              <Button variant="outline" disabled>
                kg
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>

      {/* Preferences Tab */}
      <TabsContent value="preferences" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="activityLevel">Activity Level</Label>
            <Select
              value={formData.activityLevel || ""}
              onValueChange={(v) => handleChange("activityLevel", v)}
            >
              <SelectTrigger id="activityLevel">
                <SelectValue placeholder="Activity Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Sedentary">Sedentary</SelectItem>
                <SelectItem value="Lightly active">Lightly active</SelectItem>
                <SelectItem value="Moderately active">
                  Moderately active
                </SelectItem>
                <SelectItem value="Very active">Very active</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="wellnessGoals">Wellness Goals</Label>
            <Select
              value={formData.wellnessGoals || ""}
              onValueChange={(v) => handleChange("wellnessGoals", v)}
            >
              <SelectTrigger id="wellnessGoals">
                <SelectValue placeholder="Wellness Goals" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Lose weight">Lose weight</SelectItem>
                <SelectItem value="Gain weight">Gain weight</SelectItem>
                <SelectItem value="Build muscle">Build muscle</SelectItem>
                <SelectItem value="Modify My Diet">Modify My Diet</SelectItem>
                <SelectItem value="Manage Stress">Manage Stress</SelectItem>
                <SelectItem value="Improve Step Count">
                  Improve Step Count
                </SelectItem>
                <SelectItem value="General wellness">
                  General wellness
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="primaryFitnessFocus">Primary Fitness Focus</Label>
            <Select
              value={formData.primaryFitnessFocus || ""}
              onValueChange={(v) => handleChange("primaryFitnessFocus", v)}
            >
              <SelectTrigger id="primaryFitnessFocus">
                <SelectValue placeholder="Primary Fitness Focus" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Gym workouts">Gym workouts</SelectItem>
                <SelectItem value="Yoga">Yoga</SelectItem>
                <SelectItem value="Meditation">Meditation</SelectItem>
                <SelectItem value="Nutrition">Nutrition</SelectItem>
                <SelectItem value="Recovery">Recovery</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferredGymTime">Preferred Gym Time</Label>
            <Select
              value={formData.preferredGymTime || ""}
              onValueChange={(v) => handleChange("preferredGymTime", v)}
            >
              <SelectTrigger id="preferredGymTime">
                <SelectValue placeholder="Preferred Gym Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Morning">Morning</SelectItem>
                <SelectItem value="Afternoon">Afternoon</SelectItem>
                <SelectItem value="Evening">Evening</SelectItem>
                <SelectItem value="Late evening">Late evening</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferredWorkoutIntensity">
              Preferred Workout Intensity
            </Label>
            <Select
              value={formData.preferredWorkoutIntensity || ""}
              onValueChange={(v) =>
                handleChange("preferredWorkoutIntensity", v)
              }
            >
              <SelectTrigger id="preferredWorkoutIntensity">
                <SelectValue placeholder="Preferred Workout Intensity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Light">Light</SelectItem>
                <SelectItem value="Moderate">Moderate</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="medicalConcerns">Medical Concerns</Label>
            <Select
              value={formData.medicalConcerns || ""}
              onValueChange={(v) => handleChange("medicalConcerns", v)}
            >
              <SelectTrigger id="medicalConcerns">
                <SelectValue placeholder="Medical Concerns" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Diabetes">Diabetes</SelectItem>
                <SelectItem value="Hypertension">Hypertension</SelectItem>
                <SelectItem value="Asthma">Asthma</SelectItem>
                <SelectItem value="Others">Others</SelectItem>
                <SelectItem value="None">None</SelectItem>
              </SelectContent>
            </Select>
            {showOtherMedical && (
              <Input
                className="mt-2"
                placeholder="Specify other concerns"
                value={formData.medicalConcernsOther || ""}
                onChange={(e) =>
                  handleChange("medicalConcernsOther", e.target.value)
                }
              />
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="previousGymExperience">
              Previous Gym Experience
            </Label>
            <Select
              value={formData.previousGymExperience || ""}
              onValueChange={(v) => handleChange("previousGymExperience", v)}
            >
              <SelectTrigger id="previousGymExperience">
                <SelectValue placeholder="Previous Gym Experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </TabsContent>

      {/* Status Tab */}
      <TabsContent value="status" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="inquiryDate">Inquiry Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="inquiryDate"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.inquiryDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.inquiryDate ? (
                    format(new Date(formData.inquiryDate), "PPP")
                  ) : (
                    <span>Inquiry Date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={
                    formData.inquiryDate
                      ? new Date(formData.inquiryDate)
                      : undefined
                  }
                  onSelect={(date) =>
                    handleChange(
                      "inquiryDate",
                      date ? format(date, "yyyy-MM-dd") : ""
                    )
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="assignedTo">Assigned To</Label>
            <Select
              value={formData.assignedTo || ""}
              onValueChange={(v) => handleChange("assignedTo", v)}
            >
              <SelectTrigger id="assignedTo">
                <SelectValue placeholder="Assigned To" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ram">Ram</SelectItem>
                <SelectItem value="Sham">Sham</SelectItem>
                <SelectItem value="Ghanshayam">Ghanshayam</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="interestLevel">Interest Level</Label>
            <Select
              value={formData.interestLevel || ""}
              onValueChange={(v) => handleChange("interestLevel", v)}
            >
              <SelectTrigger id="interestLevel">
                <SelectValue placeholder="Interest Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Hot">Hot</SelectItem>
                <SelectItem value="Warm">Warm</SelectItem>
                <SelectItem value="Cold">Cold</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="followUpStatus">Follow Up Status</Label>
            <Select
              value={formData.followUpStatus || ""}
              onValueChange={(v) => handleChange("followUpStatus", v)}
            >
              <SelectTrigger id="followUpStatus">
                <SelectValue placeholder="Follow Up Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="New Inquiry">New Inquiry</SelectItem>
                <SelectItem value="Needs Follow-Up">Needs Follow-Up</SelectItem>
                <SelectItem value="Engaged">Engaged</SelectItem>
                <SelectItem value="Converted">Converted</SelectItem>
                <SelectItem value="Archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferredPackage">Preferred Package</Label>
            <Select
              value={formData.preferredPackage || ""}
              onValueChange={(v) => handleChange("preferredPackage", v)}
            >
              <SelectTrigger id="preferredPackage">
                <SelectValue placeholder="Preferred Package" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Basic">Basic</SelectItem>
                <SelectItem value="Premium">Premium</SelectItem>
                <SelectItem value="Elite">Elite</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferredPtPackage">Preferred PT Package</Label>
            <Input
              id="preferredPtPackage"
              placeholder="Preferred PT Package (if any)"
              value={formData.preferredPtPackage || ""}
              onChange={(e) =>
                handleChange("preferredPtPackage", e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="howHeard">How They Heard About the Gym</Label>
            <Select
              value={formData.howHeard || ""}
              onValueChange={(v) => handleChange("howHeard", v)}
            >
              <SelectTrigger id="howHeard">
                <SelectValue placeholder="How They Heard About the Gym" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Social Media">Social Media</SelectItem>
                <SelectItem value="Word of Mouth">Word of Mouth</SelectItem>
                <SelectItem value="Walk-in">Walk-in</SelectItem>
                <SelectItem value="WellVantage B2C App">
                  WellVantage B2C App
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Notes Section */}
        <div className="mt-6">
          <h3 className="font-semibold mb-4">Custom Notes</h3>
          <div className="space-y-2 mb-4 max-h-40 overflow-y-auto">
            {formData.notes?.map((note, idx) => (
              <div
                key={idx}
                className="flex items-center p-2 bg-gray-100 rounded"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                <span>
                  {note.date}: {note.note}
                </span>
              </div>
            )) || <p className="text-muted-foreground">No notes yet.</p>}
          </div>

          <div className="flex gap-2 items-end">
            <div className="space-y-2 flex-1">
              <Label htmlFor="noteDate">Note Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="noteDate"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !newNoteDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {newNoteDate ? (
                      format(newNoteDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={newNoteDate}
                    onSelect={setNewNoteDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2 flex-2">
              <Label htmlFor="noteText">Add Note</Label>
              <Input
                id="noteText"
                placeholder="Add a note"
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleAddNote();
                  }
                }}
              />
            </div>

            <Button
              onClick={handleAddNote}
              // disabled={!newNoteText.trim()}
              className="mb-1"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </TabsContent>

      <div className="flex justify-end mt-6">
        <Button onClick={handleSubmit} className="bg-green-500">
          {isNew ? "Create Lead" : "Update Lead"}
        </Button>
      </div>
    </Tabs>
  );
};

export default LeadForm;
