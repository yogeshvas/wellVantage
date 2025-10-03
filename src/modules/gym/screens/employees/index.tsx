/** @format */

"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Phone, Calendar, Search, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const jobTitles: string[] = ["General Trainer", "Personal Trainer"];

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

// Dummy data
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
  {
    id: 3,
    firstName: "Aisha",
    lastName: "Khan",
    email: "aisha.khan@evolvefitness.com",
    phone: "+1 982810709",
    dob: new Date("1992-11-20"),
    jobTitle: "Personal Trainer",
    specialty: "Cardio Fitness",
    commission: 55,
    clients: ["Raj Patel", "Neha Gupta"],
  },
  {
    id: 4,
    firstName: "Raj",
    lastName: "Patel",
    email: "raj.patel@evolvefitness.com",
    phone: "+1 982810710",
    dob: new Date("1985-05-10"),
    jobTitle: "General Trainer",
    specialty: "Yoga Specialist",
    commission: 40,
    clients: ["Sita Devi"],
  },
  {
    id: 5,
    firstName: "Priya",
    lastName: "Sharma",
    email: "priya.sharma@evolvefitness.com",
    phone: "+1 982810711",
    dob: new Date("1991-09-05"),
    jobTitle: "Personal Trainer",
    specialty: "Weight loss and Fat Burn",
    commission: 50,
    clients: ["Vikram Singh", "Lata Bai", "Kiran Joshi"],
  },
  {
    id: 6,
    firstName: "Vikram",
    lastName: "Singh",
    email: "vikram.singh@evolvefitness.com",
    phone: "+1 982810712",
    dob: new Date("1987-01-25"),
    jobTitle: "General Trainer",
    specialty: "Muscle Gain",
    commission: 48,
    clients: ["Meera Reddy"],
  },
  {
    id: 7,
    firstName: "Neha",
    lastName: "Gupta",
    email: "neha.gupta@evolvefitness.com",
    phone: "+1 982810713",
    dob: new Date("1993-04-18"),
    jobTitle: "Personal Trainer",
    specialty: "Cardio Fitness",
    commission: 52,
    clients: ["Arjun Mehra", "Pooja Nair"],
  },
  {
    id: 8,
    firstName: "Arjun",
    lastName: "Mehra",
    email: "arjun.mehra@evolvefitness.com",
    phone: "+1 982810714",
    dob: new Date("1989-12-30"),
    jobTitle: "General Trainer",
    specialty: "Yoga Specialist",
    commission: 42,
    clients: ["Riya Malhotra", "Sanjay Bose"],
  },
  {
    id: 9,
    firstName: "Sita",
    lastName: "Devi",
    email: "sita.devi@evolvefitness.com",
    phone: "+1 982810715",
    dob: new Date("1990-08-22"),
    jobTitle: "Personal Trainer",
    specialty: "Weight loss and Fat Burn",
    commission: 50,
    clients: ["Tarun Kapoor"],
  },
  {
    id: 10,
    firstName: "Kiran",
    lastName: "Joshi",
    email: "kiran.joshi@evolvefitness.com",
    phone: "+1 982810716",
    dob: new Date("1986-06-14"),
    jobTitle: "General Trainer",
    specialty: "Muscle Gain",
    commission: 46,
    clients: ["Anita Rao", "Dev Sharma"],
  },
];

export default function EmployeeManagement() {
  const navigate = useNavigate();
  const [employees] = useState<Employee[]>(initialEmployees);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedJob, setSelectedJob] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.lastName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesJob = selectedJob === "all" || emp.jobTitle === selectedJob;
    return matchesSearch && matchesJob;
  });

  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  const handleAddEmployee = () => {
    navigate("/employees/add");
  };

  const handleEditEmployee = (employeeId: number) => {
    navigate(`/employees/edit/${employeeId}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Employee Management</h1>
        <Button onClick={handleAddEmployee}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Employee
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search employees..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={selectedJob} onValueChange={setSelectedJob}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by job" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Jobs</SelectItem>
            {jobTitles.map((title) => (
              <SelectItem key={title} value={title}>
                {title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Assigned Clients</TableHead>
              <TableHead>Job Title</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedEmployees.map((employee) => (
              <TableRow
                key={employee.id}
                className="cursor-pointer hover:bg-muted"
                onClick={() => handleEditEmployee(employee.id)}
              >
                <TableCell className="font-medium">
                  {employee.firstName} {employee.lastName}
                </TableCell>
                <TableCell>{employee.clients.length}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      employee.jobTitle === "Personal Trainer"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {employee.jobTitle}
                  </Badge>
                </TableCell>
                <TableCell className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Calendar className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing{" "}
          {filteredEmployees.length > 0
            ? (currentPage - 1) * itemsPerPage + 1
            : 0}{" "}
          to {Math.min(currentPage * itemsPerPage, filteredEmployees.length)} of{" "}
          {filteredEmployees.length} entries
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
