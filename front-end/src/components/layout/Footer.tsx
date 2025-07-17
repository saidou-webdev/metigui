import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#121417] text-[#E0E0E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <Briefcase className="h-8 w-8 text-[#0056B3]" />
              <span className="ml-2 text-xl font-bold text-[#202124]">MeTiGui</span>
            </div>
            <p className="text-[#5F6368]">
              Plateforme de mise en relation entre clients et professionnels du bâtiment et des services artisanaux.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#202124]">Liens rapides</h3>
            <ul className="space-y-2">
              {['Accueil', 'Rechercher un professionnel', 'Inscription', 'Connexion'].map((text, i) => {
                const path = ['/', '/search', '/register', '/login'][i];
                return (
                  <li key={text}>
                    <Link
                      to={path}
                      className="text-[#5F6368] hover:text-[#202124] transition"
                    >
                      {text}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#202124]">Services</h3>
            <ul className="space-y-2">
              {[
                { name: 'Électricité', query: 'Électricité' },
                { name: 'Plomberie', query: 'Plomberie' },
                { name: 'Menuiserie', query: 'Menuiserie' },
                { name: 'Peinture', query: 'Peinture' },
                { name: 'Maçonnerie', query: 'Maçonnerie' },
              ].map(service => (
                <li key={service.name}>
                  <Link
                    to={`/search?sector=${encodeURIComponent(service.query)}`}
                    className="text-[#5F6368] hover:text-[#202124] transition"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#202124]">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-[#0056B3]" />
                <span className="text-[#5F6368]">contact@metigui.fr</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-[#0056B3]" />
                <span className="text-[#5F6368]">01 23 45 67 89</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-1 text-[#0056B3]" />
                <span className="text-[#5F6368]">
                  123 Avenue des Artisans<br />
                  75001 Paris, France
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#202124] mt-12 pt-8">
          <p className="text-center text-[#5F6368]">
            &copy; {new Date().getFullYear()} MeTiGui. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
