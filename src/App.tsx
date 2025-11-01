import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import ProductFeatures from './pages/ProductFeatures';
import ProductUseCases from './pages/ProductUseCases';
import ProductIntegrations from './pages/ProductIntegrations';
import Pricing from './pages/Pricing';
import SolutionsDevelopers from './pages/SolutionsDevelopers';
import SolutionsBusinessUsers from './pages/SolutionsBusinessUsers';
import SolutionsEnterprises from './pages/SolutionsEnterprises';
import Resources from './pages/Resources';
import CaseStudies from './pages/CaseStudies';
import Documentation from './pages/Documentation';
import Support from './pages/Support';
import About from './pages/About';
import Contact from './pages/Contact';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        
        {/* Product Pages */}
        <Route path="/product/features" element={<ProductFeatures />} />
        <Route path="/product/use-cases" element={<ProductUseCases />} />
        <Route path="/product/integrations" element={<ProductIntegrations />} />
        
        {/* Solutions Pages */}
        <Route path="/solutions/developers" element={<SolutionsDevelopers />} />
        <Route path="/solutions/business-users" element={<SolutionsBusinessUsers />} />
        <Route path="/solutions/enterprises" element={<SolutionsEnterprises />} />
        
        {/* Pricing */}
        <Route path="/pricing" element={<Pricing />} />
        
        {/* Resources */}
        <Route path="/resources" element={<Resources />} />
        <Route path="/resources/case-studies" element={<CaseStudies />} />
        <Route path="/resources/documentation" element={<Documentation />} />
        
        {/* Support & Company */}
        <Route path="/support" element={<Support />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
};

export default App;
