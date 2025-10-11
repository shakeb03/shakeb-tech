import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { DataProvider } from './context/DataContext';

// Background Components
import NeuralNetwork from './components/background/NeuralNetwork';
import GradientOrbs from './components/background/GradientOrbs';
import ThreeBackground from './components/background/ThreeBackground';

// Layout Components
import Navigation from './components/Navigation';

// Pages
import Home from './pages/Home';
import BlogList from './components/sections/BlogList';
import BlogDetail from './components/sections/BlogDetail';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';

// SEO
import SEO from './components/SEO';

function App() {
  return (
    <HelmetProvider>
      <DataProvider>
        <Router>
          <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
            {/* Background Effects */}
            <ThreeBackground />
            <NeuralNetwork />
            <GradientOrbs />

            {/* Navigation */}
            <Navigation />

            {/* Main Content */}
            <div className="relative z-10">
              <Routes>
                <Route 
                  path="/" 
                  element={
                    <>
                      <SEO />
                      <Home />
                    </>
                  } 
                />
                <Route 
                  path="/blog" 
                  element={
                    <>
                      <SEO title="Knowledge Transfer" description="Insights and articles on AI, Machine Learning, and Software Engineering" />
                      <BlogList />
                    </>
                  } 
                />
                <Route 
                  path="/blog/:id" 
                  element={
                    <>
                      <BlogDetail />
                    </>
                  } 
                />
                <Route 
                  path="/admin" 
                  element={
                    <>
                      <SEO title="Admin Login" />
                      <AdminLogin />
                    </>
                  } 
                />
                <Route 
                  path="/admin/dashboard" 
                  element={
                    <>
                      <SEO title="Admin Dashboard" />
                      <AdminDashboard />
                    </>
                  } 
                />
              </Routes>
            </div>
          </div>
        </Router>
      </DataProvider>
    </HelmetProvider>
  );
}

export default App;
