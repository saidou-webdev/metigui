import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, User, Settings, LogOut, BarChart2, Image, Star } from 'lucide-react';
import { Business, QuoteRequest } from '../../types';
import QuoteRequestCard from '../../components/client/QuoteRequestCard';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import QuoteResponseModal from '../../components/busness/QuoteResponseModal';

import axios from 'axios';

  const BusinessDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [selectedQuoteId, setSelectedQuoteId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'requests' | 'projects' | 'profile' | 'settings'>('overview');
  const [business, setBusiness] = useState<Business | null>(null);
  const [editableBusiness, setEditableBusiness] = useState<Business | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>([]);
  const [realisations, setRealisations] = useState<any[]>([]);




  useEffect(() => {
    window.scrollTo(0, 0);

    if (!currentUser || currentUser.role !== 'professionnel') {
      navigate('/login');
      return;
    }

    axios.get(`http://localhost:5000/api/entreprises/${currentUser.id}`)
      .then(res => {
        const data = res.data;
        data.projects = data.projects || [];
        data.reviews = data.reviews || [];
        data.location = data.location || { city: '', district: '' };
        data.description = data.description || '';
        data.yearsOfExperience = data.yearsOfExperience || 0;
        setBusiness(data);
        setEditableBusiness({ ...data });
      })
      .catch(err => {
        console.error('Erreur chargement entreprise :', err);
      });

      axios.get(`http://localhost:5000/api/realisations/business/${currentUser.id}`)
  .then(res => {
    setRealisations(res.data);
  })
  .catch(err => {
    console.error('Erreur récupération des réalisations :', err);
  });


    axios.get(`http://localhost:5000/api/devis?businessId=${currentUser.id}`)
      .then(res => {
        setQuoteRequests(res.data);
      })
      .catch(err => {
        console.error('Erreur chargement des devis :', err);
      });
  }, [currentUser, navigate]);

  const handleEditToggle = () => {
    if (isEditing && editableBusiness) {
      axios.put(`http://localhost:5000/api/entreprises/${currentUser.id}`, editableBusiness)
        .then(res => {
          setBusiness(res.data);
          setEditableBusiness({ ...res.data });
          setIsEditing(false);
        })
        .catch(err => {
          console.error("Erreur lors de la mise à jour du profil :", err);
        });
    } else {
      setIsEditing(true);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    if (!editableBusiness) return;
    const updated = { ...editableBusiness };
    if (field.startsWith('location.')) {
      const subField = field.split('.')[1];
      updated.location = { ...updated.location, [subField]: value };
    } else {
      (updated as any)[field] = value;
    }
    setEditableBusiness(updated);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  const handleUpdateStatus = async (devisId: string, status: 'responded' | 'refused') => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/devis/${devisId}/status`, {
        status,
      });
      if (response.status === 200) {
        alert(response.data.message);
        const updated = await axios.get(`http://localhost:5000/api/devis?businessId=${currentUser.id}`);
        setQuoteRequests(updated.data);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut du devis :', error);
      alert("Erreur lors de la mise à jour du statut du devis.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Voulez-vous vraiment supprimer cette réalisation ?')) return;
  
    try {
      await axios.delete(`http://localhost:5000/api/realisations/${id}`);
      setRealisations(prev => prev.filter(real => real.id !== id));
    } catch (err) {
      console.error('Erreur suppression réalisation:', err);
      alert('Erreur lors de la suppression.');
    }
  };
  
  


  if (!currentUser || !business || !editableBusiness) return null;

  const pendingRequests = quoteRequests.filter(req => req.status === 'pending');
  const respondedRequests = quoteRequests.filter(req => req.status === 'responded');
  const completedRequests = quoteRequests.filter(req => req.status === 'completed');


  return (
    <div className="bg-graylight min-h-screen text-textdark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-textdark">Tableau de bord</h1>
            <p className="mt-1 text-subtext">
              Bienvenue, {business.name}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 bg-accentblue text-white">
                <div className="flex items-center">
                  <div className="bg-white rounded-full p-2">
                    <User className="h-6 w-6 text-accentblue" />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">{business.name}</p>
                    <p className="text-sm text-accentblue/80">{business.sector}</p>
                  </div>
                </div>
              </div>

              <nav className="p-4">
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => setActiveTab('overview')}
                      className={`flex items-center w-full px-4 py-2 rounded-md ${
                        activeTab === 'overview'
                          ? 'bg-accentblue/10 text-accentblue'
                          : 'text-subtext hover:bg-gray-100'
                      }`}
                    >
                      <BarChart2 className="h-5 w-5 mr-3" />
                      Vue d'ensemble
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('requests')}
                      className={`flex items-center w-full px-4 py-2 rounded-md ${
                        activeTab === 'requests'
                          ? 'bg-accentblue/10 text-accentblue'
                          : 'text-subtext hover:bg-gray-100'
                      }`}
                    >
                      <FileText className="h-5 w-5 mr-3" />
                      Demandes de devis
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('projects')}
                      className={`flex items-center w-full px-4 py-2 rounded-md ${
                        activeTab === 'projects'
                          ? 'bg-accentblue/10 text-accentblue'
                          : 'text-subtext hover:bg-gray-100'
                      }`}
                    >
                      <Image className="h-5 w-5 mr-3" />
                      Mes réalisations
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('profile')}
                      className={`flex items-center w-full px-4 py-2 rounded-md ${
                        activeTab === 'profile'
                          ? 'bg-accentblue/10 text-accentblue'
                          : 'text-subtext hover:bg-gray-100'
                      }`}
                    >
                      <User className="h-5 w-5 mr-3" />
                      Mon profil
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('settings')}
                      className={`flex items-center w-full px-4 py-2 rounded-md ${
                        activeTab === 'settings'
                          ? 'bg-accentblue/10 text-accentblue'
                          : 'text-subtext hover:bg-gray-100'
                      }`}
                    >
                      <Settings className="h-5 w-5 mr-3" />
                      Paramètres
                    </button>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="mt-6 bg-white rounded-lg shadow-md p-6">
              <h3 className="font-medium text-textdark mb-4">Actions rapides</h3>
              <div className="space-y-3">
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => setActiveTab('projects')}
                >
                  Ajouter une réalisation
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => setActiveTab('profile')}
                >
                  Mettre à jour mon profil
                </Button>
              </div>
            </div>
          </div>

          
          {/* Main content */}
          <div className="md:col-span-3">
            {activeTab === 'overview' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center">
                      <div className="bg-blue-100 rounded-full p-3">
                        <FileText className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-gray-500">Demandes totales</p>
                        <p className="text-2xl font-bold text-gray-900">{quoteRequests.length}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center">
                      <div className="bg-yellow-100 rounded-full p-3">
                        <FileText className="h-6 w-6 text-yellow-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-gray-500">En attente</p>
                        <p className="text-2xl font-bold text-gray-900">{pendingRequests.length}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center">
                      <div className="bg-green-100 rounded-full p-3">
                        <FileText className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-gray-500">Terminées</p>
                        <p className="text-2xl font-bold text-gray-900">{completedRequests.length}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Demandes récentes</h2>
                  
                  {pendingRequests.length > 0 ? (
                    <div className="space-y-4">
                    {pendingRequests.slice(0, 2).map(request => (
                        <div key={request.id} className="border p-4 rounded shadow-sm flex justify-between items-center">
                          <div>
                            {/* Affiche infos de la demande, par exemple: */}
                            <p><strong>Client :</strong> {request.clientName}</p>
                            <p><strong>Description :</strong> {request.description}</p>
                            {/* etc. */}
                          </div>
                          <div className="space-x-2">
                          <Button variant="primary" onClick={() => {
                              setSelectedQuoteId(Number(request.id));
                              setIsModalOpen(true);
                               }}>
                              Répondre
                          </Button>

                            <Button
                              variant="outline"
                              onClick={() => handleUpdateStatus(request.id, 'refused')}
                            >
                              Refuser
                            </Button>
                          </div>
                        </div>
                      ))}
                      {pendingRequests.length > 2 && (
                        <div className="text-center mt-4">
                          <Button
                            variant="outline"
                            onClick={() => setActiveTab('requests')}
                          >
                            Voir toutes les demandes
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-600">Aucune demande en attente.</p>
                  )}
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Statistiques</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Répartition des demandes</h3>
                      <div className="bg-gray-100 rounded-lg p-4">
                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between text-sm">
                              <span>En attente</span>
                              <span className="font-medium">{pendingRequests.length}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                              <div
                                className="bg-yellow-500 h-2.5 rounded-full"
                                style={{ width: `${(pendingRequests.length / quoteRequests.length) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-sm">
                              <span>Répondues</span>
                              <span className="font-medium">{respondedRequests.length}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                              <div
                                className="bg-blue-500 h-2.5 rounded-full"
                                style={{ width: `${(respondedRequests.length / quoteRequests.length) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-sm">
                              <span>Terminées</span>
                              <span className="font-medium">{completedRequests.length}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                              <div
                                className="bg-green-500 h-2.5 rounded-full"
                                style={{ width: `${(completedRequests.length / quoteRequests.length) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Évaluation</h3>
                      <div className="bg-gray-100 rounded-lg p-4">
                        <div className="flex items-center mb-4">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, index) => (
                              <Star
                                key={index}
                                className={`h-6 w-6 ${
                                  index < Math.floor(business.rating)
                                    ? 'text-yellow-500 fill-yellow-500'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                            <span className="ml-2 text-xl font-bold">
                              {typeof business.rating === 'number' ? business.rating.toFixed(1) : '0.0'}
                            </span>
                        </div>
                        <p className="text-sm text-gray-600">
                             Basé sur {business.reviews?.length ?? 0} avis clients
                        </p>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'requests' && (
              <div>
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Demandes de devis</h2>
                  
                  <div className="border-b border-gray-200 mb-6">
                    <nav className="flex space-x-8">
                      <button
                        className="py-4 px-1 border-b-2 border-blue-500 text-blue-600 font-medium text-sm"
                      >
                        Toutes ({quoteRequests.length})
                      </button>
                      <button
                        className="py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium text-sm"
                      >
                        En attente ({pendingRequests.length})
                      </button>
                      <button
                        className="py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium text-sm"
                      >
                        Répondues ({respondedRequests.length})
                      </button>
                      <button
                        className="py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium text-sm"
                      >
                        Terminées ({completedRequests.length})
                      </button>
                    </nav>
                  </div>
                  
                  {quoteRequests.length > 0 ? (
                    <div className="space-y-4">
                      {quoteRequests.map(request => (
                        <QuoteRequestCard key={request.id} quoteRequest={request} businessView={true} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune demande de devis</h3>
                      <p className="text-gray-600">
                        Vous n'avez pas encore reçu de demande de devis.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {activeTab === 'projects' && (
              <div>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Mes réalisations</h2>
                    <Button variant="primary" onClick={() => navigate('/add-realisation')}>
                      Ajouter une réalisation
                    </Button>

                  </div>
                  
                   {realisations.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {realisations.map(real => (
                        <div key={real.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                          <div className="h-48 overflow-hidden">
                            <img 
                              src={`http://localhost:5000/uploads/realisations/${real.filename}`} 
                              alt={`realisation-${real.id}`} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="text-lg font-bold text-gray-900">Réalisation #{real.id}</h3>
                            <p className="mt-2 text-gray-600 text-sm">{real.description}</p>
                            <div className="mt-4 flex justify-end space-x-2">
                              <Button variant="outline" size="sm">Modifier</Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() => handleDelete(real.id)}
                               >
                                Supprimer
                              </Button>

                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Image className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune réalisation</h3>
                      <p className="text-gray-600 mb-4">
                        Vous n'avez pas encore ajouté de réalisations à votre profil.
                      </p>
                      <Button variant="primary" onClick={() => navigate('/add-realisation')}>
                        Ajouter ma première réalisation
                      </Button>

                    </div>
                  )}
                </div>
              </div>
            )}
            
            {activeTab === 'profile' && (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h2 className="text-xl font-bold text-gray-900 mb-6">Mon profil</h2>
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Nom de l'entreprise</h3>
          {isEditing ? (
            <input value={editableBusiness.name} onChange={(e) => handleInputChange('name', e.target.value)} className="mt-1 border rounded w-full px-2 py-1" />
          ) : (
            <p className="mt-1 text-gray-900">{business.name}</p>
          )}
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Secteur d'activité</h3>
          {isEditing ? (
            <input value={editableBusiness.sector} onChange={(e) => handleInputChange('sector', e.target.value)} className="mt-1 border rounded w-full px-2 py-1" />
          ) : (
            <p className="mt-1 text-gray-900">{business.sector}</p>
          )}
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Email</h3>
          {isEditing ? (
            <input value={editableBusiness.email} onChange={(e) => handleInputChange('email', e.target.value)} className="mt-1 border rounded w-full px-2 py-1" />
          ) : (
            <p className="mt-1 text-gray-900">{business.email}</p>
          )}
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Téléphone</h3>
          {isEditing ? (
            <input value={editableBusiness.phone} onChange={(e) => handleInputChange('phone', e.target.value)} className="mt-1 border rounded w-full px-2 py-1" />
          ) : (
            <p className="mt-1 text-gray-900">{business.phone}</p>
          )}
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Ville</h3>
          {isEditing ? (
            <input value={editableBusiness.location.city} onChange={(e) => handleInputChange('location.city', e.target.value)} className="mt-1 border rounded w-full px-2 py-1" />
          ) : (
            <p className="mt-1 text-gray-900">{business.location.city}</p>
          )}
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Quartier</h3>
          {isEditing ? (
            <input value={editableBusiness.location.district} onChange={(e) => handleInputChange('location.district', e.target.value)} className="mt-1 border rounded w-full px-2 py-1" />
          ) : (
            <p className="mt-1 text-gray-900">{business.location.district}</p>
          )}
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Années d'expérience</h3>
          {isEditing ? (
            <input value={editableBusiness.yearsOfExperience} onChange={(e) => handleInputChange('yearsOfExperience', Number(e.target.value))} type="number" className="mt-1 border rounded w-full px-2 py-1" />
          ) : (
            <p className="mt-1 text-gray-900">{business.yearsOfExperience} ans</p>
          )}
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Mise en avant</h3>
          <p className="mt-1 text-gray-900">{business.featured ? 'Oui' : 'Non'}</p>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-500">Description</h3>
        {isEditing ? (
          <textarea value={editableBusiness.description} onChange={(e) => handleInputChange('description', e.target.value)} className="mt-1 border rounded w-full px-2 py-1" />
        ) : (
          <p className="mt-1 text-gray-900">{business.description}</p>
        )}
      </div>

      <div className="pt-6 border-t border-gray-200 flex space-x-4">
        <Button variant="outline" onClick={handleEditToggle}>
          {isEditing ? 'Enregistrer les modifications' : 'Modifier mon profil'}
        </Button>
        {isEditing && (
          <Button variant="ghost" onClick={() => { setIsEditing(false); setEditableBusiness(business); }}>
            Annuler
          </Button>
        )}
      </div>
    </div>
  </div>
)}

            
            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Paramètres</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input
                          id="email_notifications"
                          name="email_notifications"
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          defaultChecked
                        />
                        <label htmlFor="email_notifications" className="ml-3 text-gray-700">
                          Recevoir des notifications par email pour les nouvelles demandes
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          id="marketing_emails"
                          name="marketing_emails"
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="marketing_emails" className="ml-3 text-gray-700">
                          Recevoir des offres et actualités
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Visibilité</h3>
                    <div className="flex items-center">
                      <input
                        id="profile_visible"
                        name="profile_visible"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        defaultChecked
                      />
                      <label htmlFor="profile_visible" className="ml-3 text-gray-700">
                        Profil visible dans les recherches
                      </label>
                    </div>
                    
                    <div className="mt-4">
                      <Button variant="outline">
                        Demander une mise en avant
                      </Button>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Sécurité</h3>
                    <Button variant="outline">Changer mon mot de passe</Button> </div>
                  
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Compte</h3>
                    <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                      Supprimer mon compte
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
              {selectedQuoteId && (
          <QuoteResponseModal
            devisId={selectedQuoteId}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSuccess={async () => {
              const updated = await axios.get(`http://localhost:5000/api/devis?businessId=${currentUser.id}`);
              setQuoteRequests(updated.data);
            }}
          />
        )}

    </div>
  );
};



export default BusinessDashboardPage;