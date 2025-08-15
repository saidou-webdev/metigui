import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Business } from '../types';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import TextArea from '../components/ui/TextArea';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const QuoteRequestPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, currentUser } = useAuth();

  const [business, setBusiness] = React.useState<Business | null>(null);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    description: ''
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (id) {
      axios.get(`http://localhost:5000/api/entreprises/${id}`)
        .then(res => setBusiness(res.data))
        .catch(err => console.error("Erreur lors du chargement de l'entreprise :", err));
    }

    if (isAuthenticated && currentUser?.role === 'client') {
      const client = currentUser as any;
      setFormData(prev => ({
        ...prev,
        name: `${client.firstName} ${client.lastName}`,
        email: client.email,
        phone: client.phone || '',
        city: client.city || ''
      }));
    }
  }, [id, isAuthenticated, currentUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Le nom est requis';
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Le téléphone est requis';
    if (!formData.description.trim()) {
      newErrors.description = 'La description est requise';
    } else if (formData.description.length < 10) {
      newErrors.description = 'La description doit contenir au moins 10 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      setIsSubmitting(true);

      try {
        const client = currentUser as import('../types').Client;

        const response = await axios.post('http://localhost:5000/api/devis', {
          clientId: client.id,
          businessId: business?.id,
          message: formData.description,
          clientName: formData.name,
          clientPhone: formData.phone,
          clientCity: formData.city || 'Non spécifiée',
          clientEmail: formData.email
        });

        if (response.status === 201) {
          setIsSuccess(true);
          setTimeout(() => {
            navigate('/client/dashboard');
          }, 3000);
        }

      } catch (error: any) {
        // Gestion améliorée de l'erreur
        if (error.response && error.response.data) {
          console.error("Erreur backend :", error.response.data);
          // Essaye d'extraire le message d'erreur
          const backendMessage = error.response.data.message || JSON.stringify(error.response.data);
          alert(`Erreur : ${backendMessage}`);
        } else {
          console.error("Erreur réseau ou authentification :", error.message);
          alert("Veuillez vous connecter à votre compte ou en créer un.");
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (!business) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#202124]">Professionnel non trouvé</h2>
          <p className="mt-2 text-gray-600">
            Le professionnel que vous recherchez n'existe pas ou a été supprimé.
          </p>
          <Button
            variant="primary"
            className="mt-4 bg-[#3B82F6] hover:bg-[#2563EB] text-white"
            onClick={() => navigate('/search')}
          >
            Retour à la recherche
          </Button>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#202124] mb-2">Demande envoyée avec succès !</h2>
          <p className="text-gray-700 mb-6">
            Votre demande de devis a été envoyée à <span className="font-semibold">{business.name}</span>. Vous serez notifié dès que le professionnel aura répondu.
          </p>
          <p className="text-gray-500 text-sm">Vous allez être redirigé vers votre tableau de bord...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#202124]">Demande de devis</h1>
          <p className="mt-2 text-gray-700">
            Envoyez une demande à <span className="font-medium text-[#2C3E50]">{business.name}</span>
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Nom complet"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Votre nom complet"
                  error={errors.name}
                  required
                  inputClassName="border-[#2C3E50] focus:border-[#E67E22]"
                  labelClassName="text-[#202124]"
                  errorClassName="text-[#E85D04]"
                />

                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="votre.email@exemple.com"
                  error={errors.email}
                  required
                  inputClassName="border-[#2C3E50] focus:border-[#E67E22]"
                  labelClassName="text-[#202124]"
                  errorClassName="text-[#E85D04]"
                />
              </div>

              <Input
                label="Téléphone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="06 12 34 56 78"
                error={errors.phone}
                required
                inputClassName="border-[#2C3E50] focus:border-[#E67E22]"
                labelClassName="text-[#202124]"
                errorClassName="text-[#E85D04]"
              />

              <Input
                label="Ville"
                name="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
                placeholder="Votre ville"
                error={errors.city}
                inputClassName="border-[#2C3E50] focus:border-[#E67E22]"
                labelClassName="text-[#202124]"
                errorClassName="text-[#E85D04]"
              />

              <TextArea
                label="Description de votre projet"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Décrivez votre projet en détail (type de travaux, matériaux, délais...)"
                rows={6}
                error={errors.description}
                required
                textareaClassName="border-[#2C3E50] focus:border-[#E67E22]"
                labelClassName="text-[#202124]"
                errorClassName="text-[#E85D04]"
              />

              <div className="pt-4">
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  disabled={isSubmitting}
                  className="bg-[#D35400]/70 hover:bg-[#D35400] text-white"
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer la demande de devis'}
                </Button>

                <p className="mt-4 text-sm text-gray-500 text-center">
                  En soumettant ce formulaire, vous acceptez que vos informations soient transmises au professionnel concerné.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuoteRequestPage;
