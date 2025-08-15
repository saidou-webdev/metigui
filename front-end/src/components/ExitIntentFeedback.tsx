// import React, { useState, useEffect } from 'react';
// import ExitFeedbackModal from './ExitFeedbackModal';

// const ExitIntentFeedback: React.FC = () => {
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       if (e.clientY < 50 && !showModal) {
//         setShowModal(true);
//       }
//     };

//     window.addEventListener('mousemove', handleMouseMove);

//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//     };
//   }, [showModal]);

//   const handleClose = () => setShowModal(false);

//   const handleSubmit = (feedback: string, rating: number) => {
//     // Ici tu peux envoyer les données vers ton backend via fetch ou axios
//     console.log('Avis reçu:', { feedback, rating });

//     // Par exemple, POST vers API:
//     // axios.post('/api/feedback', { feedback, rating });

//     // Tu peux fermer le modal ou afficher un message
//     setShowModal(false);
//   };

//   return (
//     <>
//       {showModal && <ExitFeedbackModal onClose={handleClose} onSubmit={handleSubmit} />}
//     </>
//   );
// };

// export default ExitIntentFeedback;
