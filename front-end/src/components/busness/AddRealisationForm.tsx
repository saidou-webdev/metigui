import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const AddRealisationForm: React.FC = () => {
  const { currentUser } = useAuth();
  const [files, setFiles] = useState<FileList | null>(null);
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!files || files.length === 0) {
      setError('Veuillez sélectionner au moins une image.');
      return;
    }

    if (!currentUser || !['professionnel', 'business'].includes(currentUser.role)) {
      setError('Utilisateur non autorisé.');
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }

    formData.append('description', description);
    formData.append('businessId', currentUser.id.toString());

    try {
      setIsSubmitting(true);
      await axios.post( 'http://localhost:5000/api/realisations/upload',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      setSuccessMsg('✅ Réalisation publiée avec succès !');
      setFiles(null);
      setDescription('');
    } catch (err) {
      setError("❌ Erreur lors de la publication.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto mt-6 p-6 bg-light rounded-lg shadow-md"
    >
      <h2 className="text-xl font-bold mb-4 text-textdark">Ajouter une nouvelle réalisation</h2>

      <label className="block mb-2 font-medium text-textdark">
        Sélectionnez des images (maximum 5)
      </label>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="block w-full mb-4 border border-graylight rounded"
      />

      <label className="block mb-2 font-medium text-textdark">
        Description
      </label>
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        rows={4}
        className="w-full border border-graylight rounded p-3 mb-4 text-textdark"
        placeholder="Décrivez votre réalisation..."
      />

      {error && <p className="text-orangedark mb-4">{error}</p>}
      {successMsg && <p className="text-secondary mb-4">{successMsg}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 disabled:opacity-50"
      >
        {isSubmitting ? 'Publication en cours...' : 'Publier'}
      </button>
    </form>
  );
};

export default AddRealisationForm;
