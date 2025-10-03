/** @format */

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Archive, Phone, MessageCircle, RotateCcw } from "lucide-react";
import { useLeadStore, type Lead } from "@/store/leadStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Utility to truncate long names
const truncateName = (name: string, maxLength: number = 20): string => {
  if (name.length > maxLength) {
    return `${name.slice(0, maxLength - 3)}...`;
  }
  return name;
};

const Leads = () => {
  const navigate = useNavigate();
  const { leads, archiveLead, unarchiveLead } = useLeadStore();
  const [activePage, setActivePage] = useState(1);
  const [archivedPage, setArchivedPage] = useState(1);
  const itemsPerPage = 9;

  const activeLeads = leads.filter((lead) => lead.status === "active");
  const archivedLeads = leads.filter((lead) => lead.status === "archived");

  // Pagination logic
  const getPaginatedLeads = (leads: Lead[], page: number) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return leads.slice(startIndex, endIndex);
  };

  const totalPages = (leads: Lead[]) => Math.ceil(leads.length / itemsPerPage);

  useEffect(() => {
    const total = totalPages(activeLeads);
    if (activePage > total) {
      setActivePage(Math.max(1, total));
    }
  }, [activeLeads]);

  useEffect(() => {
    const total = totalPages(archivedLeads);
    if (archivedPage > total) {
      setArchivedPage(Math.max(1, total));
    }
  }, [archivedLeads]);

  const handleAddNew = () => {
    navigate("/leads/add");
  };

  const handleEditLead = (leadId: string) => {
    navigate(`/leads/edit/${leadId}`);
  };

  const handleArchive = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    archiveLead(id);
    toast.success("Lead Archived! The lead has been moved to archived.");
  };

  const handleUnarchive = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    unarchiveLead(id);
    toast.success("Lead Unarchived!");
  };

  const handleCall = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success("Calling!");
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success("Opening WhatsApp!");
  };

  const getInterestBadgeVariant = (level: string) => {
    if (level === "Hot") return "destructive";
    if (level === "Warm") return "secondary";
    if (level === "Cold") return "outline";
    return "default";
  };

  const getFollowUpBadgeVariant = (status: string) => {
    if (status === "New Inquiry") return "default";
    if (status === "Needs Follow-Up") return "destructive";
    if (status === "Engaged") return "secondary";
    if (status === "Converted") return "default";
    if (status === "Archived") return "outline";
    return "default";
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Lead Management</h1>
        <Button onClick={handleAddNew} className="bg-green-500">
          + Add Lead
        </Button>
      </div>

      <Tabs defaultValue="active" className="">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="active" className="flex-1 sm:flex-none">
            Active ({activeLeads.length})
          </TabsTrigger>
          <TabsTrigger value="archived" className="flex-1 sm:flex-none">
            Archived ({archivedLeads.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="w-full">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Phone</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Interest Level
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Assigned to
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Last Interaction
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Follow Up
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getPaginatedLeads(activeLeads, activePage).map((lead) => (
                  <TableRow
                    key={lead.id}
                    onClick={() => handleEditLead(lead.id)}
                    className="cursor-pointer hover:bg-gray-50"
                  >
                    <TableCell className="font-medium truncate">
                      {truncateName(`${lead.firstName} ${lead.lastName}`)}
                    </TableCell>
                    <TableCell className="hidden md:table-cell whitespace-nowrap">
                      {lead.phone}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge
                        variant={
                          getInterestBadgeVariant(lead.interestLevel) as
                            | "default"
                            | "secondary"
                            | "destructive"
                            | "outline"
                            | undefined
                        }
                      >
                        {lead.interestLevel}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell whitespace-nowrap">
                      {lead.assignedTo}
                    </TableCell>
                    <TableCell className="hidden md:table-cell whitespace-nowrap">
                      {lead.lastInteraction}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge
                        variant={
                          getFollowUpBadgeVariant(lead.followUpStatus) as
                            | "default"
                            | "secondary"
                            | "destructive"
                            | "outline"
                            | undefined
                        }
                      >
                        {lead.followUpStatus}
                      </Badge>
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <div className="flex gap-1 sm:gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => handleWhatsApp(e)}
                          className="h-8 w-8 p-0"
                        >
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => handleCall(e)}
                          className="h-8 w-8 p-0"
                        >
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => handleArchive(lead.id, e)}
                          className="h-8 w-8 p-0"
                        >
                          <Archive className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {activeLeads.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center text-muted-foreground"
                    >
                      No active leads found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          {activeLeads.length > itemsPerPage && (
            <PaginationSection
              currentPage={activePage}
              totalPages={totalPages(activeLeads)}
              onPageChange={(page) => setActivePage(page)}
            />
          )}
        </TabsContent>

        <TabsContent value="archived" className="w-full">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Phone</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Interest Level
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Assigned to
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Last Interaction
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Follow Up
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getPaginatedLeads(archivedLeads, archivedPage).map((lead) => (
                  <TableRow
                    key={lead.id}
                    onClick={() => handleEditLead(lead.id)}
                    className="cursor-pointer hover:bg-gray-50"
                  >
                    <TableCell className="font-medium truncate">
                      {truncateName(`${lead.firstName} ${lead.lastName}`)}
                    </TableCell>
                    <TableCell className="hidden md:table-cell whitespace-nowrap">
                      {lead.phone}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge
                        variant={
                          getInterestBadgeVariant(lead.interestLevel) as
                            | "default"
                            | "secondary"
                            | "destructive"
                            | "outline"
                            | undefined
                        }
                      >
                        {lead.interestLevel}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell whitespace-nowrap">
                      {lead.assignedTo}
                    </TableCell>
                    <TableCell className="hidden md:table-cell whitespace-nowrap">
                      {lead.lastInteraction}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge
                        variant={
                          getFollowUpBadgeVariant(lead.followUpStatus) as
                            | "default"
                            | "secondary"
                            | "destructive"
                            | "outline"
                            | undefined
                        }
                      >
                        {lead.followUpStatus}
                      </Badge>
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <div className="flex gap-1 sm:gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => handleWhatsApp(e)}
                          className="h-8 w-8 p-0"
                        >
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => handleCall(e)}
                          className="h-8 w-8 p-0"
                        >
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => handleUnarchive(lead.id, e)}
                          className="h-8 w-8 p-0"
                        >
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {archivedLeads.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center text-muted-foreground"
                    >
                      No archived leads found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          {archivedLeads.length > itemsPerPage && (
            <PaginationSection
              currentPage={archivedPage}
              totalPages={totalPages(archivedLeads)}
              onPageChange={(page) => setArchivedPage(page)}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Pagination component
const PaginationSection = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Pagination className="mt-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            className={
              currentPage === 1
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>
        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              onClick={() => onPageChange(page)}
              isActive={currentPage === page}
              className="cursor-pointer"
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            onClick={() =>
              currentPage < totalPages && onPageChange(currentPage + 1)
            }
            className={
              currentPage === totalPages
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default Leads;
