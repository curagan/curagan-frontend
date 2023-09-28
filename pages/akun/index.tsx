import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useUser } from '@/hooks/useUser';
import { LayoutWrapper } from '@/components/layout/LayoutWrapper';
import UserProfile from '@/components/akun/UserProfile';
import UserProfileLoader from '@/components/akun/UserProfileLoader';

const Account: NextPage = () => {
  const { user } = useUser();
  const router = useRouter();

  // if (!user.isAuthenticated) {
  //   alert('Silahkan login terlebih dahulu');
  //   router.push('/login');
  //   console.log('testeror');
  // }

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
