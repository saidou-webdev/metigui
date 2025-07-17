import React, { useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import ServiceCategorie from '../components/home/ServiceCategorie';
import HowItWorks from '../components/home/HowItWorks';
import Testimonials from '../components/home/Testimonials';
import BusinessList from '../components/home/BusinessList'; // ✅ nouveau composant dynamique

const HomePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <HeroSection />
      <ServiceCategorie />

      {/* Section dynamique des entreprises */}
      <section className="bg-gray-100 py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Entreprises disponibles sur Metigui
        </h2>
        <BusinessList />
      </section>

      <HowItWorks />
      <Testimonials />
    </div>
  );
};

export default HomePage;
