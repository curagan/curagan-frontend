import Link from 'next/link';
import React from 'react';

interface IDoctorCard {
  href: string;
  name: string;
  hospitalName: string;
}

export const DoctorCard = ({ href, name, hospitalName }: IDoctorCard) => {
  return (
    <Link
      href={href}
      className="w-full flex gap-2 items-center justify-between p-2 rounded-md bg-slate-100"
    >
      <div className="min-w-fit w-20 h-20 rounded-md bg-slate-400"></div>

      <div className="grow flex flex-col justify-between gap-1">
        <div className="line-clamp-2">
          <span className="font-medium line-clamp-1">{name}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="min-w-fit w-5 h-5 rounded-md bg-slate-400"></div>
          <div className="line-clamp-1">
            <span className="text-sm">{hospitalName}</span>
          </div>
        </div>
      </div>

      <span className="min-w-fit p-2 text-sm font-medium rounded-md bg-slate-900 text-white">
        Buat Janji
      </span>
    </Link>
  );
};
