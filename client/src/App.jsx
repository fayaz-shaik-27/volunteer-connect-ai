// App.jsx — Root component with React Router setup
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout components
import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot';

// Page components
import Home from './pages/Home';
import RegisterVolunteer from './pages/RegisterVolunteer';
import PostOpportunity from './pages/PostOpportunity';
import Opportunities from './pages/Opportunities';

function App() {
  return (
    <Router>
      {/* Navbar is rendered on every page */}
      <Navbar />

      {/* Page routes */}
      <Routes>
        <Route path="/"                   element={<Home />} />
        <Route path="/register"           element={<RegisterVolunteer />} />
        <Route path="/post-opportunity"   element={<PostOpportunity />} />
        <Route path="/opportunities"      element={<Opportunities />} />
      </Routes>

      {/* Chatbot component */}
      <Chatbot />

      {/* Global footer */}
      <footer className="footer">
        &copy; {new Date().getFullYear()} Volunteer Connect AI &mdash; Built with AI Smart Matching
      </footer>
    </Router>
  );
}

export default App;
