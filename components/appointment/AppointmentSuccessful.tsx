import Link from 'next/link';
import Image from 'next/image';
import imgAppointmentSuccess from '@/public/icons/appointment-success.png';

export const AppointmentSuccessful = () => {
  return (
    <div className="absolute w-[95%] h-[97%] flex items-center justify-center p-2 rounded-sm bg-slate-900 bg-opacity-50">
      <div className="w-full h-2/3 flex flex-col items-center justify-evenly p-3 gap-5 rounded-md bg-gray-50">
        <div className="w-28 h-28 p-1">
          <Image
            src={imgAppointmentSuccess}
            alt="Appointment success"
            className="object-contain"
          />
        </div>

        <div className="w-4/5 flex flex-col items-center gap-2 text-center">
          <span className="text-xl font-medium">
            Appointment Anda telah berhasil dibuat
          </span>
          <p className="text-sm text-gray-700">
            Dokter yang bersangkutan akan memproses permintaan anda. Mohon cek
            status appointment anda secara berkala di Riwayat Konsultasi.
          </p>
        </div>

        <Link
          href={'/beranda'}
          className="w-full p-3 flex justify-center rounded-md text-lg font-medium text-center text-white bg-[#13629D]"
        >
          <span>Kembali ke Beranda</span>
        </Link>
      </div>
    </div>
  );
};
