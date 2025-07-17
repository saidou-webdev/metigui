import React from 'react';
import { Calendar } from 'lucide-react';
interface ProjectCardProps {
  project: {
    id: string;
    businessId?: string;
    title?: string;
    description: string;
    imageUrl: string;
    createdAt: string;
  };
}


const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="bg-light rounded-lg shadow-md overflow-hidden">
      <div className="h-48 overflow-hidden">
        <img 
          src={project.imageUrl} 
          alt={`Réalisation #${project.id}`} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-textdark">Réalisation #{project.id}</h3>
        <div className="flex items-center mt-2 text-sm text-secondary">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{new Date(project.createdAt).toLocaleDateString('fr-FR')}</span>
        </div>
        <p className="mt-2 text-secondary text-sm line-clamp-3">{project.description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
