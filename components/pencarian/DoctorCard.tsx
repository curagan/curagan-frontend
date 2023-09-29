import Link from 'next/link';
import Image from 'next/image';
import imgDoctorAvatar from '@/public/icons/doctor-avatar.png';
import imgLocation from '@/public/icons/location.png';
import { useRouter } from 'next/router';

interface IDoctorCard {
  href: string;
  name: string;
  hospitalName: string;
}

export const DoctorCard = ({ href, name, hospitalName }: IDoctorCard) => {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        if (localStorage.getItem('userId') == null) {
          router.push('/login');
          return;
        } else {
          router.push(href);
        }
      }}
      className="w-full flex gap-2 items-center justify-between p-2 rounded-md bg-slate-100 cursor-pointer"
    >
      <div className="w-20 h-20 flex items-center justify-center rounded-md border">
        <Image src={imgDoctorAvatar} alt={name} className="object-contain" />
      </div>

      <div className="grow flex flex-col justify-between gap-1">
        <div className="line-clamp-2">
          <span className="font-medium line-clamp-1">{name}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 flex items-center justify-center rounded-md">
            <Image
              src={imgLocation}
              alt="location"
              className="object-contain"
            />
          </div>
          <div className="line-clamp-1">
            <span className="text-sm">{hospitalName}</span>
          </div>
        </div>
      </div>

      <span className="min-w-fit p-2 text-sm font-medium rounded-md bg-slate-900 text-white">
        Buat Janji
      </span>
    </div>
  );
};
