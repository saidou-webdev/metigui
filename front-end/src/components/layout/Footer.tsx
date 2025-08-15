import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import Logo from '../../assets/images/MetiGui.png';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#2C3E50] text-[#BDC3C7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
            <img src={Logo} alt="MetiGui Logo" className="h-24 max-h-24 w-auto object-contain" />
            </div>
            <p className="text-[#BDC3C7]">
              Plateforme de mise en relation entre clients et professionnels du bâtiment et des services artisanaux.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Liens rapides</h3>
            <ul className="space-y-2">
              {['Accueil', 'Rechercher un professionnel', 'Inscription', 'Connexion'].map((text, i) => {
                const path = ['/', '/search', '/register', '/login'][i];
                return (
                  <li key={text}>
                    <Link
                      to={path}
                      className="text-[#BDC3C7] hover:text-[#E67E22] transition"
                    >
                      {text}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Services</h3>
            <ul className="space-y-2">
              {[
                { name: 'Électricité', query: 'Électricité' },
                { name: 'Plomberie', query: 'Plomberie' },
                { name: 'Menuiserie', query: 'Menuiserie' },
                { name: 'Peinture', query: 'Peinture' },
                { name: 'Maçonnerie', query: 'Maçonnerie' },
                { name: 'Carreleur', query: 'Carreleur' },
                { name: 'Plâtrerie', query: 'Plâtrerie' },
                { name: 'Ferraillage', query: 'Ferraillage' },
                { name: 'Vitrerie', query: 'Vitrerie' },
              ].map(service => (
                <li key={service.name}>
                  <Link
                    to={`/search?sector=${encodeURIComponent(service.query)}`}
                    className="text-[#BDC3C7] hover:text-[#E67E22] transition"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-[#E67E22]" />
                <span className="text-[#BDC3C7]">groupemetigui@gmail.com</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-[#E67E22]" />
                <span className="text-[#BDC3C7]">+224 628 08 07 88</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-1 text-[#E67E22]" />
                <span className="text-[#BDC3C7]">
                  R.A Mamou, Guinée <br />
                  Dow Saré, CU Pita, 
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#BDC3C7]/30 mt-12 pt-8">
          <p className="text-center text-[#BDC3C7]">
            &copy; {new Date().getFullYear()} MeTiGui. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
