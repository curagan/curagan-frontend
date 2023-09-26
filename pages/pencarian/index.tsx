import { SearchBar } from '@/components/SearchBar';
import { LayoutWrapper } from '@/components/layout/LayoutWrapper';
import { DoctorCard } from '@/components/pencarian/DoctorCard';
import { NextPage } from 'next';

const Pencarian: NextPage = () => {
  return (
    <LayoutWrapper>
      <div className="w-full flex flex-col gap-4 p-3 pb-0">
        <SearchBar />

        <div className="w-full flex flex-col gap-3">
          <DoctorCard
            href="/appointment/abc12345"
            name="Dr. Chandra Megah"
            hospitalName="Karang Tengah Medika Hospital"
          />
          <DoctorCard
            href="/appointment/efg6789"
            name="Dr. Viska Anastashia"
            hospitalName="RS Murni Teguh"
          />
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default Pencarian;
