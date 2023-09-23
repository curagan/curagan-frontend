import { LayoutWrapper } from '@/components/layout/LayoutWrapper';
import { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <LayoutWrapper>
      <div className="flex flex-col gap-4">
        <h1>Home Page</h1>
      </div>
    </LayoutWrapper>
  );
};

export default Home;
