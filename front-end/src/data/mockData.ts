// import { Business, Client, Project, QuoteRequest, Review } from '../types';

// export const mockBusinesses: Business[] = [
//   {
//     id: '1',
//     email: 'electricite@example.com',
//     password: 'hashed_password',
//     role: 'business',
//     name: 'Électricité Pro',
//     sector: 'Électricité',
//     location: {
//       city: 'Paris',
//       district: '11ème'
//     },
//     phone: '01 23 45 67 89',
//     description: 'Spécialiste en installations électriques résidentielles et commerciales avec plus de 15 ans d\'expérience.',
//     yearsOfExperience: 15,
//     featured: true,
//     rating: 4.8,
//     projects: [],
//     reviews: []
//   },
//   {
//     id: '2',
//     email: 'plomberie@example.com',
//     password: 'hashed_password',
//     role: 'business',
//     name: 'Plomberie Express',
//     sector: 'Plomberie',
//     location: {
//       city: 'Lyon',
//       district: 'Croix-Rousse'
//     },
//     phone: '04 56 78 90 12',
//     description: 'Service de plomberie rapide et fiable pour tous vos besoins domestiques et professionnels.',
//     yearsOfExperience: 8,
//     featured: true,
//     rating: 4.5,
//     projects: [],
//     reviews: []
//   },
//   {
//     id: '3',
//     email: 'menuiserie@example.com',
//     password: 'hashed_password',
//     role: 'business',
//     name: 'Menuiserie Artisanale',
//     sector: 'Menuiserie',
//     location: {
//       city: 'Bordeaux',
//       district: 'Centre'
//     },
//     phone: '05 67 89 01 23',
//     description: 'Fabrication et installation de menuiseries sur mesure avec un savoir-faire traditionnel.',
//     yearsOfExperience: 20,
//     featured: false,
//     rating: 4.9,
//     projects: [],
//     reviews: []
//   },
//   {
//     id: '4',
//     email: 'peinture@example.com',
//     password: 'hashed_password',
//     role: 'business',
//     name: 'Peinture & Déco',
//     sector: 'Peinture',
//     location: {
//       city: 'Marseille',
//       district: 'Vieux Port'
//     },
//     phone: '04 12 34 56 78',
//     description: 'Services de peinture intérieure et extérieure avec conseils en décoration.',
//     yearsOfExperience: 12,
//     featured: false,
//     rating: 4.6,
//     projects: [],
//     reviews: []
//   },
//   {
//     id: '5',
//     email: 'maconnerie@example.com',
//     password: 'hashed_password',
//     role: 'business',
//     name: 'Maçonnerie Générale',
//     sector: 'Maçonnerie',
//     location: {
//       city: 'Toulouse',
//       district: 'Capitole'
//     },
//     phone: '05 43 21 09 87',
//     description: 'Travaux de maçonnerie, rénovation et construction pour particuliers et professionnels.',
//     yearsOfExperience: 25,
//     featured: true,
//     rating: 4.7,
//     projects: [],
//     reviews: []
//   }
// ];

// export const mockProjects: Project[] = [
//   {
//     id: '1',
//     businessId: '1',
//     title: 'Rénovation électrique complète',
//     description: 'Mise aux normes électriques d\'un appartement de 80m² dans le 11ème arrondissement de Paris.',
//     imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
//     createdAt: '2023-05-15'
//   },
//   {
//     id: '2',
//     businessId: '1',
//     title: 'Installation domotique',
//     description: 'Installation d\'un système domotique complet pour une maison intelligente.',
//     imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
//     createdAt: '2023-07-22'
//   },
//   {
//     id: '3',
//     businessId: '2',
//     title: 'Rénovation salle de bain',
//     description: 'Installation complète d\'une nouvelle salle de bain avec douche à l\'italienne.',
//     imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
//     createdAt: '2023-04-10'
//   },
//   {
//     id: '4',
//     businessId: '3',
//     title: 'Escalier sur mesure',
//     description: 'Conception et installation d\'un escalier en bois massif sur mesure.',
//     imageUrl: 'https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1227&q=80',
//     createdAt: '2023-08-05'
//   },
//   {
//     id: '5',
//     businessId: '4',
//     title: 'Rénovation façade',
//     description: 'Ravalement et peinture d\'une façade d\'immeuble à Marseille.',
//     imageUrl: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80',
//     createdAt: '2023-06-18'
//   },
//   {
//     id: '6',
//     businessId: '5',
//     title: 'Extension maison',
//     description: 'Construction d\'une extension de 30m² pour une maison individuelle.',
//     imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
//     createdAt: '2023-03-12'
//   }
// ];

