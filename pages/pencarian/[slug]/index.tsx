import { SearchBar } from '@/components/SearchBar';
import { LayoutWrapper } from '@/components/layout/LayoutWrapper';
import { DoctorCard } from '@/components/pencarian/DoctorCard';
import { NextPage } from 'next';
import axios from 'axios';
import useSWR from 'swr';
import { API_DOCTOR } from '@/lib/ApiLinks';
import { useRouter } from 'next/router';

const Pencarian: NextPage = () => {
  const router = useRouter();
  const query = router.query.slug as string;
  const param = query !== undefined ? query.replace(' ', '%20') : '';

  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, isLoading, error } = useSWR(
    `${API_DOCTOR}/query?name=${param}`,
    fetcher,
  );

  return (
    <LayoutWrapper>
      <div className="w-full flex flex-col gap-4 p-3 pb-0">
        <SearchBar />

        <span className="font-medium">{`Hasil pencarian: ${query}`}</span>

        <div className="w-full flex flex-col gap-3">
          {isLoading ? (
            <div className="w-full flex flex-col gap-2 items-center justify-center p-2 rounded-md text-center bg-slate-100">
              <span className="text-lg font-medium">Diproses...</span>
            </div>
          ) : data == undefined || data.length == 0 ? (
            <div className="w-full flex flex-col gap-2 items-center justify-center p-2 rounded-md text-center bg-slate-100">
              <span className="text-lg font-medium">
                Pencarian tidak ditemukan
              </span>
              <span className="text-sm">Silahkan coba lagi</span>
            </div>
          ) : (
            data.map((doctor: any) => (
              <DoctorCard
                key={doctor.id}
                href={`/appointment/${doctor.id}`}
                name={doctor.name}
                hospitalName={doctor.hospital}
              />
            ))
          )}
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default Pencarian;
