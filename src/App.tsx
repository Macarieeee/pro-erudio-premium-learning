import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CampPage from "./pages/CampPage";
import JournalPage from "./pages/JournalPage";
import AboutPage from "./pages/AboutPage";
import ScrollToTop from "./components/ScrollToTop";
import TesteAmplasament from "./pages/TesteAmplasament";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/despre-noi" element={<AboutPage />} />
        <Route path="/:slug" element={<CampPage />} />
        <Route path="/jurnal/:slug" element={<JournalPage />} />
        <Route path="/teste-de-amplasare" element={<TesteAmplasament />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
