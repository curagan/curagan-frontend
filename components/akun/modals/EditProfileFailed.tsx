import Link from 'next/link';
import { XCircle } from 'lucide-react';

export const EditProfileFailed = () => {
  return (
    <div className="absolute w-[95%] h-[97%] flex items-center justify-center p-2 rounded-sm bg-slate-900 bg-opacity-50">
      <div className="w-full h-[50%] flex flex-col items-center justify-evenly p-3 gap-5 rounded-md bg-gray-50">
        <div className="w-28 h-28 p-1 text-center">
          <XCircle size={112} color="#e94949" />
        </div>

        <div className="w-4/5 flex flex-col items-center gap-2 text-center">
          <span className="text-xl font-medium">Oops!</span>
          <p className="text-md text-gray-700">
            Maaf, terjadi kesalahan saat mencoba ubah data. Silakan coba lagi
            nanti.
          </p>
        </div>

        <Link
          href={'/akun'}
          className="w-full p-3 flex justify-center rounded-md text-lg font-medium text-center text-white bg-[#e94949]"
        >
          <span>Kembali ke Akun</span>
        </Link>
      </div>
    </div>
  );
};
