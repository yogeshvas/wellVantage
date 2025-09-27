/** @format */

import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Building,
  Edit,
  Plus,
  Globe,
  MessageSquare,
  Activity,
  Shield,
  Clock,
  CreditCard,
  Settings,
  HelpCircle,
  Award,
  ChevronRight,
} from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();

  const quickAccessItems = [
    {
      icon: Building,
      label: "Switch Gym",
      action: () => navigate("/profile/switch-gym"),
      description: "Change between multiple gym locations",
      badge: "3 Branches",
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: Edit,
      label: "Edit Profile",
      action: () => navigate("/profile/edit-profile"),
      description: "Update your personal and gym information",
      badge: "",
      color: "bg-green-50 text-green-600",
    },
    {
      icon: Plus,
      label: "Add Gym",
      action: () => navigate("/profile/add-gym"),
      description: "Add a new gym branch",
      badge: "",
      color: "bg-purple-50 text-purple-600",
    },
    {
      icon: Globe,
      label: "Advertise Your Gym",
      action: () => navigate("/profile/advertise"),
      description: "Promote your gym on social media",
      badge: "5 Campaigns",
      color: "bg-orange-50 text-orange-600",
    },
    {
      icon: MessageSquare,
      label: "Message Inbox",
      action: () => navigate("/profile/messages"),
      description: "View and manage your messages",
      badge: "10 New",
      color: "bg-teal-50 text-teal-600",
    },
    {
      icon: Activity,
      label: "Yoga and Zumba Session",
      action: () => navigate("/profile/yoga-zumba"),
      description: "Schedule and manage yoga and zumba sessions",
      badge: "12 Classes",
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      icon: Award,
      label: "Goal and Reward",
      action: () => navigate("/profile/goal-reward"),
      description: "Set and track goals with rewards",
      badge: "8 Active",
      color: "bg-rose-50 text-rose-600",
    },
    {
      icon: Shield,
      label: "Biometric Devices",
      action: () => navigate("/profile/biometric-devices"),
      description: "Manage biometric scanners",
      badge: "4 Devices",
      color: "bg-yellow-50 text-yellow-600",
    },
    {
      icon: Clock,
      label: "Biometric Attendance",
      action: () => navigate("/profile/biometric-attendance"),
      description: "Track member attendance via biometrics",
      badge: "New",
      color: "bg-amber-50 text-amber-600",
    },
    {
      icon: CreditCard,
      label: "WellVantage Subscription",
      action: () => navigate("/profile/subscription"),
      description: "Manage your subscription plan",
      badge: "Premium Pro",
      color: "bg-green-50 text-green-600",
    },
    {
      icon: Settings,
      label: "Unit Preferences",
      action: () => navigate("/profile/unit-preferences"),
      description: "Adjust your unit settings",
      badge: "",
      color: "bg-violet-50 text-violet-600",
    },
    {
      icon: HelpCircle,
      label: "FAQ",
      action: () => navigate("/profile/faq"),
      description: "Access frequently asked questions",
      badge: "Updated",
      color: "bg-cyan-50 text-cyan-600",
    },
  ];

  return (
    <div className="h-screen flex flex-col pb-10">
      {/* Header */}
      <div className="py-4 border-b-1">
        <div className="">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Profile Settings
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your account and gym information
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge
                variant="secondary"
                className="bg-saffron-100 text-orange-800"
              >
                🇮🇳 Indian Fitness Hub
              </Badge>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                Premium Member
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto ">
        <div className=" py-6 ">
          <Card className="border shadow-none">
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                {quickAccessItems.map((item, index) => (
                  <Card
                    key={index}
                    className="border-1 shadow-none transition-all duration-200"
                  >
                    <CardContent className="p-4">
                      <button
                        onClick={item.action}
                        className="flex flex-col items-start w-full text-left"
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className={`p-2 rounded-lg ${item.color}`}>
                            <item.icon className="h-5 w-5" />
                          </div>
                          {item.badge && (
                            <Badge variant="secondary" className="text-xs">
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                        <p className="font-semibold text-gray-900 mt-2">
                          {item.label}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {item.description}
                        </p>
                        <div className="flex justify-end w-full mt-2">
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </div>
                      </button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
