import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../ui/Input';
import Select from '../ui/Select';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';

const sectors = [
  { value: 'Électricité', label: 'Électricité' },
  { value: 'Plomberie', label: 'Plomberie' },
  { value: 'Menuiserie', label: 'Menuiserie' },
  { value: 'Peinture', label: 'Peinture' },
  { value: 'Maçonnerie', label: 'Maçonnerie' },
  { value: 'Autre', label: 'Autre' },
];

const cities = [
  { value: 'Conakry', label: 'Conakry' },
  { value: 'Kindia', label: 'Kindia' },
  { value: 'Labé', label: 'Labé' },
  { value: 'Mamou', label: 'Mamou' },
  { value: 'Pita', label: 'Pita' },
  { value: 'Autre', label: 'Autre' },
];

const BusinessRegister = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    sector: '',
    city: '',
    district: '',
    phone: '',
    description: '',
    yearsOfExperience: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!form.name) newErrors.name = 'Nom requis';
      if (!form.email) newErrors.email = 'Email requis';
      if (!form.sector) newErrors.sector = 'Secteur requis';
    }
    if (step === 2) {
      if (!form.city) newErrors.city = 'Ville requise';
      if (!form.district) newErrors.district = 'Quartier requis';
      if (!form.phone) newErrors.phone = 'Téléphone requis';
      if (!form.yearsOfExperience) newErrors.yearsOfExperience = 'Expérience requise';
    }
    if (step === 3) {
      if (!form.description) newErrors.description = 'Description requise';
    }
    if (step === 4) {
      if (!form.password) newErrors.password = 'Mot de passe requis';
      if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onNextStep = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
    }
  };

  const onPrevStep = () => {
    setStep((prev) => prev - 1);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/businessregister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de l\'inscription');
      }

      const data = await response.json();
      setMessage('Entreprise enregistrée avec succès !');

      setTimeout(() => {
        navigate('/login');
      }, 3000);

      console.log('Inscription réussie', data);
    } catch (err: any) {
      console.error(err);
      setMessage('');
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {message && (
        <div
          style={{ backgroundColor: '#44C553', color: '#FFFFFF' }}
          className="p-3 rounded-md mb-4"
        >
          {message}
        </div>
      )}
      <form onSubmit={onSubmit} className="space-y-6">
        {step === 1 && (
          <>
            <Input
              label="Nom de l'entreprise"
              id="name"
              name="name"
              value={form.name}
              onChange={onChange}
              error={errors.name}
              required
              inputClassName="border-[#2271B1] focus:border-[#F28C28]"
              labelClassName="text-[#1E1B23]"
              errorClassName="text-[#F28C28]"
            />
            <Input
              label="Email professionnel"
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              error={errors.email}
              required
              inputClassName="border-[#2271B1] focus:border-[#F28C28]"
              labelClassName="text-[#1E1B23]"
              errorClassName="text-[#F28C28]"
            />
            <Select
              label="Secteur d'activité"
              id="sector"
              name="sector"
              value={form.sector}
              onChange={onChange}
              options={sectors}
              error={errors.sector}
              required
              selectClassName="border-[#2271B1] focus:border-[#F28C28]"
              labelClassName="text-[#1E1B23]"
              errorClassName="text-[#F28C28]"
            />
          </>
        )}

        {step === 2 && (
          <>
            <Select
              label="Ville"
              id="city"
              name="city"
              value={form.city}
              onChange={onChange}
              options={cities}
              error={errors.city}
              required
              selectClassName="border-[#2271B1] focus:border-[#F28C28]"
              labelClassName="text-[#1E1B23]"
              errorClassName="text-[#F28C28]"
            />
            <Input
              label="Quartier"
              id="district"
              name="district"
              value={form.district}
              onChange={onChange}
              error={errors.district}
              required
              inputClassName="border-[#2271B1] focus:border-[#F28C28]"
              labelClassName="text-[#1E1B23]"
              errorClassName="text-[#F28C28]"
            />
            <Input
              label="Téléphone"
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={onChange}
              error={errors.phone}
              required
              inputClassName="border-[#2271B1] focus:border-[#F28C28]"
              labelClassName="text-[#1E1B23]"
              errorClassName="text-[#F28C28]"
            />
            <Input
              label="Années d'expérience"
              id="yearsOfExperience"
              name="yearsOfExperience"
              type="number"
              min="0"
              value={form.yearsOfExperience}
              onChange={onChange}
              error={errors.yearsOfExperience}
              required
              inputClassName="border-[#2271B1] focus:border-[#F28C28]"
              labelClassName="text-[#1E1B23]"
              errorClassName="text-[#F28C28]"
            />
          </>
        )}

        {step === 3 && (
          <TextArea
            label="Description de votre entreprise"
            id="description"
            name="description"
            value={form.description}
            onChange={onChange}
            rows={6}
            placeholder="Décrivez votre activité, vos services, votre expertise..."
            error={errors.description}
            required
            textareaClassName="border-[#2271B1] focus:border-[#F28C28]"
            labelClassName="text-[#1E1B23]"
            errorClassName="text-[#F28C28]"
          />
        )}

        {step === 4 && (
          <>
            <Input
              label="Mot de passe"
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={onChange}
              error={errors.password}
              required
              inputClassName="border-[#2271B1] focus:border-[#F28C28]"
              labelClassName="text-[#1E1B23]"
              errorClassName="text-[#F28C28]"
            />
            <Input
              label="Confirmer le mot de passe"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={onChange}
              error={errors.confirmPassword}
              required
              inputClassName="border-[#2271B1] focus:border-[#F28C28]"
              labelClassName="text-[#1E1B23]"
              errorClassName="text-[#F28C28]"
            />
          </>
        )}

        <div className="flex space-x-3">
          {step > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={onPrevStep}
              className="flex-1 border-[#A6CE39] text-[#A6CE39] hover:bg-[#E85D04] hover:text-white hover:border-[#E85D04]"
            >
              Retour
            </Button>
          )}
          {step < 4 && (
            <Button
              type="button"
              variant="primary"
              onClick={onNextStep}
              className="flex-1 bg-[#A6CE39] text-white hover:bg-[#F28C28]"
            >
              Continuer
            </Button>
          )}
          {step === 4 && (
            <Button
              type="submit"
              variant="primary"
              disabled={isLoading}
              className={`flex-1 hover:bg-[#F28C28]`}
              style={{
                backgroundColor: '#A6CE39',
                color: '#FFFFFF',
                opacity: isLoading ? 0.7 : 1,
              }}
            >
              {isLoading ? 'Inscription...' : "S'inscrire"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BusinessRegister;
