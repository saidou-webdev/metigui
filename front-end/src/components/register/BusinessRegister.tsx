import React, { useState } from 'react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';

interface BusinessRegisterProps {
  form: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    sector: string;
    city: string;
    district: string;
    phone: string;
    description: string;
    yearsOfExperience: string;
  };
  step: number;
  errors: Record<string, string>;
  isLoading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onNextStep: () => void;
  onPrevStep: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

const sectors = [
  { value: 'Électricité', label: 'Électricité' },
  { value: 'Plomberie', label: 'Plomberie' },
  { value: 'Menuiserie', label: 'Menuiserie' },
  { value: 'Peinture', label: 'Peinture' },
  { value: 'Carrelage', label: 'Carrelage' },
  { value: 'Plâtrerie', label: 'Plâtrerie' },
  { value: 'Ferraillage', label: 'Ferraillage' },
  { value: 'Maçonnerie', label: 'Maçonnerie' },
  { value: 'Vitrerie', label: 'Vitrerie' },
  { value: 'Autre', label: 'Autre' },
];

const cities = [
  { value: 'Conakry', label: 'Conakry' },
  { value: 'Kindia', label: 'Kindia' },
  { value: 'Coyah', label: 'Coyah' },
  { value: 'Dubréka', label: 'Dubréka' },
  { value: 'Forécariah', label: 'Forécariah' },
  { value: 'Télimélé', label: 'Télimélé' },
  { value: 'Boké', label: 'Boké' },
  { value: 'Boffa', label: 'Boffa' },
  { value: 'Fria', label: 'Fria' },
  { value: 'Gaoual', label: 'Gaoual' },
  { value: 'Koundara', label: 'Koundara' },
  { value: 'Labé', label: 'Labé' },
  { value: 'Koubia', label: 'Koubia' },
  { value: 'Lélouma', label: 'Lélouma' },
  { value: 'Mali', label: 'Mali' },
  { value: 'Tougué', label: 'Tougué' },
  { value: 'Mamou', label: 'Mamou' },
  { value: 'Pita', label: 'Pita' },
  { value: 'Dalaba', label: 'Dalaba' },
  { value: 'Kankan', label: 'Kankan' },
  { value: 'Kérouané', label: 'Kérouané' },
  { value: 'Kouroussa', label: 'Kouroussa' },
  { value: 'Mandiana', label: 'Mandiana' },
  { value: 'Siguiri', label: 'Siguiri' },
  { value: 'Faranah', label: 'Faranah' },
  { value: 'Dabola', label: 'Dabola' },
  { value: 'Dinguiraye', label: 'Dinguiraye' },
  { value: 'Kissidougou', label: 'Kissidougou' },
  { value: 'Nzérékoré', label: 'Nzérékoré' },
  { value: 'Guéckédou', label: 'Guéckédou' },
  { value: 'Beyla', label: 'Beyla' },
  { value: 'Lola', label: 'Lola' },
  { value: 'Macenta', label: 'Macenta' },
  { value: 'Yomou', label: 'Yomou' },
  { value: 'Autre', label: 'Autre' },
];

