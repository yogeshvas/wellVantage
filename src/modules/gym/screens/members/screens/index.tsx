/** @format */

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Members = () => {
  const navigate = useNavigate();

  const mockMembers = [
    {
      id: 1,
      name: "Shalu Yadav",
      email: "shaluyadev@gmail.com",
      phone: "+91",
      membership: "Gym 12 Month",
    },
    {
      id: 2,
      name: "John Doe",
      email: "john@example.com",
      phone: "+91",
      membership: "Gym 6 Month",
    },
  ];

  const handleAddMember = () => {
    navigate("/members/add");
  };

  const handleEditMember = (memberId: number) => {
    navigate(`/members/edit/${memberId}`);
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Member Management</h1>
        <Button onClick={handleAddMember}>Add Member</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Membership</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockMembers.map((member) => (
            <TableRow key={member.id} className="hover:bg-muted/50">
              <TableCell className="font-medium">{member.name}</TableCell>
              <TableCell>{member.email}</TableCell>
              <TableCell>{member.phone}</TableCell>
              <TableCell>{member.membership}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditMember(member.id)}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Members;
