import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, User, Settings, LogOut } from 'lucide-react';
import { QuoteRequest } from '../../types';
import QuoteRequestCard from '../../components/client/QuoteRequestCard';
import QuoteViewResponseModal from '../../components/client/QuoteViewResponseModal';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const ClientDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'requests' | 'profile' | 'settings'>('requests');
  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>([]);
  const [selectedDevisId, setSelectedDevisId] = useState<number | null>(null);
  const [lignesDevis, setLignesDevis] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [errorLoading, setErrorLoading] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!currentUser || currentUser.role !== 'client') {
      navigate('/login');
      return;
    }

    const fetchDevis = async () => {
      setLoadingRequests(true);
      setErrorLoading(null);
      try {
        const res = await axios.get(`http://localhost:5000/api/devis?clientId=${currentUser.id}`);
        setQuoteRequests(res.data);
      } catch (err) {
        console.error('Erreur de chargement des devis client :', err);
        setErrorLoading("Erreur lors du chargement de vos demandes de devis.");
      } finally {
        setLoadingRequests(false);
      }
    };

    fetchDevis();
  }, [currentUser, navigate]);

  const handleVoirReponse = async (devisId: number) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/devis/${devisId}/lignes`);
      setLignesDevis(res.data);
      setSelectedDevisId(devisId);
      setModalOpen(true);
    } catch (err) {
      console.error('Erreur chargement des lignes de devis:', err);
      alert("Erreur lors du chargement de la réponse au devis.");
    }
  };

  const handleCancel = async (devisId: number) => {
    try {
      await axios.patch(`http://localhost:5000/api/devis/${devisId}/status`, {
        status: 'cancelled',
      });
      setQuoteRequests(prev =>
        prev.map(devis =>
          devis.id === devisId ? { ...devis, status: 'cancelled' } : devis
        )
      );
    } catch (err) {
      console.error("Erreur annulation devis :", err);
      alert("Erreur lors de l'annulation de la demande.");
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!currentUser) return null;
  const client = currentUser as any;

  return (
    <div className="bg-gray-50 min-h-screen w-full">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
            <p className="mt-1 text-2xl text-gray-600">
              Bienvenue sur vôtre tableau de bord, {client.firstName} {client.lastName}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" /> Déconnexion
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 bg-[#2C3E50]/95 text-white">
                <div className="flex items-center">
                  <div className="bg-white rounded-full p-2">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">{client.firstName} {client.lastName}</p>
                    <p className="text-sm text-blue-200">{client.email}</p>
                  </div>
                </div>
              </div>
              <nav className="p-4">
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => setActiveTab('requests')}
                      className={`flex items-center w-full px-4 py-2 rounded-md ${activeTab === 'requests' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      <FileText className="h-5 w-5 mr-3" /> Mes demandes de devis
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('profile')}
                      className={`flex items-center w-full px-4 py-2 rounded-md ${activeTab === 'profile' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      <User className="h-5 w-5 mr-3" /> Mon profil
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('settings')}
                      className={`flex items-center w-full px-4 py-2 rounded-md ${activeTab === 'settings' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      <Settings className="h-5 w-5 mr-3" /> Paramètres
                    </button>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="mt-6 bg-white rounded-lg shadow-md p-6">
              <h3 className="font-medium text-gray-900 mb-4">Actions rapides</h3>
              <Button variant="primary" fullWidth onClick={() => navigate('/search')}>
                Rechercher un professionnel
              </Button>
            </div>
          </div>

          {/* Main content */}
          <div className="md:col-span-3">
            {activeTab === 'requests' && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Mes demandes de devis</h2>

                {loadingRequests && <p className="text-gray-600">Chargement des demandes...</p>}
                {errorLoading && <p className="text-red-600">{errorLoading}</p>}

                {!loadingRequests && !errorLoading && quoteRequests.length === 0 && (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune demande de devis</h3>
                    <p className="text-gray-600 mb-4">
                      Vous n'avez pas encore fait de demande de devis.
                    </p>
                    <Button variant="primary" onClick={() => navigate('/search')}>
                      Rechercher un professionnel
                    </Button>
                  </div>
                )}

                {!loadingRequests && !errorLoading && quoteRequests.length > 0 && (
                  <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2"
                  style={{ scrollbarWidth: 'thin' }}>
                    {quoteRequests.map(request => (
                      <QuoteRequestCard
                        key={request.id}
                        quoteRequest={request}
                        onViewResponse={handleVoirReponse}
                        onCancel={handleCancel}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Profile tab */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Mon profil</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Prénom</h3>
                      <p className="mt-1 text-gray-900">{client.firstName}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Nom</h3>
                      <p className="mt-1 text-gray-900">{client.lastName}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Email</h3>
                      <p className="mt-1 text-gray-900">{client.email}</p>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-gray-200">
                    <Button variant="outline">Modifier mon profil</Button>
                  </div>
                </div>
              </div>
            )}

            {/* Settings tab */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Paramètres</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Notifications</h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 rounded border-gray-300" />
                        <span className="ml-3 text-gray-700">Recevoir des notifications par email</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="h-4 w-4 text-blue-600 rounded border-gray-300" />
                        <span className="ml-3 text-gray-700">Recevoir des offres et actualités</span>
                      </label>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-gray-200">
                    <Button variant="outline">Changer mon mot de passe</Button>
                  </div>
                  <div className="pt-6 border-t border-gray-200">
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

      {/* Modal réponse devis */}
      {modalOpen && (
        <QuoteViewResponseModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          lignes={lignesDevis}
        />
      )}
    </div>
  );
};

export default ClientDashboardPage;
