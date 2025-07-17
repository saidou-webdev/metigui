//import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import BusinessProfilePage from './pages/BusinessProfilePage';
import QuoteRequestPage from './pages/QuoteRequestPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ClientDashboard from './pages/clients/ClientDashboard';
import BusinessDashboardPage from './pages/busness/BusinessDashboardPage';
import AddRealisationForm from './components//busness/AddRealisationForm';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/business/:id" element={<BusinessProfilePage />} />
              <Route path="/quote-request/:id" element={<QuoteRequestPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/client/dashboard" element={<ClientDashboard />} />
              <Route path="/businessDashboardPage" element={<BusinessDashboardPage />} />
              <Route path="/add-realisation" element={<AddRealisationForm />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;