import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { RouteRecord } from "vite-react-ssg";
import { Outlet } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CampPage from "./pages/CampPage";
import JournalPage from "./pages/JournalPage";
import AboutPage from "./pages/AboutPage";
import ScrollToTop from "./components/ScrollToTop";
import TesteAmplasament from "./pages/TesteAmplasament";
import DeclaratieConsimtamant from "@/pages/DeclaratieConsimtamant";
import RegulamentFunctionare from "@/pages/RegulamentFunctionare";
import JurnaleTabara from "@/pages/JurnaleTabara";

const queryClient = new QueryClient();

/**
 * Layout comun (wrapper)
 * – păstrează EXACT ce aveai înainte
 */
function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ScrollToTop />
        <Outlet />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

/**
 * RUTE SSG
 * IMPORTANT:
 * - rutele statice sunt OK pentru OG tags
 * - rutele dinamice rămân funcționale, dar NU sunt prerender-uite
 */
export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Index /> },

      { path: "despre-noi", element: <AboutPage /> },
      { path: "test-de-plasare", element: <TesteAmplasament /> },
      { path: "declaratie-consimtamant", element: <DeclaratieConsimtamant /> },
      { path: "regulament", element: <RegulamentFunctionare /> },
      { path: "jurnale", element: <JurnaleTabara /> },

      // ⚠️ dinamice (NU SSG by default)
      { path: ":slug", element: <CampPage /> },
      { path: "jurnal/:slug", element: <JournalPage /> },

      { path: "*", element: <NotFound /> },
    ],
  },
];
