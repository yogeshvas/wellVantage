/** @format */

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  LayoutDashboard,
  Dumbbell,
  Calendar,
  User,
  Menu,
  X,
  Users,
  Target,
  CreditCard,
  FileText,
  Briefcase,
  LogOut,
  Check,
} from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import useAuthStore from "@/store/authStore";
import toast from "react-hot-toast";

interface SidebarLayoutProps {
  children: React.ReactNode;
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const navigationItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Lead Management",
    href: "/leads",
    icon: <Target className="h-5 w-5" />,
  },
  {
    title: "WellVantage Leads",
    href: "/wellvantage-leads",
    icon: <Check className="h-5 w-5" />,
  },
  {
    title: "Member Management",
    href: "/members",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Membership Management",
    href: "/memberships",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "Attendance Tracking",
    href: "/attendance",
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    title: "Employee Management",
    href: "/employees",
    icon: <Briefcase className="h-5 w-5" />,
  },
  {
    title: "Revenue Management",
    href: "/revenue",
    icon: <CreditCard className="h-5 w-5" />,
  },
  {
    title: "Workout Management",
    href: "/workouts",
    icon: <Dumbbell className="h-5 w-5" />,
  },
];

export function SidebarLayout({ children }: SidebarLayoutProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const location = useLocation();
  const { email, logout } = useAuthStore();

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const closeMobileSidebar = () => setIsMobileOpen(false);

  const handleLogout = async () => {
    toast.loading("Logging Out");
    toast.dismiss();
    logout();
    toast.success("Logged out successfully");
    // You might want to redirect to login page after logout
    // window.location.href = '/login';
  };

  // Navigation item component to avoid repetition
  const NavButton = ({
    item,
    isCollapsed = false,
  }: {
    item: NavItem;
    isCollapsed?: boolean;
  }) => {
    const isActive =
      location.pathname === item.href ||
      location.pathname.startsWith(item.href + "/");

    return (
      <Button
        variant={isActive ? "default" : "ghost"}
        className={cn(
          "w-full justify-start transition-all",
          isCollapsed ? "px-2" : "px-3",
          isActive && "bg-primary text-primary-foreground"
        )}
        asChild
      >
        <Link to={item.href} className="flex items-center">
          {item.icon}
          {!isCollapsed && <span className="ml-3">{item.title}</span>}
        </Link>
      </Button>
    );
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col border-r bg-white transition-all duration-300 ease-in-out relative",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        {/* Green texture background essence */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-100 opacity-30 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 pointer-events-none" />
        <div className="absolute top-0 left-0 w-24 h-24 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 pointer-events-none" />

        {/* Sidebar Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-green-100 bg-white/80 backdrop-blur-sm">
            {!isCollapsed ? (
              <div className="flex items-center space-x-2">
                <img
                  src="/images/logo.png"
                  alt="WellVantage"
                  className="h-6 w-6"
                />
                <span className="text-xl font-bold text-green-800">
                  WellVantage
                </span>
              </div>
            ) : (
              <div className="flex justify-center w-full">
                <img
                  src="/images/logo.png"
                  alt="WellVantage"
                  className="h-6 w-6"
                />
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              className="h-8 w-8 p-0 hover:bg-green-100"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? (
                <Menu className="h-4 w-4 text-green-700" />
              ) : (
                <X className="h-4 w-4 text-green-700" />
              )}
            </Button>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-3 py-4">
            <nav className="grid gap-1">
              {navigationItems.map((item) => (
                <NavButton
                  key={item.href}
                  item={item}
                  isCollapsed={isCollapsed}
                />
              ))}
            </nav>
          </ScrollArea>

          {/* User Profile Section */}
          <div className="p-4 border-t border-green-100 bg-white/80 backdrop-blur-sm">
            <div
              className={cn(
                "flex items-center space-x-3",
                isCollapsed ? "justify-center" : "justify-between"
              )}
            >
              <Link
                to="/profile"
                className={cn(
                  "flex items-center flex-1 min-w-0",
                  isCollapsed ? "justify-center" : "space-x-3"
                )}
              >
                <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 ring-2 ring-green-200">
                  <User className="h-4 w-4 text-white" />
                </div>
                {!isCollapsed && (
                  <div className="flex-1 min-w-0 overflow-hidden">
                    <p className="text-sm font-medium truncate text-green-900">
                      {email ? email.split("@")[0] : "User"}
                    </p>
                    <p className="text-xs text-green-600 truncate">
                      {email || "user@wellvantage.com"}
                    </p>
                  </div>
                )}
              </Link>

              {!isCollapsed && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
                  aria-label="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Logout button for collapsed state */}
            {isCollapsed && (
              <div className="flex justify-center mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
                  aria-label="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Sheet */}
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden fixed top-4 left-4 z-50 h-8 w-8 p-0 bg-white shadow-md"
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 bg-white">
          {/* Green texture background for mobile */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-100 opacity-30 pointer-events-none" />

          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-green-100 bg-white/80 backdrop-blur-sm">
              <div className="flex items-center space-x-2">
                <img
                  src="/images/logo.png"
                  alt="WellVantage"
                  className="h-6 w-6"
                />
                <span className="text-xl font-bold text-green-800">
                  WellVantage
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeMobileSidebar}
                className="h-8 w-8 p-0 hover:bg-green-100"
                aria-label="Close menu"
              >
                <X className="h-4 w-4 text-green-700" />
              </Button>
            </div>

            <ScrollArea className="flex-1 px-3 py-4">
              <nav className="grid gap-1">
                {navigationItems.map((item) => (
                  <NavButton key={item.href} item={item} />
                ))}
              </nav>
            </ScrollArea>

            <div className="p-4 border-t border-green-100 bg-white/80 backdrop-blur-sm">
              <div className="flex items-center justify-between space-x-3">
                <Link
                  to="/profile"
                  className="flex items-center space-x-3 flex-1 min-w-0"
                >
                  <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 ring-2 ring-green-200">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0 overflow-hidden">
                    <p className="text-sm font-medium truncate text-green-900">
                      {email ? email.split("@")[0] : "User"}
                    </p>
                    <p className="text-xs text-green-600 truncate">
                      {email || "user@wellvantage.com"}
                    </p>
                  </div>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
                  aria-label="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content Area */}
      <main
        className={cn(
          "flex-1 flex flex-col overflow-hidden transition-all duration-300 ease-in-out",
          isCollapsed ? "md:ml-16" : ""
        )}
      >
        {/* Top Bar for Mobile */}
        <header className="md:hidden h-16 border-b bg-white flex items-center px-4 shadow-sm">
          <div className="flex items-center space-x-2">
            <img src="/images/logo.png" alt="WellVantage" className="h-6 w-6" />
            <span className="text-xl font-bold text-green-800">
              WellVantage
            </span>
          </div>
        </header>

        {/* Page Content */}
        <ScrollArea className="flex-1 p-4 md:p-6">
          <div className="max-w-7xl mx-auto w-full">{children}</div>
        </ScrollArea>
      </main>
    </div>
  );
}
