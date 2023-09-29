import React, { useCallback, useRef } from 'react';
import axios from 'axios';
import { FileEdit } from 'lucide-react';
import { APIKEY, CLOUDNAME, UPLOADPRESET } from '@/lib/cloudinary';

interface ImageUploadProps {
  onSuccess: (imageUrl: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onSuccess }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadImage = useCallback(
    async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', UPLOADPRESET);
      formData.append('api_key', APIKEY);

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUDNAME}/image/upload`,
          formData,
        );

        onSuccess(response.data.secure_url);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    },
    [onSuccess],
  );

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      await uploadImage(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <FileEdit
        onClick={handleButtonClick}
        className="cursor-pointer bg-slate-200 hover:bg-slate-400 rounded p-0.5"
      />
    </div>
  );
};

export default ImageUpload;
