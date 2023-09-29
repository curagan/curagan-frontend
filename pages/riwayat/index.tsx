import { LayoutWrapper } from '@/components/layout/LayoutWrapper';
import { Filters } from '@/components/riwayat/Filters';
import HistoryList from '@/components/riwayat/HistoryList';
import { Title } from '@/components/riwayat/Title';
import { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <LayoutWrapper>
      <div className="w-full flex flex-col gap-4 p-3 pb-0 ">
        <Title />
        <Filters />
        <HistoryList />
      </div>
    </LayoutWrapper>
  );
};

export default Home;
