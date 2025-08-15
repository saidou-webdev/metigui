import React from 'react';
import { Star, User, Calendar } from 'lucide-react';
import { Review } from '../../types';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="bg-light rounded-lg shadow-sm p-4 border border-[#E0E0E0]">
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <div className="bg-[#D7E9FF] rounded-full p-2">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div className="ml-3">
            <p className="font-medium text-textdark">{review.clientName}</p>
            <div className="flex mt-1">{renderStars(review.rating)}</div>
          </div>
        </div>
        <div className="flex items-center text-sm text-secondary">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{new Date(review.created_at).toLocaleDateString('fr-FR')}</span>
        </div>
      </div>
      <p className="mt-3 text-secondary">{review.comment}</p>
    </div>
  );
};

export default ReviewCard;
