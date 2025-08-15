import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Clock } from 'lucide-react';
import { Business } from '../../types';
import Button from '../ui/Button';

interface BusinessCardProps {
  business: Business;
  featured?: boolean;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ business, featured = false }) => {
  return (
    <div className={`bg-light rounded-lg shadow-md overflow-hidden ${featured ? 'border-2 border-primary' : ''}`}>
      {featured && (
        <div className="bg-primary text-light text-center py-1 text-sm font-medium">
          Professionnel recommandé
        </div>
      )}
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-textdark">{business.name}</h3>
          <div className="flex items-center bg-secondary/20 px-2 py-1 rounded text-sm">
            <Star className="h-4 w-4 text-warning mr-1" />
            <span className="font-medium">
              {business.rating !== undefined && business.rating !== null
                ? business.rating.toFixed(1)
                : 'Non noté'}
            </span>
          </div>
        </div>

        <div className="mt-2 text-sm text-secondary font-medium">
          {business.sector}
        </div>

        <div className="mt-4 flex items-start space-x-2">
          <MapPin className="h-5 w-5 text-secondary mt-0.5" />
          <span className="text-secondary">
            {business.city || 'Ville inconnue'}, {business.district || 'Quartier inconnu'}
          </span>
        </div>

        <div className="mt-2 flex items-start space-x-2">
          <Clock className="h-5 w-5 text-secondary mt-0.5" />
          <span className="text-secondary">
            {business.yearsOfExperience ?? 0} {business.yearsOfExperience > 1 ? 'années' : 'année'} d'expérience
          </span>
        </div>

        <p className="mt-4 text-secondary line-clamp-3">
          {business.description || 'Aucune description fournie.'}
        </p>

        <div className="mt-6 flex space-x-3">
          <Link to={`/business/${business.id}`} className="flex-1">
            <Button variant="primary" fullWidth>
              Voir le profil
            </Button>
          </Link>
          <Link to={`/quote-request/${business.id}`} className="flex-1">
            <Button variant="outline" fullWidth>
              Demander un devis
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;
