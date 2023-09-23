import Link from 'next/link';
import React from 'react';
import { LayoutLink } from './LayoutLink';

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
          <LayoutLink name="Beranda" href="/beranda" />
          <LayoutLink name="Pencarian" href="/pencarian" />
          <LayoutLink name="Riwayat Konsultasi" href="/riwayat" />
          <LayoutLink name="Akun" href="/akun" />
        </nav>
      </footer>
    </div>
  );
};