// export const mockReviews: Review[] = [
//   {
//     id: '1',
//     businessId: '1',
//     clientId: '1',
//     clientName: 'Jean Dupont',
//     rating: 5,
//     comment: 'Excellent travail, rapide et propre. Je recommande vivement !',
//     createdAt: '2023-06-20'
//   },
//   {
//     id: '2',
//     businessId: '1',
//     clientId: '2',
//     clientName: 'Marie Martin',
//     rating: 4,
//     comment: 'Très bon service, prix raisonnable. Petit retard sur le planning prévu.',
//     createdAt: '2023-07-15'
//   },
//   {
//     id: '3',
//     businessId: '2',
//     clientId: '3',
//     clientName: 'Pierre Durand',
//     rating: 5,
//     comment: 'Intervention rapide et efficace pour une fuite d\'eau. Très professionnel.',
//     createdAt: '2023-05-10'
//   },
//   {
//     id: '4',
//     businessId: '3',
//     clientId: '1',
//     clientName: 'Jean Dupont',
//     rating: 5,
//     comment: 'Travail d\'artisan exceptionnel. Menuiserie de grande qualité.',
//     createdAt: '2023-09-05'
//   },
//   {
//     id: '5',
//     businessId: '4',
//     clientId: '4',
//     clientName: 'Sophie Petit',
//     rating: 4,
//     comment: 'Bon travail de peinture, finitions soignées. Délai respecté.',
//     createdAt: '2023-08-22'
//   }
// ];

// export const mockClients: Client[] = [
//   {
//     id: '1',
//     email: 'jean.dupont@example.com',
//     password: 'hashed_password',
//     role: 'client',
//     firstName: 'Jean',
//     lastName: 'Dupont'
//   },
//   {
//     id: '2',
//     email: 'marie.martin@example.com',
//     password: 'hashed_password',
//     role: 'client',
//     firstName: 'Marie',
//     lastName: 'Martin'
//   },
//   {
//     id: '3',
//     email: 'pierre.durand@example.com',
//     password: 'hashed_password',
//     role: 'client',
//     firstName: 'Pierre',
//     lastName: 'Durand'
//   },
//   {
//     id: '4',
//     email: 'sophie.petit@example.com',
//     password: 'hashed_password',
//     role: 'client',
//     firstName: 'Sophie',
//     lastName: 'Petit'
//   }
// ];

// export const mockQuoteRequests: QuoteRequest[] = [
//   {
//     id: '1',
//     clientId: '1',
//     businessId: '1',
//     clientName: 'Jean Dupont',
//     description: 'Installation d\'un tableau électrique dans un appartement de 60m².',
//     status: 'responded',
//     createdAt: '2023-06-15'
//   },
//   {
//     id: '2',
//     clientId: '2',
//     businessId: '1',
//     clientName: 'Marie Martin',
//     description: 'Mise aux normes électriques pour une maison ancienne.',
//     status: 'pending',
//     createdAt: '2023-07-10'
//   },
//   {
//     id: '3',
//     clientId: '3',
//     businessId: '2',
//     clientName: 'Pierre Durand',
//     description: 'Réparation d\'une fuite sous évier et remplacement de robinetterie.',
//     status: 'completed',
//     createdAt: '2023-05-05'
//   },
//   {
//     id: '4',
//     clientId: '1',
//     businessId: '3',
//     clientName: 'Jean Dupont',
//     description: 'Fabrication d\'une bibliothèque sur mesure pour salon.',
//     status: 'responded',
//     createdAt: '2023-08-20'
//   },
//   {
//     id: '5',
//     clientId: '4',
//     businessId: '4',
//     clientName: 'Sophie Petit',
//     description: 'Peinture complète d\'un appartement de 3 pièces.',
//     status: 'pending',
//     createdAt: '2023-08-15'
//   }
// ];

// // Initialize the mock data by connecting projects and reviews to businesses
// export const initializeMockData = () => {
//   // Add projects to businesses
//   mockProjects.forEach(project => {
//     const business = mockBusinesses.find(b => b.id === project.businessId);
//     if (business) {
//       business.projects.push(project);
//     }
//   });

//   // Add reviews to businesses
//   mockReviews.forEach(review => {
//     const business = mockBusinesses.find(b => b.id === review.businessId);
//     if (business) {
//       business.reviews.push(review);
//     }
//   });

//   return {
//     businesses: mockBusinesses,
//     clients: mockClients,
//     projects: mockProjects,
//     reviews: mockReviews,
//     quoteRequests: mockQuoteRequests
//   };
// };