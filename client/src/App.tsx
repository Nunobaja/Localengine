import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Contacts from "./pages/Contacts";
import Visits from "./pages/Visits";
import Reviews from "./pages/Reviews";
import Referrals from "./pages/Referrals";
import Campaigns from "./pages/Campaigns";
import Automations from "./pages/Automations";
import Settings from "./pages/Settings";
import BioPage from "./pages/BioPage";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/onboarding"} component={Onboarding} />
      <Route path={"/dashboard"} component={Dashboard} />
      <Route path={"/contacts"} component={Contacts} />
      <Route path={"/visits"} component={Visits} />
      <Route path={"/reviews"} component={Reviews} />
      <Route path={"/referrals"} component={Referrals} />
      <Route path={"/campaigns"} component={Campaigns} />
      <Route path={"/automations"} component={Automations} />
      <Route path={"/settings"} component={Settings} />
      <Route path={"/bio-page"} component={BioPage} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
