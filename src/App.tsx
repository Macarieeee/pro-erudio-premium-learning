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
import { HelmetProvider } from 'react-helmet-async';
const queryClient = new QueryClient();
/**
 * Layout comun (wrapper)
 * – păstrează EXACT ce aveai înainte
 */
function Layout() {
  return (
  <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ScrollToTop />
        <Outlet />
      </TooltipProvider>
    </HelmetProvider>
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
...campsData.map((c) => ({
  path: c.slug,
  element: <CampPage slugOverride={c.slug} />,
})),
      // ⚠️ dinamice (NU SSG by default)
      { path: ":slug", element: <CampPage /> },
      { path: "jurnal/:slug", element: <JournalPage /> },
      { path: "/fce/listening", element: <ListeningPage /> },
      { path: "/fce/writing", element: <WritingPage /> },
      { path: "/fce/reading", element: <ReadingPage />},
      { path: "*", element: <NotFound /> },
    ],
  },
];
