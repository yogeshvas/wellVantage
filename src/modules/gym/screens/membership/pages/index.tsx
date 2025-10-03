/** @format */

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";

interface Membership {
  id: number;
  name: string;
  duration: string;
  type: string;
  sessions: number | string;
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

const Membership: React.FC = () => {
  const navigate = useNavigate();
  const [memberships] = useState<Membership[]>(dummyData);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterType, setFilterType] = useState<
    "All" | "Personal Trainer" | "General"
  >("All");
  const [filterDuration, setFilterDuration] = useState<
    "All" | "1 Month" | "3 Months"
  >("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 10;

  const handleAddMembership = (): void => {
    navigate("/memberships/add");
  };

  const handleEditMembership = (membershipId: number): void => {
    navigate(`/memberships/edit/${membershipId}`);
  };

  const handleClearFilters = (): void => {
    setSearchTerm("");
    setFilterType("All");
    setFilterDuration("All");
    setCurrentPage(1);
  };

  const filteredMemberships: Membership[] = memberships.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.duration.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "All" || m.type === filterType;
    const matchesDuration =
      filterDuration === "All" || m.duration === filterDuration;
    return matchesSearch && matchesType && matchesDuration;
  });

  const totalPages: number = Math.ceil(
    filteredMemberships.length / itemsPerPage
  );
  const startIndex: number = (currentPage - 1) * itemsPerPage + 1;
  const endIndex: number = Math.min(
    currentPage * itemsPerPage,
    filteredMemberships.length
  );
  const paginatedMemberships: Membership[] = filteredMemberships.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Membership Management</h1>
        <Button onClick={handleAddMembership}>Add Membership</Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <Input
          placeholder="Search memberships..."
          type="text"
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="max-w-sm flex-1"
        />
        <div className="flex gap-2 flex-1 sm:flex-none">
          <Select
            value={filterType}
            onValueChange={(value) => setFilterType(value as typeof filterType)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Types</SelectItem>
              <SelectItem value="Personal Trainer">Personal Trainer</SelectItem>
              <SelectItem value="General">General</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={filterDuration}
            onValueChange={(value) =>
              setFilterDuration(value as typeof filterDuration)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter Duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Durations</SelectItem>
              <SelectItem value="1 Month">1 Month</SelectItem>
              <SelectItem value="3 Months">3 Months</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={handleClearFilters}>
            Clear Filters
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Sessions</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedMemberships.map((membership) => (
              <TableRow
                key={membership.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleEditMembership(membership.id)}
              >
                <TableCell>
                  <input type="checkbox" className="rounded" />
                </TableCell>
                <TableCell className="font-medium">{membership.name}</TableCell>
                <TableCell>{membership.duration}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      membership.type === "Personal Trainer"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {membership.type}
                  </Badge>
                </TableCell>
                <TableCell>{membership.sessions}</TableCell>
                <TableCell className="font-medium">
                  {membership.price}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {startIndex} to {endIndex} of {filteredMemberships.length}{" "}
          entries
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Membership;
