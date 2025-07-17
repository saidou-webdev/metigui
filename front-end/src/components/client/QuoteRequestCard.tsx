import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { QuoteRequest } from '../../types';
import Button from '../ui/Button';

interface QuoteRequestCardProps {
  quoteRequest: QuoteRequest;
  businessView?: boolean;
  onViewResponse?: (id: number) => void;
  onRefuse?: (id: number) => void;
  onRespond?: (id: number) => void;
  onCancel?: (id: number) => void;
}

const QuoteRequestCard: React.FC<QuoteRequestCardProps> = ({
  quoteRequest,
  businessView = false,
  onViewResponse,
  onRefuse,
  onRespond,
  onCancel,
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="bg-warning text-textdark text-xs font-medium px-2.5 py-0.5 rounded">
            En attente
          </span>
        );
      case 'responded':
        return (
          <span className="bg-accentblue/10 text-accentblue text-xs font-medium px-2.5 py-0.5 rounded">
            Répondu
          </span>
        );
      case 'refused':
        return (
          <span className="bg-orangedark/10 text-orangedark text-xs font-medium px-2.5 py-0.5 rounded">
            Refusé
          </span>
        );
      case 'cancelled':
        return (
          <span className="bg-graylight text-textdark text-xs font-medium px-2.5 py-0.5 rounded">
            Annulé
          </span>
        );
      case 'completed':
        return (
          <span className="bg-secondary/10 text-secondary text-xs font-medium px-2.5 py-0.5 rounded">
            Terminé
          </span>
        );
      default:
        return null;
    }
  };

  const getStatusText = () => {
    switch (quoteRequest.status) {
      case 'pending':
        return 'En attente de réponse';
      case 'responded':
        return 'Réponse reçue';
      case 'refused':
        return 'Refusé';
      case 'cancelled':
        return 'Annulé par le client';
      case 'completed':
        return 'Terminé';
      default:
        return '';
    }
  };

  return (
    <div className="bg-light rounded-lg shadow-md p-5 border border-graylight">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center">
            <h3 className="text-lg font-semibold text-textdark mr-3">
              {businessView ? `Demande de ${quoteRequest.clientName}` : 'Demande de devis'}
            </h3>
            {getStatusBadge(quoteRequest.status)}
          </div>
          <div className="flex items-center mt-2 text-sm text-textsecondary">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Créée le {new Date(quoteRequest.createdAt).toLocaleDateString('fr-FR')}</span>
          </div>
        </div>
        <div className="flex items-center text-sm text-textsecondary">
          <Clock className="h-4 w-4 mr-1" />
          <span>{getStatusText()}</span>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-textdark whitespace-pre-line">{quoteRequest.description}</p>
      </div>

      <div className="mt-5 flex justify-end space-x-3">
        {businessView && quoteRequest.status === 'pending' && (
          <>
            <Button
              variant="outline"
              onClick={() => onRefuse && onRefuse(quoteRequest.id)}
            >
              Refuser
            </Button>
            <Button
              variant="primary"
              onClick={() => onRespond && onRespond(quoteRequest.id)}
            >
              Répondre
            </Button>
          </>
        )}

        {!businessView && quoteRequest.status === 'responded' && (
          <Button
            variant="primary"
            onClick={() => onViewResponse && onViewResponse(quoteRequest.id)}
          >
            Voir la réponse
          </Button>
        )}

        {!businessView && quoteRequest.status === 'pending' && (
          <Button
            variant="outline"
            onClick={() => onCancel && onCancel(quoteRequest.id)}
          >
            Annuler la demande
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuoteRequestCard;
