import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Droplet, Hammer, PaintBucket, Building, Grid,Layers, Construction, } from 'lucide-react';

const categories = [ 
  {
    id: 'electricity',
    name: 'Électricité',
    description: 'Installation, réparation et mise aux normes électriques',
    icon: <Zap className="h-10 w-10 text-[#2C3E50]" />,
    link: '/search?sector=Électricité'
  },
  {
    id: 'plumbing',
    name: 'Plomberie',
    description: 'Dépannage, installation et rénovation de plomberie',
    icon: <Droplet className="h-10 w-10 text-[#2C3E50]" />,
    link: '/search?sector=Plomberie'
  },
  {
    id: 'carpentry',
    name: 'Menuiserie',
    description: 'Fabrication et pose de menuiseries sur mesure',
    icon: <Hammer className="h-10 w-10 text-[#2C3E50]" />,
    link: '/search?sector=Menuiserie'
  },
  {
    id: 'painting',
    name: 'Peinture',
    description: 'Travaux de peinture intérieure et extérieure',
    icon: <PaintBucket className="h-10 w-10 text-[#2C3E50]" />,
    link: '/search?sector=Peinture'
  },
  {
    id: 'tiling',
    name: 'Carrelage',
    description: 'Pose de carreaux mural et au sol, intérieur et extérieur',
    icon: <Grid className="h-10 w-10 text-[#2C3E50]" />,
    link: '/search?sector=Carrelage'
  },
  {
    id: 'plastering',
    name: 'Plâtrerie',
    description: 'Travaux de plâtrerie : faux plafonds, enduits, décoration de différents models',
    icon: <Layers className="h-10 w-10 text-[#2C3E50]" />,
    link: '/search?sector=plâtrerie'
  },
  {
    id: 'rebar',
    name: 'Ferraillage',
    description: 'Mise en place d\'armatures en acier pour le béton',
    icon: <Construction className="h-10 w-10 text-[#2C3E50]" />,
    link: '/search?sector=Ferraillage'
  },
  {
    id: 'masonry',
    name: 'Maçonnerie',
    description: 'Construction, rénovation et travaux de maçonnerie',
    icon: <Building className="h-10 w-10 text-[#2C3E50]" />,
    link: '/search?sector=Maçonnerie'
  },
  
{
  id: 'vitrerie',
  name: 'Vitrerie',
  description: 'Installation, réparation et travaux de vitrerie',
  icon: <Grid className="h-10 w-10 text-[#2C3E50]" />,
  link: '/search?sector=Vitrerie'
}
];

const ServiceCategories: React.FC = () => {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-textdark">Nos catégories de services</h2>
          <p className="mt-4 text-xl text-textsecondary">
            Trouvez le professionnel idéal pour tous vos projets
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map(category => (
            <Link 
              key={category.id} 
              to={category.link}
              className="bg-light rounded-lg shadow-md p-6 transition-transform hover:scale-105 hover:shadow-lg"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">{category.icon}</div>
                <h3 className="text-xl font-bold text-textdark mb-2">{category.name}</h3>
                <p className="text-textsecondary">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;
