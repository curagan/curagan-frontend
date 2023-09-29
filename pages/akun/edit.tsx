import UserProfileEdit from '@/components/akun/UserProfileEdit';
import { LayoutWrapper } from '@/components/layout/LayoutWrapper';
import { useUser } from '@/hooks/useUser';
import { NextPage } from 'next';

const AccountEdit: NextPage = () => {
  const { user, setUser } = useUser();

  return (
    <LayoutWrapper>
      <UserProfileEdit
        name={user.name}
        email={user.email}
        imageURL={user.imageURL}
        hospital={user.hospital}
        setUser={setUser}
      />
    </LayoutWrapper>
  );
};

export default AccountEdit;
