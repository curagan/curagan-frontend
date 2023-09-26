import { SearchBar } from '@/components/SearchBar';
import { DoctorList } from '@/components/beranda/DoctorList';
import { Footer } from '@/components/beranda/Footer';
import { HeroCard } from '@/components/beranda/HeroCard';
import { InformationCard } from '@/components/beranda/InformationCard';
import { LayoutWrapper } from '@/components/layout/LayoutWrapper';
import { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <LayoutWrapper>
      <div className="w-full flex flex-col gap-4 p-3 pb-0">
        <SearchBar />
        <HeroCard />
        <DoctorList />
        <InformationCard />
        <Footer />
      </div>
    </LayoutWrapper>
  );
};

export default Home;
