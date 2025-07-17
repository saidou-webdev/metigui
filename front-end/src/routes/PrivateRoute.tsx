// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// interface PrivateRouteProps {
//   children: JSX.Element;
// }

// const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
//   const { isAuthenticated, isLoading } = useAuth();

//   if (isLoading) {
//     return <div className="text-center mt-10">Chargement...</div>; // ou un spinner
//   }

//   // return isAuthenticated ? children : <Navigate to="/login" />;
// };

// export default PrivateRoute;
