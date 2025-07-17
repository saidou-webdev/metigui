import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Business } from '../../types';
import BusinessCard from '../busness/BusinessCard';

interface FeaturedBusinessesProps {
  businesses: Business[];
}

const FeaturedBusinesses: React.FC<FeaturedBusinessesProps> = ({ businesses }) => {
  // Filter featured businesses
  const featuredBusinesses = businesses.filter(business => business.featured);
  
  return (
    <section className="py-12 bg-graylight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-textdark">Professionnels recommandés</h2>
          <Link to="/search" className="text-accentblue hover:text-orangedark flex items-center text-sm font-medium">
            Voir tous les professionnels
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredBusinesses.map(business => (
            <BusinessCard key={business.id} business={business} featured={true} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBusinesses;
