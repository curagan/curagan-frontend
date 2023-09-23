import Link from 'next/link';
import React from 'react';

export const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="absolute w-full h-full flex flex-col items-center">
      <header className="w-full flex items-center justify-center bg-[#11A0FE]">
        <div className="w-full max-w-md flex items-center justify-center p-2">
          <span className="text-3xl">LOGO</span>
        </div>
      </header>

      <main className="grow w-full max-w-md max-h-full overflow-y-auto">
        {children}
      </main>

      <footer className="w-full flex items-center justify-center bg-[#B3E1FF]">
        <nav className="relative w-full max-w-md flex items-stretch justify-between text-sm overflow-x-auto">
          <Link
            href={'/beranda'}
            className="w-[78px] max-w-[78px] flex flex-col items-center justify-start gap-1 p-2"
          >
            <div className="w-12 h-12 rounded-full bg-slate-500"></div>
            <span>Beranda</span>
          </Link>
          <Link
            href={'/pencarian'}
            className="w-[78px] max-w-[78px] flex flex-col items-center justify-start gap-1 p-2"
          >
            <div className="w-12 h-12 rounded-full bg-slate-500"></div>
            <span>Pencarian</span>
          </Link>
          <Link
            href={'/riwayat'}
            className="w-[78px] max-w-[78px] flex flex-col items-center justify-start gap-1 p-2"
          >
            <div className="w-12 h-12 rounded-full bg-slate-500"></div>
            <span>Riwayat Konsultasi</span>
          </Link>
          <Link
            href={'/akun'}
            className="w-[78px] max-w-[78px] flex flex-col items-center justify-start gap-1 p-2"
          >
            <div className="w-12 h-12 rounded-full bg-slate-500"></div>
            <span>Akun</span>
          </Link>
        </nav>
      </footer>
    </div>
  );
};
