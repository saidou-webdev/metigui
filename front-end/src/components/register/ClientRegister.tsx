import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface ClientRegisterProps {
  form: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  step: number;
  errors: Record<string, string>;
  isLoading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNextStep: () => void;
  onPrevStep: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const ClientRegister: React.FC<ClientRegisterProps> = ({
  form,
  step,
  errors,
  isLoading,
  onChange,
  onNextStep,
  onPrevStep,
  onSubmit
}) => {
  const [message, setMessage] = useState("");

  const handleNext = () => {
    const newErrors: Record<string, string> = {};
    if (!form.firstName) newErrors.firstName = 'Prénom requis';
    if (!form.lastName) newErrors.lastName = 'Nom requis';
    if (!form.email) newErrors.email = 'Email requis';

    if (Object.keys(newErrors).length > 0) {
      return alert('Veuillez remplir tous les champs requis.');
    }

    onNextStep();
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {message && (
        <p className="font-semibold" style={{ color: '#27AE60' }}>
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
            onChange={onChange}
            error={errors.firstName}
            required
            labelClassName="text-[#34495E]"
            errorClassName="text-[#E67E22]"
            inputClassName="border-[#2C3E50] focus:border-[#E67E22]"
          />

          <Input
            label="Nom"
            id="lastName"
            name="lastName"
            value={form.lastName}
            onChange={onChange}
            error={errors.lastName}
            required
            labelClassName="text-[#34495E]"
            errorClassName="text-[#E67E22]"
            inputClassName="border-[#2C3E50] focus:border-[#E67E22]"
          />

          <Input
            label="Email"
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            error={errors.email}
            required
            labelClassName="text-[#34495E]"
            errorClassName="text-[#E67E22]"
            inputClassName="border-[#2C3E50] focus:border-[#E67E22]"
          />

          <Button
            type="button"
            variant="primary"
            fullWidth
            onClick={handleNext}
            style={{
              backgroundColor: '#E67E22',
              color: '#FFFFFF',
            }}
            className="hover:bg-[#D35400]"
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
              onChange={onChange}
              error={errors.password}
              required
              labelClassName="text-[#34495E]"
              errorClassName="text-[#E67E22]"
              inputClassName="border-[#2C3E50] focus:border-[#E67E22]"
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
              labelClassName="text-[#34495E]"
              errorClassName="text-[#E67E22]"
              inputClassName="border-[#2C3E50] focus:border-[#E67E22]"
            />
          </div>

          <div className="mt-6 flex space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={onPrevStep}
              className="flex-1 border border-[#2C3E50] text-[#2C3E50] hover:bg-[#D35400] hover:text-white hover:border-[#D35400]"
            >
              Retour
            </Button>

            <Button
              type="submit"
              variant="primary"
              disabled={isLoading}
              className="flex-1 hover:bg-[#D35400]"
              style={{
                backgroundColor: '#E67E22',
                color: '#FFFFFF',
                opacity: isLoading ? 0.7 : 1,
              }}
            >
              {isLoading ? 'Inscription en cours...' : "S'inscrire"}
            </Button>
          </div>
        </>
      )}
    </form>
  );
};
