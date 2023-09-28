import { LayoutLink } from './LayoutLink';
import Image from 'next/image';
import imgLogo from '@/public/icons/logo.png';
import imgHome from '@/public/icons/home.png';
import imgSearch from '@/public/icons/search.png';
import imgAppointment from '@/public/icons/appointment-history.png';
import imgAccount from '@/public/icons/avatar.png';
import { LayoutMenu } from './LayoutMenu';
import { useState } from 'react';
import Link from 'next/link';

export const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const [displayMenu, setDisplayMenu] = useState(false);

  return (
    <div className="absolute w-full h-full flex flex-col items-center">
      <header className="w-full flex items-center justify-center bg-slate-200">
        <Link
          href={'/beranda'}
          className="w-full max-w-md flex items-center justify-center p-2 gap-2"
        >
          <Image
            src={imgLogo}
            alt="curagan logo"
            className="w-12 object-contain"
          />
          <span className="text-2xl font-bold text-[#13629D]">Curagan</span>
        </Link>
      </header>

      <main className="grow w-full max-w-md max-h-full overflow-y-auto">
        {children}
      </main>

      <footer className="w-full flex items-center justify-center bg-slate-200">
        {displayMenu ? <LayoutMenu /> : ''}

        <nav className="relative w-full max-w-md flex items-stretch justify-between text-sm text-center overflow-x-auto text-[#13629D]">
          <LayoutLink name="Beranda" href="/beranda" src={imgHome} />
          <LayoutLink name="Pencarian" href="/pencarian" src={imgSearch} />
          <LayoutLink
            name="Riwayat Konsultasi"
            href="/riwayat"
            src={imgAppointment}
          />

          {/* Menu button */}
          <button
            onClick={() => setDisplayMenu((prev) => !prev)}
            className="w-[78px] max-w-[78px] flex flex-col items-center justify-start gap-1 p-2 hover:bg-slate-300 transition-all"
          >
            <div className="w-10 h-10 rounded-full">
              <Image src={imgAccount} alt={'menu'} className="object-contain" />
            </div>
            <span>Menu</span>
          </button>
        </nav>
      </footer>
    </div>
  );
};
