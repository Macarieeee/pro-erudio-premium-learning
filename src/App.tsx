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
import ListeningPage from "@/pages/FCE/Listening/ListeningPage";
import WritingPage from "./pages/FCE/Writing/WritingPage";
import ReadingPage from "./pages/FCE/Reading/ReadingPage";

import { campsData } from "@/data/campsData";
import { journalList } from "@/data/journals";

import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

/**
 * Layout comun
 */
function Layout() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <ScrollToTop />
          <Outlet />
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

/**
 * RUTE SSG
 * - taberele sunt prerender-uite
 * - jurnalele sunt acum și ele prerender-uite
 * - rutele dinamice rămân ca fallback
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

      // Tabere prerender-uite
      ...campsData.map((c) => ({
        path: c.slug,
        element: <CampPage slugOverride={c.slug} />,
      })),

      // Jurnale prerender-uite
      ...journalList.map((j) => ({
        path: `jurnal/${j.slug}`,
        element: <JournalPage slugOverride={j.slug} />,
      })),

      // fallback dinamic
      { path: ":slug", element: <CampPage /> },
      { path: "jurnal/:slug", element: <JournalPage /> },

      { path: "fce/listening", element: <ListeningPage /> },
      { path: "fce/writing", element: <WritingPage /> },
      { path: "fce/reading", element: <ReadingPage /> },

      { path: "*", element: <NotFound /> },
    ],
  },
];