import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Building } from 'lucide-react';
import {ClientRegister}  from '../components/register/ClientRegister';
import BusinessRegister  from '../components/register/BusinessRegister';
import { useAuth } from '../context/AuthContext';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [userType, setUserType] = useState<'client' | 'business'>('client');
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const [clientForm, setClientForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [businessForm, setBusinessForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    sector: '',
    city: '',
    district: '',
    phone: '',
    description: '',
    yearsOfExperience: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleClientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClientForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBusinessChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBusinessForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateClientStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!clientForm.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis';
    }
    else if (!/^[a-zA-Z\s]+$/.test(clientForm.firstName)) {
      newErrors.firstName = "Le prénom ne peut contenir que des lettres et des espaces";
    }
    
    if (!clientForm.lastName.trim()) {
      newErrors.lastName = 'Le nom est requis';
    }
    else if (!/^[a-zA-Z\s]+$/.test(clientForm.lastName)) {
      newErrors.lastName = "Le nom ne peut contenir que des lettres et des espaces";
    }
    
    if (!clientForm.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(clientForm.email)) {
      newErrors.email = 'Format d\'email invalide';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateClientStep2 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!clientForm.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (clientForm.password.length < 8 || clientForm.password.length > 20) {
      newErrors.password = 'Le mot de passe doit contenir entre 8 et 20 caractères';
    } else if (!/[A-Z]/.test(clientForm.password)) {
      newErrors.password = 'Le mot de passe doit contenir au moins une majuscule';
    } else if (!/\d/.test(clientForm.password)) {
      newErrors.password = 'Le mot de passe doit contenir au moins un chiffre';
    }
    
    if (clientForm.password !== clientForm.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateBusinessStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!businessForm.name.trim()) {
      newErrors.name = 'Le nom de l\'entreprise est requis';
    } else if (/[^a-zA-Z\s]/.test(businessForm.name)) {
      newErrors.name = 'Le nom de l\'entreprise ne peut contenir que des lettres';
    }
    
    if (!businessForm.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(businessForm.email)) {
      newErrors.email = 'Format d\'email invalide';
    }
    
    if (!businessForm.sector) {
      newErrors.sector = 'Le secteur d\'activité est requis';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateBusinessStep2 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!businessForm.city) {
      newErrors.city = 'La ville est requise';
    }
    
    if (!businessForm.district.trim()) {
      newErrors.district = 'Le quartier est requis';
    }
    
    if (!businessForm.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    }
    
    if (!businessForm.yearsOfExperience.trim()) {
      newErrors.yearsOfExperience = 'Les années d\'expérience sont requises';
    } else if (isNaN(Number(businessForm.yearsOfExperience)) || Number(businessForm.yearsOfExperience) < 0) {
      newErrors.yearsOfExperience = 'Veuillez entrer un nombre valide';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateBusinessStep3 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!businessForm.description.trim()) {
      newErrors.description = 'La description est requise';
    } else if (businessForm.description.length < 20) {
      newErrors.description = 'La description doit contenir au moins 20 caractères';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateBusinessStep4 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!businessForm.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (businessForm.password.length < 8 || businessForm.password.length > 20) {
      newErrors.password = 'Le mot de passe doit contenir entre 8 et 20 caractères';
    } else if (!/[A-Z]/.test(businessForm.password)) {
      newErrors.password = 'Le mot de passe doit contenir au moins une majuscule';
    } else if (!/\d/.test(businessForm.password)) {
      newErrors.password = 'Le mot de passe doit contenir au moins un chiffre';
    }
    
    if (businessForm.password !== businessForm.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    let isValid = false;
    
    if (userType === 'client') {
      if (step === 1) {
        isValid = validateClientStep1();
      } else if (step === 2) {
        isValid = validateClientStep2();
      }
    } else {
      if (step === 1) {
        isValid = validateBusinessStep1();
      } else if (step === 2) {
        isValid = validateBusinessStep2();
      } else if (step === 3) {
        isValid = validateBusinessStep3();
      } else if (step === 4) {
        isValid = validateBusinessStep4();
      }
    }
    
    if (isValid) {
      setStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let isValid = false;
    
    if (userType === 'client') {
      isValid = validateClientStep2();
    } else {
      isValid = validateBusinessStep4();
    }
    
    if (isValid) {
      setIsLoading(true);
      
      try {
        const userData = userType === 'client' ? clientForm : businessForm;
        const success = await register(userData, userType);
        
        if (success) {
          navigate('/login');
        }
      } catch (error) {
        console.error('Registration error:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-[#202124]">
          Créer un compte
        </h2>
        <p className="mt-2 text-center text-sm text-gray-700">
          Ou{' '}
          <Link
            to="/login"
            className="font-medium text-[#D35400]/70 hover:text-[#D35400]"
          >
            connectez-vous à votre compte existant
          </Link>
        </p>
      </div>
  
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-4 shadow sm:rounded-3xl sm:px-10 ">
          <div className="flex justify-center space-x-4 mb-6 ">
            <button
              type="button"
              onClick={() => {
                setUserType('client');
                setStep(1);
                setErrors({});
              }}
              className={`flex flex-col items-center px-4 py-3 rounded-lg border-2 ${
                userType === 'client'
                  ? 'bg-[#D35400]/70 border-[#2C3E50]'
                  : 'bg-gray-50 border-[#2C3E50] text-gray-600 hover:bg-gray-100'
              }`}
            >
              <User
                className={`h-6 w-6 ${
                  userType === 'client' ? 'text-[#D35400]' : 'text-gray-400'
                }`}
              />
              <span className="mt-2 font-medium">Client</span>
            </button>
  
            <button
              type="button"
              onClick={() => {
                setUserType('business');
                setStep(1);
                setErrors({});
              }}
              className={`flex flex-col items-center px-4 py-3 rounded-lg border-2 ${
                userType === 'business'
                  ? 'bg-[#D35400]/70 border-[#2C3E50]'
                  : 'bg-gray-50 border-[#2C3E50] text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Building
                className={`h-6 w-6 ${
                  userType === 'business' ? 'text-[#D35400]' : 'text-gray-400'
                }`}
              />
              <span className="mt-2 font-medium">Professionnel</span>
            </button>
          </div>
  
          {userType === 'business' && (
            <div className="mb-6">
              <div className="flex justify-between items-center">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      step > index
                        ? 'bg-[#D35400] text-white'
                        : step === index + 1
                        ? 'bg-[#BFDBFE] text-[#3B82F6] border-2 border-[#3B82F6]'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
              <div className="relative mt-2">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-300" />
                </div>
              </div>
            </div>
          )}
  
          {userType === 'client' && (
            <div className="mb-6">
              <div className="flex justify-between items-center">
                {Array.from({ length: 2 }).map((_, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      step > index
                        ? 'bg-[#D35400] text-white'
                        : step === index + 1
                        ? 'bg-[#BFDBFE] text-[#3B82F6] border-2 border-[#3B82F6]'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
              <div className="relative mt-2">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-300" />
                </div>
              </div>
            </div>
          )}
  
          {userType === 'client' ? (
            <ClientRegister
              form={clientForm}
              step={step}
              errors={errors}
              isLoading={isLoading}
              onChange={handleClientChange}
              onNextStep={handleNextStep}
              onPrevStep={handlePrevStep}
              onSubmit={handleSubmit}
            />
          ) : (
            <BusinessRegister
              form={businessForm}
              step={step}
              errors={errors}
              isLoading={isLoading}
              onChange={handleBusinessChange}
              onNextStep={handleNextStep}
              onPrevStep={handlePrevStep}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    </div>
  ) 
};

export default RegisterPage;