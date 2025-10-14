import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { LoginPage } from "./components/LoginPage";
import { LandingPage } from "./components/LandingPage";
import { Dashboard } from "./components/Dashboard";
import { ModulesPage } from "./components/ModulesPage";
import { VRTrainingPage } from "./components/VRTrainingPage";
import { LearningInterface } from "./components/LearningInterface";
import { AdminDashboard } from "./components/AdminDashboard";
import { InstitutionAdminDashboard } from "./components/InstitutionAdminDashboard";
import { DesktopOnlyScreen } from "./components/DesktopOnlyScreen";
import { Navigation } from "./components/Navigation";
import { WelcomeAnimation } from "./components/WelcomeAnimation";
import { AdminWelcomeAnimation } from "./components/AdminWelcomeAnimation";
import { CommunityHub } from "./components/CommunityHub";
import { LanguageProvider, useLanguage } from "./components/LanguageContext";
import { AlertProvider } from "./components/shared/AlertContext";
import { CommunicationProvider } from "./components/shared/CommunicationContext";
import { useIsMobile } from "./components/hooks/useIsMobile";
import { Toaster } from "./components/ui/sonner";

interface UserData {
  schoolName: string;
  schoolCode: string;
  studentName: string;
  age: string;
  institutionType: "school" | "college";
}

interface AdminData {
  email: string;
  password: string;
  displayName?: string;
}

interface InstitutionAdminData {
  institutionId: string;
  adminName: string;
  role: string;
}

function AppContent() {
  const [userData, setUserData] = useState<UserData | null>(
    null,
  );
  const [adminData, setAdminData] = useState<AdminData | null>(
    null,
  );
  const [institutionAdminData, setInstitutionAdminData] = useState<InstitutionAdminData | null>(
    null,
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isInstitutionAdminLoggedIn, setIsInstitutionAdminLoggedIn] = useState(false);
  const [isFirstLogin, setIsFirstLogin] = useState(true);
  const [showWelcomeAnimation, setShowWelcomeAnimation] = useState(false);
  const [showAdminWelcomeAnimation, setShowAdminWelcomeAnimation] = useState(false);
  
  // Mobile detection hook
  const isMobile = useIsMobile(1024);
  
  // Language context to reset on logout
  const { setLanguage } = useLanguage();

  // Memoize animation complete handlers to prevent infinite loops
  const handleAnimationComplete = React.useCallback(() => {
    setShowWelcomeAnimation(false);
  }, []);

  const handleAdminAnimationComplete = React.useCallback(() => {
    setShowAdminWelcomeAnimation(false);
  }, []);

  const handleLogin = (data: UserData) => {
    setUserData(data);
    setIsLoggedIn(true);
    setIsAdminLoggedIn(false);
    // Set first login to true on initial login, false on subsequent navigation
    setIsFirstLogin(true);
    // Show welcome animation on login
    setShowWelcomeAnimation(true);
  };

  const handleAdminLogin = (data: AdminData) => {
    // Check if user is on mobile - if so, don't allow admin login
    if (isMobile) {
      // Don't proceed with admin login on mobile
      return;
    }
    setAdminData(data);
    setIsAdminLoggedIn(true);
    setIsLoggedIn(false);
    setIsInstitutionAdminLoggedIn(false);
    setIsFirstLogin(true);
    // Show admin welcome animation on login
    setShowAdminWelcomeAnimation(true);
  };

  const handleInstitutionAdminLogin = (data: InstitutionAdminData) => {
    setInstitutionAdminData(data);
    setIsInstitutionAdminLoggedIn(true);
    setIsAdminLoggedIn(false);
    setIsLoggedIn(false);
    setIsFirstLogin(true);
  };

  const handleAdminLogout = () => {
    setAdminData(null);
    setIsAdminLoggedIn(false);
    setIsFirstLogin(true);
    // Force light mode on logout
    document.documentElement.classList.remove("dark");
    // Reset language to English
    setLanguage('en');
  };

  const handleLogout = () => {
    setUserData(null);
    setAdminData(null);
    setInstitutionAdminData(null);
    setIsLoggedIn(false);
    setIsAdminLoggedIn(false);
    setIsInstitutionAdminLoggedIn(false);
    setIsFirstLogin(true); // Reset for next login
    setShowWelcomeAnimation(false); // Reset animation state
    setShowAdminWelcomeAnimation(false); // Reset admin animation state
    // Force light mode on logout
    document.documentElement.classList.remove("dark");
    // Reset language to English
    setLanguage('en');
  };

  // Track navigation to mark subsequent visits as "Welcome back"
  React.useEffect(() => {
    if (isLoggedIn && isFirstLogin) {
      const timer = setTimeout(() => {
        setIsFirstLogin(false);
      }, 5000); // After 5 seconds, subsequent navigation will show "Welcome back"

      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, isFirstLogin]);

  return (
    <AlertProvider>
      <CommunicationProvider>
        <Router>
          <Toaster position="top-right" richColors />
          {!isLoggedIn && !isAdminLoggedIn && !isInstitutionAdminLoggedIn ? (
            <LoginPage
              onLogin={handleLogin}
              onAdminLogin={handleAdminLogin}
              onInstitutionAdminLogin={handleInstitutionAdminLogin}
            />
          ) : showWelcomeAnimation && userData ? (
            <WelcomeAnimation
              studentName={userData.studentName}
              schoolName={userData.schoolName}
              onComplete={handleAnimationComplete}
            />
          ) : showAdminWelcomeAnimation && adminData ? (
            <AdminWelcomeAnimation
              adminEmail={adminData.email}
              onComplete={handleAdminAnimationComplete}
            />
          ) : (
            <div className="min-h-screen bg-background text-foreground">
              {/* Show Navigation only for regular users, not admin */}
              {isLoggedIn && !isAdminLoggedIn && !isInstitutionAdminLoggedIn && (
                <Navigation
                  userData={userData}
                  onLogout={handleLogout}
                  isFirstLogin={isFirstLogin}
                />
              )}

              {/* Institution Admin Dashboard */}
              {isInstitutionAdminLoggedIn ? (
                <InstitutionAdminDashboard
                  adminData={institutionAdminData}
                  onLogout={handleLogout}
                />
              ) : /* SDMA Admin Dashboard - Direct access for admin users (Desktop only) */
              isAdminLoggedIn ? (
                isMobile ? (
                  <DesktopOnlyScreen onBack={handleAdminLogout} />
                ) : (
                  <AdminDashboard
                    adminData={adminData}
                    onLogout={handleLogout}
                  />
                )
              ) : (
                /* Regular user routes */
                <Routes>
                  <Route
                    path="/"
                    element={
                      <LandingPage userData={userData} />
                    }
                  />
                  <Route
                    path="/dashboard"
                    element={
                      <Dashboard userData={userData} />
                    }
                  />
                  <Route
                    path="/modules"
                    element={
                      <ModulesPage userData={userData} />
                    }
                  />
                  <Route
                    path="/modules/:moduleId"
                    element={
                      <LearningInterface userData={userData} />
                    }
                  />
                  <Route
                    path="/vr-training"
                    element={<VRTrainingPage />}
                  />
                  <Route
                    path="/community"
                    element={<CommunityHub userData={userData} />}
                  />
                  {/* Block admin access for regular users */}
                  <Route
                    path="/admin"
                    element={<Navigate to="/" replace />}
                  />
                  <Route
                    path="/preview_page.html"
                    element={<Navigate to="/" replace />}
                  />
                  <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                  />
                </Routes>
              )}
            </div>
          )}
        </Router>
      </CommunicationProvider>
    </AlertProvider>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}