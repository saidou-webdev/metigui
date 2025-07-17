import React from 'react';
import Button from '../ui/Button';

interface LigneDevis {
  designation: string;
  quantite: number;
  prix_unitaire: number;
  prix_total: number;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  lignes: LigneDevis[];
}

const QuoteViewResponseModal: React.FC<Props> = ({ isOpen, onClose, lignes }) => {
  if (!isOpen) return null;

  const total = lignes.reduce((sum, l) => sum + l.prix_total, 0);

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        className="bg-light w-full max-w-4xl rounded-lg shadow-lg p-6 max-h-[90vh] overflow-y-auto"
        tabIndex={-1}
      >
        <h2 id="modal-title" className="text-2xl font-bold mb-6 text-textdark">
          Réponse au devis
        </h2>

        {lignes.length > 0 ? (
          <table className="w-full border border-graylight text-sm">
            <thead className="bg-graylight sticky top-0 z-10">
              <tr>
                <th className="border border-graylight px-3 py-2 w-10 text-center font-semibold text-textdark">#</th>
                <th className="border border-graylight px-3 py-2 text-left font-semibold text-textdark">Désignation</th>
                <th className="border border-graylight px-3 py-2 w-24 text-center font-semibold text-textdark">Quantité</th>
                <th className="border border-graylight px-3 py-2 w-32 text-right font-semibold text-textdark">Prix unitaire</th>
                <th className="border border-graylight px-3 py-2 w-32 text-right font-semibold text-textdark">Prix total</th>
              </tr>
            </thead>
            <tbody>
              {lignes.map((ligne, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? 'bg-light' : 'bg-graylight'}
                >
                  <td className="border border-graylight px-3 py-2 text-center text-textdark">{index + 1}</td>
                  <td className="border border-graylight px-3 py-2 text-textdark">{ligne.designation}</td>
                  <td className="border border-graylight px-3 py-2 text-center text-textdark">{ligne.quantite}</td>
                  <td className="border border-graylight px-3 py-2 text-right text-textdark">
                    {ligne.prix_unitaire.toFixed(2)} FGN
                  </td>
                  <td className="border border-graylight px-3 py-2 text-right text-textdark">
                    {ligne.prix_total.toFixed(2)} FGN
                  </td>
                </tr>
              ))}
              <tr className="bg-graylight font-semibold text-textdark">
                <td colSpan={4} className="text-right px-3 py-3 border border-graylight">
                  Total général :
                </td>
                <td className="text-right px-3 py-3 border border-graylight">{total.toFixed(2)} FGN</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p id="modal-description" className="text-textsecondary text-center py-8">
            Aucune ligne de devis reçue.
          </p>
        )}

        <div className="mt-8 flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Fermer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuoteViewResponseModal;
