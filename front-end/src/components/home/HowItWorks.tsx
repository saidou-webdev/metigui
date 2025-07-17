import React from 'react';
import { Search, FileText, MessageSquare, Star } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Recherchez',
    description: 'Trouvez des professionnels qualifiés par secteur d\'activité ou localisation',
    icon: <Search className="h-10 w-10 text-white" />,
    color: 'bg-accentblue'
  },
  {
    id: 2,
    title: 'Demandez un devis',
    description: 'Décrivez votre projet et recevez des devis personnalisés',
    icon: <FileText className="h-10 w-10 text-white" />,
    color: 'bg-secondary'
  },
  {
    id: 3,
    title: 'Échangez',
    description: 'Discutez avec les professionnels pour affiner votre projet',
    icon: <MessageSquare className="h-10 w-10 text-white" />,
    color: 'bg-orange'
  },
  {
    id: 4,
    title: 'Évaluez',
    description: 'Partagez votre expérience et notez le professionnel après la prestation',
    icon: <Star className="h-10 w-10 text-white" />,
    color: 'bg-orangedark'
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-16 bg-graylight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-textdark">Comment ça marche ?</h2>
          <p className="mt-4 text-xl text-textsecondary">
            Trouvez facilement le professionnel qu'il vous faut en quelques étapes simples
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map(step => (
            <div key={step.id} className="flex flex-col items-center">
              <div className={`${step.color} rounded-full p-5 mb-6`}>
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-textdark mb-3">{step.title}</h3>
              <p className="text-textsecondary text-center">{step.description}</p>
              
              {step.id < steps.length && (
                <div className="hidden lg:block absolute transform translate-x-32">
                  <svg width="80" height="24" viewBox="0 0 80 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M80 12L56 0.452994V23.547L80 12ZM0 14H58V10H0V14Z" fill="#D1D5DB"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
