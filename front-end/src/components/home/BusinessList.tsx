// src/components/BusinessList.tsx

import { useEffect, useState } from 'react';
import axios from 'axios';

interface Business {
  id: string;
  name: string;
  sector: string;
  phone: string;
  description: string;
  city: string;
  district: string;
  yearsOfExperience: number;
}

const BusinessList = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/entreprises')
      .then((res) => {
        setBusinesses(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erreur de chargement des entreprises :', err);
        setError("Impossible de charger les entreprises pour le moment.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement des entreprises...</p>;
  if (error) return <p className="text-orangedark">{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {businesses.map((biz) => (
        <div
          key={biz.id}
          className="bg-light shadow-md p-4 rounded-lg border border-graylight"
        >
          <h2 className="text-xl font-bold mb-2">{biz.name}</h2>
          <p className="text-sm text-textsecondary mb-1">{biz.sector}</p>
          <p className="text-sm text-textsecondary mb-1">
            {biz.city}, {biz.district}
          </p>
          <p className="text-sm text-textsecondary mb-1">📞 {biz.phone}</p>
          <p className="text-sm text-textdark mt-2">{biz.description}</p>
          <p className="text-sm text-textsecondary mt-1">
            {biz.yearsOfExperience} ans d'expérience
          </p>
        </div>
      ))}
    </div>
  );
};

export default BusinessList;
