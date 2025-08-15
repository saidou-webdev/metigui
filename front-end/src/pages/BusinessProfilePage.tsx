import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Phone, Mail, Clock, Calendar, Building } from 'lucide-react';
import { Business } from '../types';
import Button from '../components/ui/Button';
import ProjectCard from '../components/busness/ProjectCard';
import ReviewCard from '../components/busness/ReviewCard';
import { useAuth } from '../context/AuthContext'; 
import TextArea from '../components/ui/TextArea';
import axios from 'axios';

// Import contexte d'auth (à adapter si tu n'as pas encore)
 // si tu as ce composant, sinon remplace par textarea classique

const BusinessProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [business, setBusiness] = useState<Business | null>(null);
  const [activeTab, setActiveTab] = useState<'projects' | 'reviews'>('projects');
  const [realisations, setRealisations] = useState<any[]>([]);

  const { currentUser, isAuthenticated } = useAuth();

  // Nouveaux états pour avis
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loadingReview, setLoadingReview] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!id) return;

    // Charger les infos de l'entreprise (avec ses avis)
    axios.get(`http://localhost:5000/api/entreprises/${id}`)
      .then((res) => {
        setBusiness(res.data);
      })
      .catch((err) => {
        console.error('Erreur lors du chargement de l’entreprise :', err);
      });

    // Charger les réalisations
    axios.get(`http://localhost:5000/api/realisations/business/${id}`)
      .then(res => {
        setRealisations(res.data);
      })
      .catch(err => {
        console.error('Erreur chargement réalisations :', err);
      });
  }, [id]);

  const submitReview = async () => {
    if (!isAuthenticated) {
      alert("Vous devez être connecté pour laisser un avis.");
      return;
    }
    if (rating === 0) {
      alert("Merci de sélectionner une note.");
      return;
    }

    setLoadingReview(true);

    try {
      await axios.post("http://localhost:5000/api/reviews", {
        businessId: id,
        clientId: currentUser?.id,
        rating,
        comment
      });

      // Recharger les données après ajout pour mettre à jour la liste des avis et la note moyenne
      const res = await axios.get(`http://localhost:5000/api/entreprises/${id}`);
      setBusiness(res.data);
      setRating(0);
      setComment('');
    } catch (err) {
      console.error("Erreur ajout avis :", err);
      alert("Erreur lors de l'envoi de votre avis.");
    } finally {
      setLoadingReview(false);
    }
  };

  if (!business) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Professionnel non trouvé</h2>
          <p className="mt-2 text-gray-600">
            Le professionnel que vous recherchez n'existe pas ou a été supprimé.
          </p>
          <Link to="/search" className="mt-4 inline-block">
            <Button variant="primary">Retour à la recherche</Button>
          </Link>
        </div>
      </div>
    );
  }

  const ratingDisplay = (typeof business.rating === 'number') ? business.rating.toFixed(1) : 'Non noté';
  const reviewsCount = business.reviews?.length ?? 0;
  const projectsCount = realisations.length;

  const renderStars = (rating: number) => {
    const roundedRating = Math.round(rating);
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${index < roundedRating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Header */}
      <div className="bg-[#2C3E50]/90 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <h1 className="text-3xl font-bold">{business.name}</h1>
              <div className="mt-2 flex items-center">
                <div className="flex mr-2">{typeof business.rating === 'number' ? renderStars(business.rating) : null}</div>
                <span className="text-blue-200">
                  {ratingDisplay} ({reviewsCount} {reviewsCount > 1 ? 'avis' : 'avis'})
                </span>
              </div>
              <div className="mt-4 flex items-center">
                <Building className="h-5 w-5 mr-2" />
                <span>{business.sector ?? 'Secteur non renseigné'}</span>
              </div>
              <div className="mt-2 flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>
                  {business.city ?? 'Ville non renseignée'}, {business.district ?? 'Quartier non renseigné'}
                </span>
              </div>
              <div className="mt-2 flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span>
                  {business.yearsOfExperience ?? 0} {business.yearsOfExperience && business.yearsOfExperience > 1 ? 'années' : 'année'} d'expérience
                </span>
              </div>
            </div>

            <div className="mt-6 md:mt-0">
              <Link to={`/quote-request/${business.id}`}>
                <Button 
                  variant="primary" 
                  size="lg"
                  className="bg-white text-blue-700 hover:bg-gray-100 w-full md:w-auto"
                >
                  Demander un devis
                </Button>
              </Link>
              <div className="mt-4 space-y-2">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-blue-300" />
                  <span>{business.phone ?? 'Téléphone non renseigné'}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-blue-300" />
                  <span>{business.email ?? 'Email non renseigné'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">À propos</h2>
          <p className="text-gray-700">{business.description ?? 'Description non disponible.'}</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('projects')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'projects' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Réalisations ({projectsCount})
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'reviews' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Avis clients ({reviewsCount})
            </button>
          </nav>
        </div>

        {/* Tab content */}
        {activeTab === 'projects' && (
          <>
            {realisations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {realisations.map(real => (
                  <ProjectCard
                    key={real.id}
                    project={{
                      id: String(real.id),
                      businessId: String(real.business_id),
                      title: `Réalisation #${real.id}`,
                      description: real.description,
                      imageUrl: `http://localhost:5000/uploads/realisations/${real.filename}`,
                      createdAt: real.created_at,
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune réalisation</h3>
                <p className="text-gray-600">
                  Ce professionnel n'a pas encore ajouté de réalisations à son profil.
                </p>
              </div>
            )}
          </>
        )}

        {activeTab === 'reviews' && (
          <>
            {/* Formulaire d'avis pour client connecté */}
            {isAuthenticated && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-bold mb-4">Donnez votre avis</h3>
                <div className="flex mb-3">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`h-6 w-6 cursor-pointer ${index < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                      onClick={() => setRating(index + 1)}
                    />
                  ))}
                </div>
                <TextArea
                  placeholder="Votre avis..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  className="mb-3"
                />
                <Button variant="primary" onClick={submitReview} disabled={loadingReview}>
                  {loadingReview ? "Envoi..." : "Envoyer"}
                </Button>
              </div>
            )}

              {reviewsCount > 0 ? (
                <div
                  className="space-y-6"
                  style={reviewsCount > 4 ? { maxHeight: '600px', overflowY: 'auto' } : undefined}>
                  {business.reviews!.map(review => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun avis</h3>
                <p className="text-gray-600">
                  Ce professionnel n'a pas encore reçu d'avis.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BusinessProfilePage;