const BusinessRegister: React.FC<BusinessRegisterProps> = ({
  form,
  step,
  errors,
  isLoading,
  onChange,
  onNextStep,
  onPrevStep,
  onSubmit
}) => {
  const [message, setMessage] = useState<string>('');

  return (
    <div>
      {message && (
        <div style={{ backgroundColor: '#27AE60', color: '#FFFFFF' }} className="p-3 rounded-md mb-4">
          {message}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-6">
        {step === 1 && (
          <>
            <Input label="Nom de l'entreprise" id="name" name="name" value={form.name}
              onChange={onChange} error={errors.name} required
              inputClassName="border-[#2C3E50] focus:border-[#E67E22]"
              labelClassName="text-[#34495E]" errorClassName="text-[#E67E22]" />
            <Input label="Email professionnel" id="email" name="email" type="email"
              value={form.email} onChange={onChange} error={errors.email} required
              inputClassName="border-[#2C3E50] focus:border-[#E67E22]"
              labelClassName="text-[#34495E]" errorClassName="text-[#E67E22]" />
            <Select label="Secteur d'activité" id="sector" name="sector" value={form.sector}
              onChange={onChange} options={sectors} error={errors.sector} required
              selectClassName="border-[#2C3E50] focus:border-[#E67E22]"
              labelClassName="text-[#34495E]" errorClassName="text-[#E67E22]" />
          </>
        )}

        {step === 2 && (
          <>
            <Select label="Ville" id="city" name="city" value={form.city}
              onChange={onChange} options={cities} error={errors.city} required
              selectClassName="border-[#2C3E50] focus:border-[#E67E22]"
              labelClassName="text-[#34495E]" errorClassName="text-[#E67E22]" />
            <Input label="Quartier" id="district" name="district" value={form.district}
              onChange={onChange} error={errors.district} required
              inputClassName="border-[#2C3E50] focus:border-[#E67E22]"
              labelClassName="text-[#34495E]" errorClassName="text-[#E67E22]" />
            <Input label="Téléphone" id="phone" name="phone" type="tel" value={form.phone}
              onChange={onChange} error={errors.phone} required
              inputClassName="border-[#2C3E50] focus:border-[#E67E22]"
              labelClassName="text-[#34495E]" errorClassName="text-[#E67E22]" />
            <Input label="Années d'expérience" id="yearsOfExperience" name="yearsOfExperience"
              type="number" min="0" value={form.yearsOfExperience}
              onChange={onChange} error={errors.yearsOfExperience} required
              inputClassName="border-[#2C3E50] focus:border-[#E67E22]"
              labelClassName="text-[#34495E]" errorClassName="text-[#E67E22]" />
          </>
        )}

        {step === 3 && (
          <TextArea label="Description de votre entreprise" id="description"
            name="description" value={form.description} onChange={onChange}
            rows={6} placeholder="Décrivez votre activité, vos services, votre expertise..."
            error={errors.description} required
            textareaClassName="border-[#2C3E50] focus:border-[#E67E22]"
            labelClassName="text-[#34495E]" errorClassName="text-[#E67E22]" />
        )}

        {step === 4 && (
          <>
            <Input label="Mot de passe" id="password" name="password" type="password"
              value={form.password} onChange={onChange} error={errors.password} required
              inputClassName="border-[#2C3E50] focus:border-[#E67E22]"
              labelClassName="text-[#34495E]" errorClassName="text-[#E67E22]" />
            <Input label="Confirmer le mot de passe" id="confirmPassword" name="confirmPassword"
              type="password" value={form.confirmPassword} onChange={onChange}
              error={errors.confirmPassword} required
              inputClassName="border-[#2C3E50] focus:border-[#E67E22]"
              labelClassName="text-[#34495E]" errorClassName="text-[#E67E22]" />
          </>
        )}

        <div className="flex space-x-3">
          {step > 1 && (
            <Button type="button" variant="outline" onClick={onPrevStep}
              className="flex-1 border-[#2C3E50] text-[#2C3E50] hover:bg-[#D35400] hover:text-white hover:border-[#D35400]">
              Retour
            </Button>
          )}

          {step < 4 && (
            <Button type="button" variant="primary" onClick={onNextStep}
              className="flex-1 bg-[#E67E22] text-white hover:bg-[#D35400]">
              Continuer
            </Button>
          )}

          {step === 4 && (
            <Button type="submit" variant="primary" disabled={isLoading}
              className="flex-1 hover:bg-[#D35400]"
              style={{ backgroundColor: '#E67E22', color: '#FFFFFF', opacity: isLoading ? 0.7 : 1 }}>
              {isLoading ? 'Inscription...' : "S'inscrire"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BusinessRegister;
