/** @format */

import React from "react";
import useAuthStore from "./store/authStore";
import Onboarding from "./modules/auth/pages/Onboarding";
import Login from "./modules/auth/pages/Login";
import Register from "./modules/auth/pages/Register";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import { SidebarLayout } from "./layouts/HomeSidebarLayout";
import Profile from "./modules/gym/screens/profile";
import Advertise from "./modules/gym/screens/profile/Advertise";
import Announcement from "./modules/gym/screens/profile/Announcement";
import YogaAndZumba from "./modules/gym/screens/profile/YogaAndZumba";
import Subscription from "./modules/gym/screens/profile/Subscription";
import FAQ from "./modules/gym/screens/profile/FAQ";
import GoalAndRewards from "./modules/gym/screens/profile/GoalAndRewards";

// Example page components
const Dashboard = () => <div>Dashboard Content</div>;
const Workouts = () => <div>Workouts Content</div>;
const Schedule = () => <div>Schedule Content</div>;
const Progress = () => <div>Progress Content</div>;
const Settings = () => <div>Settings Content</div>;

// Protected Route with Sidebar Layout
const DashboardLayout = () => {
  return (
    <SidebarLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/schedule" element={<Schedule />} />
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
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#10b981",
              secondary: "#fff",
            },
          },
        }}
      />
    </div>
  );
};

export default App;
