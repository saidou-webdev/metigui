import React, { useState } from 'react';
import axios from 'axios';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';

export const ClientRegister: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleNextStep = () => {
    const newErrors: Record<string, string> = {};
    if (!form.firstName) newErrors.firstName = 'Prénom requis';
    if (!form.lastName) newErrors.lastName = 'Nom requis';
    if (!form.email) newErrors.email = 'Email requis';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStep(2);
  };

  const handlePrevStep = () => {
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!form.password) newErrors.password = 'Mot de passe requis';
    if (form.password.length < 6) newErrors.password = '6 caractères minimum';
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/clientregister', form);
      setMessage("Inscription réussie...");

      setForm({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      setStep(1);

      setTimeout(() => {
        navigate('/login');
      }, 3000);

    } catch (error: any) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert('Erreur serveur');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {message && (
        <p
          style={{ color: '#44C553' }} // secondary (vert succès)
          className="font-semibold"
        >
          {message}
        </p>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <Input
            label="Prénom"
            id="firstName"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            error={errors.firstName}
            required
            labelClassName="text-[#1E1B23]"  // dark
            errorClassName="text-[#F28C28]"  // orange
            inputClassName="border-[#2271B1] focus:border-[#F28C28]" // accentblue / orange
          />

          <Input
            label="Nom"
            id="lastName"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            error={errors.lastName}
            required
            labelClassName="text-[#1E1B23]"
            errorClassName="text-[#F28C28]"
            inputClassName="border-[#2271B1] focus:border-[#F28C28]"
          />

          <Input
            label="Email"
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            required
            labelClassName="text-[#1E1B23]"
            errorClassName="text-[#F28C28]"
            inputClassName="border-[#2271B1] focus:border-[#F28C28]"
          />

          <Button
            type="button"
            variant="primary"
            fullWidth
            onClick={handleNextStep}
            style={{
              backgroundColor: '#A6CE39', // primary
              color: '#FFFFFF',            // light
            }}
            className="hover:bg-[#F28C28]" // orange hover
          >
            Continuer
          </Button>
        </div>
      )}

      {step === 2 && (
        <>
          <div className="space-y-4">
            <Input
              label="Mot de passe"
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              error={errors.password}
              required
              labelClassName="text-[#1E1B23]"
              errorClassName="text-[#F28C28]"
              inputClassName="border-[#2271B1] focus:border-[#F28C28]"
            />

            <Input
              label="Confirmer le mot de passe"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              required
              labelClassName="text-[#1E1B23]"
              errorClassName="text-[#F28C28]"
              inputClassName="border-[#2271B1] focus:border-[#F28C28]"
            />
          </div>

          <div className="mt-6 flex space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevStep}
              className="flex-1"
              style={{
                borderColor: '#A6CE39', // primary green
                color: '#A6CE39',
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = '#E85D04'; // orangedark
                (e.currentTarget as HTMLElement).style.color = '#FFFFFF';
                (e.currentTarget as HTMLElement).style.borderColor = '#E85D04';
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                (e.currentTarget as HTMLElement).style.color = '#A6CE39';
                (e.currentTarget as HTMLElement).style.borderColor = '#A6CE39';
              }}
            >
              Retour
            </Button>

            <Button
              type="submit"
              variant="primary"
              disabled={isLoading}
              className="flex-1"
              style={{
                backgroundColor: '#A6CE39',
                color: '#FFFFFF',
                opacity: isLoading ? 0.7 : 1,
              }}
              className="hover:bg-[#F28C28]"
            >
              {isLoading ? 'Inscription en cours...' : "S'inscrire"}
            </Button>
          </div>
        </>
      )}
    </form>
  );
};
