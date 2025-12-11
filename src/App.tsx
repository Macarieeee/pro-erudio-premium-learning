import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CampPage from "./pages/CampPage";
import JournalPage from "./pages/JournalPage";
import AboutPage from "./pages/AboutPage";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/pro-erudio-premium-learning">
      <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/despre-noi" element={<AboutPage />} />
          <Route path="/tabara-poiana-marului-2023" element={<CampPage year="2023" campName="Tabăra Poiana Mărului" />} />
          <Route path="/tabara-poiana-marului-2024" element={<CampPage year="2024" campName="Tabăra Poiana Mărului" />} />
          <Route path="/tabara-poiana-marului-2025" element={<CampPage year="2025" campName="Tabăra Poiana Mărului" />} />
          <Route path="/tabara-poiana-marului-2026" element={<CampPage year="2026" campName="Tabăra Poiana Mărului" />} />
          <Route path="/jurnal-poiana-marului-2023" element={<JournalPage year="2023" campName="Tabăra Poiana Mărului" />} />
          <Route path="/jurnal-poiana-marului-2024" element={<JournalPage year="2024" campName="Tabăra Poiana Mărului" />} />
          <Route path="/jurnal-poiana-marului-2025" element={<JournalPage year="2025" campName="Tabăra Poiana Mărului" />} />
          <Route path="/jurnal-poiana-marului-2026" element={<JournalPage year="2026" campName="Tabăra Poiana Mărului" />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
