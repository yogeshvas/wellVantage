/** @format */

"use client";

import * as React from "react";
import { useState, useEffect } from "react";
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
import { Trash2, Plus, ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { format } from "date-fns";

const jobTitles: string[] = ["General Trainer", "Personal Trainer"];
const specialties: string[] = [
  "Weight loss and Fat Burn",
  "Muscle Gain",
  "Cardio Fitness",
  "Yoga Specialist",
];

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: Date;
  jobTitle: string;
  specialty: string;
  commission: number;
  clients: string[];
}

interface FormDataState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  jobTitle: string;
  specialty: string;
  commission: string;
  clients: string[];
}

// Dummy data (same as in the list page)
const initialEmployees: Employee[] = [
  {
    id: 1,
    firstName: "Deepak",
    lastName: "Singh",
    email: "deepak.singh@evolvefitness.com",
    phone: "+1 982810707",
    dob: new Date("1990-07-12"),
    jobTitle: "Personal Trainer",
    specialty: "Weight loss and Fat Burn",
    commission: 50,
    clients: ["Ram Mohan", "Shyamcharan"],
  },
  {
    id: 2,
    firstName: "Deepak",
    lastName: "Singh",
    email: "deepak2@evolvefitness.com",
    phone: "+1 982810708",
    dob: new Date("1988-03-15"),
    jobTitle: "General Trainer",
    specialty: "Muscle Gain",
    commission: 45,
    clients: ["Amit Kumar", "Priya Sharma"],
  },
  // ... include all other employees from the original data
];

export default function EmployeeForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [formData, setFormData] = useState<FormDataState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    jobTitle: "",
    specialty: "",
    commission: "",
    clients: [""],
  });

  useEffect(() => {
    if (isEditMode && id) {
      const employeeId = parseInt(id);
      const employee = employees.find((emp) => emp.id === employeeId);

      if (employee) {
        setFormData({
          firstName: employee.firstName,
          lastName: employee.lastName,
          email: employee.email,
          phone: employee.phone,
          dob: format(employee.dob, "yyyy-MM-dd"),
          jobTitle: employee.jobTitle,
          specialty: employee.specialty,
          commission: employee.commission.toString(),
          clients: [...employee.clients],
        });
      } else {
        toast.error("Employee not found");
        navigate("/employees");
      }
    }
  }, [isEditMode, id, employees, navigate]);

  const handleAddClient = () => {
    setFormData((prev) => ({ ...prev, clients: [...prev.clients, ""] }));
  };

  const handleRemoveClient = (index: number) => {
    setFormData((prev) => {
      const newClients = prev.clients.filter((_, i) => i !== index);
      return { ...prev, clients: newClients };
    });
  };

  const handleClientChange = (index: number, value: string) => {
    setFormData((prev) => {
      const newClients = [...prev.clients];
      newClients[index] = value;
      return { ...prev, clients: newClients };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName) {
      toast.error("First name and last name are required.");
      return;
    }

    const cleanClients = formData.clients.filter(
      (client) => client.trim() !== ""
    );
    const employeeData: Omit<Employee, "id"> = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      dob: new Date(formData.dob),
      jobTitle: formData.jobTitle,
      specialty: formData.specialty,
      commission: parseInt(formData.commission) || 0,
      clients: cleanClients,
    };

    if (isEditMode && id) {
      const employeeId = parseInt(id);
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === employeeId ? { ...employeeData, id: emp.id } : emp
        )
      );
      toast.success("Employee updated successfully.");
    } else {
      const newId =
        employees.length > 0 ? Math.max(...employees.map((e) => e.id)) + 1 : 1;
      setEmployees((prev) => [...prev, { ...employeeData, id: newId }]);
      toast.success("Employee added successfully.");
    }

    navigate("/employees");
  };

  const handleBack = () => {
    navigate("/employees");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">
            {isEditMode ? "Edit Employee" : "Add New Employee"}
          </h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleBack}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {isEditMode ? "Update" : "Create"} Employee
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  firstName: e.target.value,
                }))
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  lastName: e.target.value,
                }))
              }
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  phone: e.target.value,
                }))
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="dob">Date of Birth</Label>
            <Input
              id="dob"
              type="date"
              value={formData.dob}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, dob: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="jobTitle">Job Title</Label>
            <Select
              value={formData.jobTitle}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, jobTitle: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select job title" />
              </SelectTrigger>
              <SelectContent>
                {jobTitles.map((title) => (
                  <SelectItem key={title} value={title}>
                    {title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="specialty">Trainer Specialty</Label>
            <Select
              value={formData.specialty}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, specialty: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select specialty" />
              </SelectTrigger>
              <SelectContent>
                {specialties.map((spec) => (
                  <SelectItem key={spec} value={spec}>
                    {spec}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="commission">Trainer Commission (%)</Label>
            <Input
              id="commission"
              type="number"
              value={formData.commission}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  commission: e.target.value,
                }))
              }
            />
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-base">Assigned Clients</Label>
          <div className="space-y-3">
            {formData.clients.map((client, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  value={client}
                  onChange={(e) => handleClientChange(index, e.target.value)}
                  placeholder="Client name"
                  className="flex-1"
                />
                {formData.clients.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveClient(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddClient}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Client
          </Button>
        </div>
      </form>
    </div>
  );
}
