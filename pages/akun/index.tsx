import { NextPage } from 'next';
import Button from '@/components/Button';
import { useUser } from '@/hooks/useUser';
import { LayoutWrapper } from '@/components/layout/LayoutWrapper';

const UserAccount: NextPage = () => {
  const { user } = useUser();
  console.log('render', user);

  return (
    <LayoutWrapper>
      <div className="flex flex-col gap-4 px-4 py-4">
        <div className="text-center my-4">
          <img
            className="inline-block h-28 w-28 rounded-full ring-1 ring-neutral-500"
            src={user.imageUrl}
            alt="Profile picture"
          />
        </div>

        <div className="border-b-2 border-neutral-200">
          <div className="mb-2">
            <div>E-Mail:</div>
            <div className="font-bold">{user.email}</div>
          </div>

          <div className="mb-2">
            <div>Name:</div>
            <div className="font-bold">{user.name}</div>
          </div>
        </div>

        <div>
          <Button text="Ganti Password" />
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default UserAccount;
