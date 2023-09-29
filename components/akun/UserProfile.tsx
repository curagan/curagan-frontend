import { useRouter } from 'next/router';
import avatar from '@/public/icons/avatar.png';
import { useState } from 'react';
import { User2 } from 'lucide-react';

interface UserProfileProps {
  name: string;
  email: string;
  imageURL: string;
  hospital?: string;
}

const UserProfile = ({ name, email, imageURL, hospital }: UserProfileProps) => {
  const router = useRouter();

  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="flex flex-col gap-4 px-4 py-4">
      <div className="text-center my-4">
        {imageError ? (
          <User2
            className="inline-block h-28 w-28 rounded-full ring-1 ring-neutral-500"
            color="#737373"
          />
        ) : (
          <img
            className="inline-block h-28 w-28 rounded-full ring-1 ring-neutral-500"
            src={imageURL}
            alt="Profile picture"
            onError={handleImageError}
          />
        )}
      </div>

      <div className="border-b-2 border-neutral-200">
        <div className="mb-2">
          <div>E-Mail:</div>
          <div className="font-bold">{email}</div>
        </div>

        <div className="mb-2">
          <div>Nama:</div>
          <div className="font-bold">{name}</div>
          {/* <FileEdit
              onClick={() => {
                router.push('/akun/edit');
              }}
              className="cursor-pointer hover:bg-slate-200"
            /> */}
        </div>

        {hospital && (
          <div className="mb-2">
            <div>Rumah Sakit:</div>
            <div className="font-bold">{hospital}</div>
          </div>
        )}
      </div>

      <div>
        <button
          onClick={() => {
            router.push('/akun/edit');
          }}
          className="w-28 h-8 bg-blue-500 hover:bg-blue-700 rounded-[3px] text-white mr-2"
        >
          Ubah Profil
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
