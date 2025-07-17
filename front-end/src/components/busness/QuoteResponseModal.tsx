import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../ui/Button';

interface LigneDevis {
  designation: string;
  quantite: number;
  prix_unitaire: number;
  prix_total: number;
}

interface Props {
  devisId: number;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const QuoteResponseModal: React.FC<Props> = ({ devisId, isOpen, onClose, onSuccess }) => {
  const [lignes, setLignes] = useState<LigneDevis[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const defaultLines = Array.from({ length: 30 }, () => ({
        designation: '',
        quantite: 0,
        prix_unitaire: 0,
        prix_total: 0,
      }));
      setLignes(defaultLines);
    }
  }, [isOpen]);

  const handleChange = (index: number, field: keyof LigneDevis, value: string | number) => {
    setLignes(prev => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: field === 'designation' ? String(value) : Number(value),
      };
      updated[index].prix_total = updated[index].quantite * updated[index].prix_unitaire;
      return updated;
    });
  };

  const totalGlobal = lignes.reduce((sum, l) => sum + (l.prix_total || 0), 0);

  const handleSubmit = async () => {
    const lignesValides = lignes.filter(l => l.designation.trim() !== '' && l.quantite > 0 && l.prix_unitaire > 0);

    if (lignesValides.length === 0) {
      alert("Veuillez remplir au moins une ligne de devis valide.");
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post(`http://localhost:5000/api/devis/${devisId}/lignes`, {
        lignes: lignesValides,
      });

      await axios.patch(`http://localhost:5000/api/devis/${devisId}/status`, {
        status: 'responded',
      });

      alert('✅ Devis envoyé avec succès !');
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Erreur envoi devis :", error);
      alert("Erreur lors de l'envoi du devis.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center p-4">
      <div className="bg-light w-full max-w-5xl rounded-lg p-6 shadow-lg overflow-auto max-h-[90vh]">
        <h2 className="text-xl font-bold mb-4 text-textdark">Répondre à la demande de devis</h2>

        <div className="overflow-auto max-h-[60vh]">
          <table className="w-full border border-gray-300 text-sm">
            <thead className="bg-[#F0F2F5] sticky top-0">
              <tr>
                <th className="border px-2 py-1 w-8 text-textdark">N°</th>
                <th className="border px-2 py-1 text-textdark">Désignation</th>
                <th className="border px-2 py-1 w-24 text-textdark">Quantité</th>
                <th className="border px-2 py-1 w-32 text-textdark">Prix unitaire (FGN)</th>
                <th className="border px-2 py-1 w-32 text-textdark">Prix total (FGN)</th>
              </tr>
            </thead>
            <tbody>
              {lignes.map((ligne, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-[#FAFBFC]'}>
                  <td className="border px-2 text-center text-textdark">{index + 1}</td>
                  <td className="border px-2">
                    <input
                      type="text"
                      value={ligne.designation}
                      onChange={(e) => handleChange(index, 'designation', e.target.value)}
                      className="w-full border border-[#DADCE0] rounded px-1 py-1 focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="Désignation"
                    />
                  </td>
                  <td className="border px-2">
                    <input
                      type="number"
                      min={0}
                      value={ligne.quantite}
                      onChange={(e) => handleChange(index, 'quantite', e.target.value)}
                      className="w-full border border-[#DADCE0] rounded px-1 py-1 text-right focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </td>
                  <td className="border px-2">
                    <input
                      type="number"
                      min={0}
                      step={0.01}
                      value={ligne.prix_unitaire}
                      onChange={(e) => handleChange(index, 'prix_unitaire', e.target.value)}
                      className="w-full border border-[#DADCE0] rounded px-1 py-1 text-right focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </td>
                  <td className="border px-2 text-right font-semibold text-textdark">
                    {ligne.prix_total.toFixed(2)}
                  </td>
                </tr>
              ))}
              <tr className="bg-[#F0F2F5] font-semibold text-textdark">
                <td colSpan={4} className="text-right px-2 py-2">
                  Total général :
                </td>
                <td className="text-right px-2 py-2">{totalGlobal.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Envoi...' : 'Envoyer le devis'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuoteResponseModal;
