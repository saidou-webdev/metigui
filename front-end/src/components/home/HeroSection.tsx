import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import Button from '../ui/Button';

const HeroSection: React.FC = () => {
  return (
    <div className="relative bg-accentblue overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://img.freepik.com/photos-premium/hommes-travaillant-chantier-construction_1048944-1815355.jpg?semt=ais_hybrid&w=740"
          alt="Equipe d'ingenieurs"
          className="w-full h-full object-cover opacity-50"
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="md:w-2/3">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Trouvez le professionnel idéal pour tous vos projets
          </h1>
          <p className="mt-6 text-xl text-light max-w-3xl">
            MeTiGui vous met en relation avec des artisans et professionnels qualifiés du bâtiment pour réaliser vos travaux en toute confiance.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link to="/search" className="w-full sm:w-auto">
              <Button 
                variant="primary" 
                size="lg"
                className="bg-light text-accentblue hover:bg-graylight w-full"
              >
                <Search className="h-5 w-5 mr-2" />
                Rechercher un professionnel
              </Button>
            </Link>
            <Link to="/register" className="w-full sm:w-auto">
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-orangedark w-full"
              >
                Inscription gratuite
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
