import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import StoryBook from './components/StoryBook';
import AdminDashboard from './components/AdminDashboard';
import { ThemeProvider } from './contexts/ThemeContext';
import { WeddingDataProvider } from './contexts/WeddingDataContext';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <WeddingDataProvider>
        <Router>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<StoryBook />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </AnimatePresence>
        </Router>
      </WeddingDataProvider>
    </ThemeProvider>
  );
}

export default App;