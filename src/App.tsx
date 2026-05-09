import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';

// Context
import { QuizProvider } from './context/QuizContext';
import { CartProvider } from './context/CartContext';

// Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { BlobBackground } from './components/BlobBackground';

// Pages
import { HomePage } from './pages/HomePage';
import { QuizPage } from './pages/QuizPage';
import { ResultPage } from './pages/ResultPage';
import { ShopPage } from './pages/ShopPage';
import { BuildYourBoxPage } from './pages/BuildYourBoxPage';
import { CorporatePage } from './pages/CorporatePage';
import { AboutPage } from './pages/AboutPage';
import { FAQPage } from './pages/FAQPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppContent = () => {
  const location = useLocation();
  const isQuizPage = location.pathname === '/quiz';

  return (
    <>
      <ScrollToTop />
      <BlobBackground />
      <Navbar />
      <CartDrawer />
      
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/result/:type" element={<ResultPage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/build" element={<BuildYourBoxPage />} />
              <Route path="/corporate" element={<CorporatePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/product/:id" element={<ShopPage />} /> {/* Simplified for now */}
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </>
  );
};

export default function App() {
  return (
    <Router>
      <CartProvider>
        <QuizProvider>
          <div className="flex flex-col min-h-screen">
            <AppContent />
          </div>
        </QuizProvider>
      </CartProvider>
    </Router>
  );
}
