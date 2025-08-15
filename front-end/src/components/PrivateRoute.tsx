// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// interface PrivateRouteProps {
//   children: JSX.Element;
//   requiredRole?: 'client' | 'business';
// }

// const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, requiredRole }) => {
//   const { isAuthenticated, isLoading, currentUser } = useAuth();

//   if (isLoading) return <div>Chargement...</div>;

//   if (!isAuthenticated) return <Navigate to="/login" replace />;

//   if (requiredRole && currentUser?.role !== requiredRole) {
//     // L'utilisateur est connecté mais pas autorisé à accéder ici
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

// export default PrivateRoute;
