/** @format */

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface Membership {
  id: number;
  name: string;
  duration: string;
  type: string;
  sessions: number | string;
  price: string;
}

interface FormData {
  name: string;
  duration: string;
  type: "PT" | "General";
  sessions: string;
  price: string;
}

const dummyData: Membership[] = [
  {
    id: 1,
    name: "24 Sessions PT Plan",
    duration: "1 Month",
    type: "Personal Trainer",
    sessions: 24,
    price: "$250",
  },
  {
    id: 2,
    name: "24 Sessions PT Plan",
    duration: "1 Month",
    type: "General",
    sessions: "N/A",
    price: "$250",
  },
  {
    id: 3,
    name: "24 Sessions PT Plan",
    duration: "1 Month",
    type: "Personal Trainer",
    sessions: 24,
    price: "$250",
  },
  {
    id: 4,
    name: "24 Sessions PT Plan",
    duration: "1 Month",
    type: "General",
    sessions: "N/A",
    price: "$250",
  },
  {
    id: 5,
    name: "24 Sessions PT Plan",
    duration: "1 Month",
    type: "Personal Trainer",
    sessions: 24,
    price: "$250",
  },
  {
    id: 6,
    name: "24 Sessions PT Plan",
    duration: "1 Month",
    type: "Personal Trainer",
    sessions: 24,
    price: "$250",
  },
  {
    id: 7,
    name: "24 Sessions PT Plan",
    duration: "1 Month",
    type: "General",
    sessions: "N/A",
    price: "$250",
  },
  {
    id: 8,
    name: "24 Sessions PT Plan",
    duration: "1 Month",
    type: "Personal Trainer",
    sessions: 24,
    price: "$250",
  },
  {
    id: 9,
    name: "12 Sessions PT Plan",
    duration: "1 Month",
    type: "General",
    sessions: "N/A",
    price: "$150",
  },
  {
    id: 10,
    name: "Unlimited PT Plan",
    duration: "3 Months",
    type: "Personal Trainer",
    sessions: "Unlimited",
    price: "$800",
  },
];

const MembershipForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [memberships, setMemberships] = useState<Membership[]>(dummyData);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    duration: "1 Month",
    type: "PT",
    sessions: "",
    price: "",
  });

  useEffect(() => {
    if (isEditMode && id) {
      const membershipId = parseInt(id);
      const membership = memberships.find((m) => m.id === membershipId);

      if (membership) {
        setFormData({
          name: membership.name,
          duration: membership.duration,
          type: membership.type === "Personal Trainer" ? "PT" : "General",
          sessions: membership.sessions.toString(),
          price: membership.price,
        });
      } else {
        console.error("Membership not found");
        navigate("/memberships");
      }
    }
  }, [isEditMode, id, memberships, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof FormData, value: string): void => {
    setFormData((prev) => ({
      ...prev,
      [name]: value as FormData[typeof name],
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!formData.name || !formData.price) {
      alert("Name and price are required fields.");
      return;
    }

    const newMembership: Membership = {
      id: isEditMode ? parseInt(id!) : Date.now(),
      name: formData.name,
      duration: formData.duration,
      type: formData.type === "PT" ? "Personal Trainer" : "General",
      sessions:
        formData.sessions === "N/A" || !formData.sessions
          ? "N/A"
          : parseInt(formData.sessions, 10),
      price: formData.price,
    };

    if (isEditMode) {
      setMemberships((prev) =>
        prev.map((m) => (m.id === parseInt(id!) ? newMembership : m))
      );
    } else {
      setMemberships((prev) => [...prev, newMembership]);
    }

    navigate("/memberships");
  };

  const handleBack = () => {
    navigate("/memberships");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft />
          </Button>
          <h1 className="text-2xl font-bold">
            {isEditMode ? "Edit Membership" : "Add New Membership"}
          </h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleBack}>
            Cancel
          </Button>
          <Button
            onClick={() =>
              handleSubmit({
                preventDefault: () => {},
              } as React.FormEvent<HTMLFormElement>)
            }
          >
            {isEditMode ? "Update" : "Create"} Membership
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., 24 Sessions PT Plan"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Duration *</Label>
              <Select
                value={formData.duration}
                onValueChange={(value) => handleSelectChange("duration", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1 Month">1 Month</SelectItem>
                  <SelectItem value="3 Months">3 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type *</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleSelectChange("type", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PT">Personal Trainer</SelectItem>
                  <SelectItem value="General">General</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sessions">Sessions *</Label>
              <Input
                id="sessions"
                name="sessions"
                type="text"
                value={formData.sessions}
                onChange={handleInputChange}
                placeholder="24 or N/A"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price *</Label>
              <Input
                id="price"
                name="price"
                type="text"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="$250"
                required
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MembershipForm;
