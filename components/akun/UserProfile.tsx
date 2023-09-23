import Button from '../Button';
import { FileEdit } from 'lucide-react';

interface UserProfileProps {
  name: string;
  email: string;
  imageUrl: string;
}

const UserProfile = ({ name, email, imageUrl }: UserProfileProps) => {
  const editButton = () => {};

  return (
    <div className="flex flex-col gap-4 px-4 py-4">
      <div className="text-center my-4">
        <img
          className="inline-block h-28 w-28 rounded-full ring-1 ring-neutral-500"
          src={imageUrl}
          alt="Profile picture"
        />
      </div>

      <div className="border-b-2 border-neutral-200">
        <div className="mb-2">
          <div>E-Mail:</div>
          <div className="font-bold">{email}</div>
        </div>

        <div className="mb-2">
          <div>Name:</div>
          <div className="flex gap-2">
            <div className="font-bold">{name}</div>
            <FileEdit
              onClick={editButton}
              className="cursor-pointer hover:bg-slate-200"
            />
          </div>
        </div>
      </div>

      <div>
        <Button text="Ganti Password" />
      </div>
    </div>
  );
};

export default UserProfile;
