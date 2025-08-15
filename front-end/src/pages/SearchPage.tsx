import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, MapPin, Filter } from 'lucide-react';
import { Business } from '../types';
import BusinessCard from '../components/busness/BusinessCard';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import axios from 'axios';

const sectors = [
  { value: '', label: 'Tous les secteurs' },
  { value: 'Électricité', label: 'Électricité' },
  { value: 'Plomberie', label: 'Plomberie' },
  { value: 'Menuiserie', label: 'Menuiserie' },
  { value: 'Peinture', label: 'Peinture' },
  { value: 'Maçonnerie', label: 'Maçonnerie' },
  { value: 'Carrelage', label: 'Carrelage' },
  { value: 'Plâtrerie', label: 'Plâtrerie' },
  { value: 'Ferraillage', label: 'Ferraillage' },
  { value: 'vitrerie', label: 'Vitrerie' },
];

const cities = [
  { value: '', label: 'Toutes les villes' },
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
  { value: 'kankan', label: 'kankan' },
  { value: 'Kérouané', label: 'Kérouané' },
  { value: 'Kouroussa', label: 'Kouroussa' },
  { value: 'Mandiana', label: 'Mandiana' },
  { value: 'Siguiri', label: 'Siguiri' },
  { value: 'Faranah', label: 'Faranah' },
  { value: 'Dabola', label: 'Dabola' },
  { value: 'Dinguiraye', label: 'Dinguiraye' },
  { value: 'Kissidougou', label: 'Kissidougou' },
  { value: 'Nzérékoré', label: ' Nzérékoré ' },
  { value: 'Guéckédou', label: 'Guéckédou' },
  { value: 'Beyla', label: 'Beyla' },
  { value: 'Lola', label: 'Lola' },
  { value: 'Macenta', label: 'Macenta' },
  { value: 'Yomou', label: 'Yomou' },
  { value: 'Autre', label: 'Autre' },
];

const sortOptions = [
  { value: 'rating', label: 'Meilleures notes' },
  { value: 'experience', label: 'Plus d\'expérience' },
  { value: 'name', label: 'Ordre alphabétique' },
];

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [filters, setFilters] = useState({
    query: searchParams.get('query') || '',
    sector: searchParams.get('sector') || '',
    city: searchParams.get('city') || '',
    sortBy: 'rating',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get('http://localhost:5000/api/entreprises')
      .then(res => {
        console.log('Exemple entreprise :', res.data[0]);

        setBusinesses(res.data);
      })
      .catch(err => {
        console.error("Erreur lors du chargement des entreprises :", err);
      });
  }, []);

  useEffect(() => {
    const sector = searchParams.get('sector') || '';
    const city = searchParams.get('city') || '';
    const query = searchParams.get('query') || '';
    setFilters(prev => ({ ...prev, sector, city, query }));
  }, [searchParams]);

  useEffect(() => {
    let result = [...businesses];

    if (filters.query) {
      const searchTerm = filters.query.toLowerCase();
      result = result.filter(business =>
        business.name.toLowerCase().includes(searchTerm) ||
        business.description.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.sector) {
      result = result.filter(business => business.sector === filters.sector);
    }

    if (filters.city) {
      result = result.filter(business => business.city === filters.city);
    }
    

    if (filters.sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (filters.sortBy === 'experience') {
      result.sort((a, b) => b.yearsOfExperience - a.yearsOfExperience);
    } else if (filters.sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredBusinesses(result);
  }, [businesses, filters]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params: Record<string, string> = {};
    if (filters.query) params.query = filters.query;
    if (filters.sector) params.sector = filters.sector;
    if (filters.city) params.city = filters.city;
    setSearchParams(params);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#202124]">Rechercher un professionnel</h1>
          <p className="mt-2 text-gray-700">
            Trouvez le professionnel idéal pour votre projet parmi notre sélection d'artisans qualifiés
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <Input
                  name="query"
                  value={filters.query}
                  onChange={handleFilterChange}
                  placeholder="Rechercher par nom ou mot-clé"
                  className="w-full"
                  icon={<Search className="h-5 w-5 text-gray-400" />}
                />
              </div>
              <div>
                <Select
                  name="sector"
                  value={filters.sector}
                  onChange={handleFilterChange}
                  options={sectors}
                  className="w-full"
                />
              </div>
              <div>
                <Select
                  name="city"
                  value={filters.city}
                  onChange={handleFilterChange}
                  options={cities}
                  className="w-full"
                />
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <button
                type="button"
                onClick={toggleFilter}
                className="text-gray-700 flex items-center text-sm"
              >
                <Filter className="h-4 w-4 mr-1 text-gray-500" />
                Filtres avancés
              </button>

              <Button type="submit" variant="primary">
                <Search className="h-5 w-5 mr-2" />
                Rechercher
              </Button>
            </div>

            {isFilterOpen && (
              <div className="mt-4 pt-4 border-t border-gray-300">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Select
                      label="Trier par"
                      name="sortBy"
                      value={filters.sortBy}
                      onChange={handleFilterChange}
                      options={sortOptions}
                    />
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>

        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-700">
            {filteredBusinesses.length} résultat{filteredBusinesses.length !== 1 ? 's' : ''} trouvé{filteredBusinesses.length !== 1 ? 's' : ''}
          </p>
        </div>

        {filteredBusinesses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBusinesses.map(business => (
              <BusinessCard key={business.id} business={business} featured={business.featured} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-[#202124] mb-2">Aucun résultat trouvé</h3>
            <p className="text-gray-700">
              Essayez de modifier vos critères de recherche pour trouver des professionnels correspondant à votre demande.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
