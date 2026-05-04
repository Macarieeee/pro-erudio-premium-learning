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
import PreliminaryListeningPage from "@/pages/Preliminary/Listening/PreliminaryListeningPage";
import PreliminaryReadingPage from "@/pages/Preliminary/Reading/PreliminaryReadingPage";
import PreliminaryWritingPage from "@/pages/Preliminary/Writing/PreliminaryWritingPage";
import CAEReadingPage from "./pages/CAE/Reading/CAEReadingPage";
import CAEWritingPage from "./pages/CAE/Writing/CAEWritingPage";
import CAEListeningPage from "./pages/CAE/Listening/CAEListeningPage";
import FceLandingPage from "./pages/FceLandingPage";
import PreliminaryLandingPage from "./pages/PreliminaryLandingPage";
import CAELandingPage from "./pages/CAELandingPage";

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

    
      { path: "fce-mock-test", element: <FceLandingPage /> },
{ path: "fce/listening", element: <ListeningPage /> },
{ path: "fce/writing", element: <WritingPage /> },
{ path: "fce/reading", element: <ReadingPage /> },

{ path: "preliminary-mock-test", element: <PreliminaryLandingPage /> },
{ path: "preliminary/listening", element: <PreliminaryListeningPage /> },
{ path: "preliminary/reading", element: <PreliminaryReadingPage /> },
{ path: "preliminary/writing", element: <PreliminaryWritingPage /> },

{ path: "cae-mock-test", element: <CAELandingPage /> },
{ path: "cae/reading", element: <CAEReadingPage /> },
{ path: "cae/writing", element: <CAEWritingPage /> },
{ path: "cae/listening", element: <CAEListeningPage /> },

// fallback dinamic — la final
{ path: "jurnal/:slug", element: <JournalPage /> },
{ path: ":slug", element: <CampPage /> },
{ path: "*", element: <NotFound /> },
    ],
  },
];