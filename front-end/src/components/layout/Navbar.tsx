import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, Home, Search } from 'lucide-react';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import Logo from '../../assets/images/MetiGui.png'; // ✅ import de ton logo

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

 

  const commonLinks = [
    { name: 'Accueil', to: '/', icon: Home },
    { name: 'Rechercher', to: '/search', icon: Search },
  ];

  return (
    <nav className="bg-[#2C3E50] shadow-md text-[#BDC3C7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo avec image */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src={Logo} alt="MetiGui Logo" className="h-24 max-h-24 w-auto object-contain" />
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {commonLinks.map(({ name, to }) => (
              <Link
                key={name}
                to={to}
                className="text-[#BDC3C7] hover:text-[#E67E22] px-3 py-2 rounded-md text-sm font-medium"
              >
                {name}
              </Link>
            ))}

            {isAuthenticated ? (
              <>
                <Link
                  to={currentUser?.role === 'business' ? '/business/dashboard' : '/client/dashboard'}
                  className="text-[#BDC3C7] hover:text-[#E67E22] px-3 py-2 rounded-md text-sm font-medium"
                >
                  Tableau de bord
                </Link>
               
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="primary" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    Connexion
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">
                    Inscription
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              className="p-2 rounded-md text-[#BDC3C7] hover:text-[#E67E22] hover:bg-[#34495E] focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div id="mobile-menu" className="md:hidden bg-[#2C3E50] text-[#BDC3C7]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {commonLinks.map(({ name, to, icon: Icon }) => (
              <Link
                key={name}
                to={to}
                onClick={toggleMenu}
                className="block px-3 py-2 rounded-md text-base font-medium hover:text-[#E67E22]"
              >
                <div className="flex items-center">
                  <Icon className="h-5 w-5 mr-2" />
                  {name}
                </div>
              </Link>
            ))}

            {isAuthenticated ? (
              <>
                <Link
                  to={currentUser?.role === 'business' ? '/business/dashboard' : '/client/dashboard'}
                  onClick={toggleMenu}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:text-[#E67E22]"
                >
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Tableau de bord
                  </div>
                </Link>
              
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={toggleMenu}
                  className="bg-[#E67E22] text-white block px-3 py-2 rounded-md text-base font-medium "
                >
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Connexion
                  </div>
                </Link>
                <Link
                  to="/register"
                  onClick={toggleMenu}
                  className="bg-[#E67E22] text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Inscription
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
