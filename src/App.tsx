import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState, createContext, useContext } from "react";
import { auth, User, onAuthStateChanged } from "@/lib/firebase";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/login";
import Signup from "./pages/Signup";
import FeatureSelection from "./pages/FeatureSelection";
import Dashboard from "./pages/Dashboard";

// Import feature pages
import ProcurementPage from "./pages/features/ProcurementPage";
import WarehousePage from "./pages/features/WarehousePage";
import LogisticsPage from "./pages/features/LogisticsPage";
import OrderTrendsPage from "./pages/features/OrderTrendsPage";
import InventoryDistributionPage from "./pages/features/InventoryDistributionPage";
import SupplierLeadTimesPage from "./pages/features/SupplierLeadTimesPage";
import AllInsightsPage from "./pages/features/AllnsightsPage";
import ProcessAutomationPage from "./pages/features/ProcessAutomationPage";
import RealtimeTrackingPage from "./pages/features/RealtimeTrackingPage";

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

const queryClient = new QueryClient();

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
}

function PublicRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return !user ? children : <Navigate to="/" replace />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
            
            {/* Protected routes */}
            <Route path="/select-features" element={<ProtectedRoute><FeatureSelection /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            
            {/* Feature pages */}
            <Route path="/features/procurement" element={<ProtectedRoute><ProcurementPage /></ProtectedRoute>} />
            <Route path="/features/warehouse" element={<ProtectedRoute><WarehousePage /></ProtectedRoute>} />
            <Route path="/features/logistics" element={<ProtectedRoute><LogisticsPage /></ProtectedRoute>} />
            <Route path="/features/order-trends" element={<ProtectedRoute><OrderTrendsPage /></ProtectedRoute>} />
            <Route path="/features/inventory-distribution" element={<ProtectedRoute><InventoryDistributionPage /></ProtectedRoute>} />
            <Route path="/features/supplier-lead-times" element={<ProtectedRoute><SupplierLeadTimesPage /></ProtectedRoute>} />
            <Route path="/features/ai-insights" element={<ProtectedRoute><AllInsightsPage /></ProtectedRoute>} />
            <Route path="/features/process-automation" element={<ProtectedRoute><ProcessAutomationPage /></ProtectedRoute>} />
            <Route path="/features/realtime-tracking" element={<ProtectedRoute><RealtimeTrackingPage /></ProtectedRoute>} />
            
            {/* Default redirects */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;