import React, { useState } from 'react';
import axios from 'axios';
import Button from '../ui/Button';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  realisation: any;
  onSuccess: () => void;
}

const EditRealisationModal: React.FC<EditModalProps> = ({ isOpen, onClose, realisation, onSuccess }) => {
  const [description, setDescription] = useState(realisation.description);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('description', description);
    if (image) formData.append('image', image);

    try {
      await axios.put(`http://localhost:5000/api/realisations/${realisation.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Erreur mise à jour réalisation:", err);
      alert("Erreur lors de la mise à jour");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Modifier la réalisation</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              className="w-full border rounded px-3 py-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Nouvelle image (facultatif)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="ghost" onClick={onClose}>Annuler</Button>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRealisationModal;