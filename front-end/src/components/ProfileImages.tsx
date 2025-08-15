import React, { useRef, useState } from 'react';
import axios from 'axios';

type Role = 'professionnel' | 'client';

interface Props {
  userId: number;
  role: Role;
  initialUrl?: string | null;
  onUploaded?: (url: string) => void;
}

const ProfileImages: React.FC<Props> = ({ userId, role, initialUrl, onUploaded }) => {
  const [preview, setPreview] = useState<string | null>(initialUrl || null);
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setIsUploading(true);

    const form = new FormData();
    form.append('profileImage', file);

    try {
      const url =
        role === 'professionnel'
          ? `http://localhost:5000/api/profile/entreprise/${userId}`
          : `http://localhost:5000/api/profile/client/${userId}`;

      const res = await axios.post(url, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data?.imageUrl) {
        setPreview(res.data.imageUrl);
        onUploaded?.(res.data.imageUrl);
      }
    } catch (err) {
      console.error('Erreur upload:', err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full h-full rounded-full overflow-hidden cursor-pointer" onClick={handleClick}>
      {preview ? (
        <img src={preview} alt="avatar" className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
          U
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
};

export default ProfileImages;
