/** @format */

import React from "react";
import useAuthStore from "./store/authStore";
import Onboarding from "./modules/auth/pages/Onboarding";
import Login from "./modules/auth/pages/Login";
import Register from "./modules/auth/pages/Register";
import { Navigate, Route, Routes } from "react-router-dom";
import { SidebarLayout } from "./layouts/HomeSidebarLayout";
import Profile from "./modules/gym/screens/profile";
import Advertise from "./modules/gym/screens/profile/Advertise";
import Announcement from "./modules/gym/screens/profile/Announcement";
import YogaAndZumba from "./modules/gym/screens/profile/YogaAndZumba";
import Subscription from "./modules/gym/screens/profile/Subscription";
import FAQ from "./modules/gym/screens/profile/FAQ";
import GoalAndRewards from "./modules/gym/screens/profile/GoalAndRewards";
import Toast from "./components/custom/Toast";
import Leads from "./modules/gym/screens/leads";
import Dashboard from "./modules/gym/screens/dashboard";
import Membership from "./modules/gym/screens/membership/pages";
import Members from "./modules/gym/screens/members/screens";
import AddMember from "./modules/gym/screens/members/components/AddMember";
import EmployeeForm from "./modules/gym/screens/employees/components/EmployeeForm";
import EmployeeManagement from "./modules/gym/screens/employees";
import MembershipForm from "./modules/gym/screens/membership/components/MembershipForm";
import LeadFormScreen from "./modules/gym/screens/leads/components/LeadForm";

// const Workouts = () => <div>Workouts Content</div>;
const Progress = () => <div>Progress Content</div>;
const Settings = () => <div>Settings Content</div>;

// Protected Route with Sidebar Layout
const DashboardLayout = () => {
  return (
    <SidebarLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/leads" element={<Leads />} />
        <Route path="/leads/add" element={<LeadFormScreen />} />
        <Route path="/leads/edit/:id" element={<LeadFormScreen />} />
        <Route path="/members" element={<Members />} />
        <Route path="/members/add" element={<AddMember />} />
        <Route path="/members/edit/:id" element={<AddMember />} />
        <Route path="/employees" element={<EmployeeManagement />} />
        <Route path="/employees/add" element={<EmployeeForm />} />
        <Route path="/employees/edit/:id" element={<EmployeeForm />} />
        <Route path="/memberships" element={<Membership />} />
        <Route path="/memberships/add" element={<MembershipForm />} />
        <Route path="/memberships/edit/:id" element={<MembershipForm />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/settings" element={<Settings />} />

        {/* profile sub routes */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/switch-gym" element={<Profile />} />
        <Route path="/profile/edit-profile" element={<Profile />} />
        <Route path="/profile/add-gym" element={<Profile />} />
        <Route path="/profile/advertise" element={<Advertise />} />
        <Route path="/profile/messages" element={<Announcement />} />
        <Route path="/profile/yoga-zumba" element={<YogaAndZumba />} />
        <Route path="/profile/attendance-goals" element={<Profile />} />
        <Route path="/profile/biometric-devices" element={<Profile />} />
        <Route path="/profile/biometric-attendance" element={<Profile />} />
        <Route path="/profile/subscription" element={<Subscription />} />
        <Route path="/profile/unit-preferences" element={<Profile />} />
        <Route path="/profile/faq" element={<FAQ />} />
        <Route path="/profile/goal-reward" element={<GoalAndRewards />} />
      </Routes>
    </SidebarLayout>
  );
};

const App = () => {
  const { init, isLoggedIn } = useAuthStore();

  React.useEffect(() => {
    init();
  }, [init]);

  return (
    <div>
      <Routes>
        {isLoggedIn ? (
          // All authenticated routes use the dashboard layout
          <Route path="/*" element={<DashboardLayout />} />
        ) : (
          // Public routes
          <>
            <Route path="/" element={<Onboarding />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
      <Toast />
    </div>
  );
};

export default App;
