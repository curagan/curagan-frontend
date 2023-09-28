import Image from 'next/image';
import imgDoctorAvatar from '@/public/icons/doctor-avatar.png';
import imgLocation from '@/public/icons/location.png';

interface IDoctorAppointmentCard {
  name: string;
  hospital: string;
  location: string;
}

export const DoctorAppointmentCard = ({
  name,
  hospital,
  location,
}: IDoctorAppointmentCard) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <span className="font-medium">Dokter Anda</span>

      <div className="w-full flex gap-2 items-center justify-between p-2 rounded-md bg-slate-100">
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
              <span className="text-sm">{`${hospital}, ${location}`}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
