import { NextPage } from 'next';
import { useUser } from '@/hooks/useUser';
import { LayoutWrapper } from '@/components/layout/LayoutWrapper';
import UserProfile from '@/components/akun/UserProfile';
import UserProfileLoader from '@/components/akun/UserProfileLoader';

const Account: NextPage = () => {
  const { user } = useUser();

  return (
    <LayoutWrapper>
      {!user.name ? (
        <UserProfileLoader />
      ) : (
        <UserProfile
          name={user.name}
          email={user.email}
          imageURL={user.imageURL}
          hospital={user.hospital}
        />
      )}
    </LayoutWrapper>
  );
};

export default Account;
