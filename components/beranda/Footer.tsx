import Image from 'next/image';
import imgLogo from '@/public/icons/logo.png';

export const Footer = () => {
  return (
    <footer className="w-full flex flex-col items-center gap-2 p-3 text-center rounded-t-md bg-slate-200">
      <div className="w-full flex items-center justify-center p-2 gap-2">
        <Image
          src={imgLogo}
          alt="curagan logo"
          className="w-12 object-contain"
        />
        <span className="text-2xl font-bold text-[#13629D]">Curagan</span>
      </div>
      <span className="text-sm text-gray-500">
        © Curagan 2023, ALL RIGHTS RESERVED
      </span>
    </footer>
  );
};
