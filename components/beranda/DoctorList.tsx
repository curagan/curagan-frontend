import { API_DOCTOR } from '@/lib/ApiLinks';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';
import imgDoctorAvatar from '@/public/icons/doctor-avatar.png';
import { LoadingCard } from '../LoadingCard';
import { useRouter } from 'next/router';

interface IDoctorDetails {
  id: string;
  email: string;
  specialization: string;
  name: string;
  role: string;
  imageURL: string;
  location: string;
  hospital: string;
  schedule: null | any;
}

export const DoctorList = () => {
  const router = useRouter();
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, isLoading, error } = useSWR(API_DOCTOR, fetcher);

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="font-medium">Dokter yang Tersedia</h2>
          <p className="text-sm text-gray-500">
            Berbagai pilihan dokter yang siap melayani
          </p>
        </div>
        <Link
          href={'/pencarian'}
          className="w-fit px-2 py-1 rounded text-sm bg-[#13629D] text-white"
        >
          Lihat Semua
        </Link>
      </div>

      <div className="overflow-x-auto overflow-y-clip">
        <div className="min-w-max max-w-[970px] h-20 flex flex-wrap items-start gap-3">
          {isLoading ? (
            <LoadingCard />
          ) : (
            data.map((doctor: IDoctorDetails) => (
              <button
                key={doctor.id}
                onClick={() => {
                  if (localStorage.getItem('userId') == null) {
                    router.push('/login');
                    return;
                  } else {
                    router.push(`/appointment/${doctor.id}`);
                  }
                }}
                className="w-[230px] h-[78px] flex items-center gap-3 p-2 border rounded-md"
              >
                <div className="w-14 h-14 p-1">
                  <Image
                    src={imgDoctorAvatar}
                    alt={doctor.name}
                    className="object-contain"
                  />
                </div>

                <span className="w-3/5 line-clamp-2 text-sm text-left">
                  {doctor.name}
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
