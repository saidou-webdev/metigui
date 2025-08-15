import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Aminata Camara',
    role: 'Propriétaire',
    content: 'J\'ai trouvé un excellent électricien grâce à MeTiGui. Le service était rapide et professionnel. Je recommande vivement cette plateforme !',
    rating: 5
  },
  {
    id: 2,
    name: 'Jean Siba kamano',
    role: 'Gérant de copropriété',
    content: 'En tant que gestionnaire d\'immeuble, je dois souvent faire appel à des artisans. MeTiGui m\'a permis de constituer un réseau de professionnels fiables.',
    rating: 5
  },
  {
    id: 3,
    name: 'Alpha Boubacar Diallo',
    role: 'Particulier',
    content: 'La demande de devis est simple et rapide. J\'ai reçu plusieurs propositions en moins de 24h pour ma rénovation de salle de bain.',
    rating: 4
  }
];

const Testimonials: React.FC = () => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${
          index < rating ? 'text-warning fill-warning' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-16 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-textdark">Ce que nos utilisateurs disent</h2>
          <p className="mt-4 text-xl text-textsecondary">
            Découvrez les expériences de nos clients avec MeTiGui
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="bg-graylight rounded-lg p-6 shadow-sm">
              <div className="flex mb-4">{renderStars(testimonial.rating)}</div>
              <p className="text-textdark mb-6 italic">"{testimonial.content}"</p>
              <div className="flex items-center">
                <div className="bg-accentblue/10 rounded-full h-12 w-12 flex items-center justify-center">
                  <span className="text-accentblue font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-textdark">{testimonial.name}</h4>
                  <p className="text-textsecondary">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
