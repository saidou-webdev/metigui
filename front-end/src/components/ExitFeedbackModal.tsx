// import React, { useState, useEffect } from 'react';

// interface ExitFeedbackModalProps {
//   onClose: () => void;
//   onSubmit: (feedback: string, rating: number) => void;
// }

// const ExitFeedbackModal: React.FC<ExitFeedbackModalProps> = ({ onClose, onSubmit }) => {
//   const [feedback, setFeedback] = useState('');
//   const [rating, setRating] = useState(5);
//   const [submitted, setSubmitted] = useState(false);

//   const handleSubmit = () => {
//     onSubmit(feedback, rating);
//     setSubmitted(true);
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
//         {submitted ? (
//           <div className="text-center">
//             <h2 className="text-xl font-bold mb-4">Merci pour votre avis ! 🙏</h2>
//             <button
//               onClick={onClose}
//               className="mt-4 px-4 py-2 bg-[#D35400] text-white rounded hover:bg-[#B34700]"
//             >
//               Fermer
//             </button>
//           </div>
//         ) : (
//           <>
//             <h2 className="text-xl font-bold mb-4">Avant de partir, donnez-nous votre avis !</h2>
//             <textarea
//               className="w-full border border-gray-300 rounded p-2 mb-4 resize-none"
//               rows={4}
//               placeholder="Votre avis..."
//               value={feedback}
//               onChange={(e) => setFeedback(e.target.value)}
//             />
//             <div className="mb-4">
//               <label className="block mb-1 font-semibold">Note :</label>
//               <select
//                 value={rating}
//                 onChange={(e) => setRating(Number(e.target.value))}
//                 className="border border-gray-300 rounded p-2 w-full"
//               >
//                 {[5, 4, 3, 2, 1].map((star) => (
//                   <option key={star} value={star}>
//                     {star} étoile{star > 1 ? 's' : ''}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="flex justify-end space-x-2">
//               <button
//                 onClick={onClose}
//                 className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
//               >
//                 Annuler
//               </button>
//               <button
//                 onClick={handleSubmit}
//                 className="px-4 py-2 bg-[#D35400] text-white rounded hover:bg-[#B34700]"
//                 disabled={feedback.trim() === ''}
//               >
//                 Envoyer
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ExitFeedbackModal;
