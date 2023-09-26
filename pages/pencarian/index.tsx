import { SearchBar } from '@/components/SearchBar';
import { LayoutWrapper } from '@/components/layout/LayoutWrapper';
import { NextPage } from 'next';
import Link from 'next/link';

const Pencarian: NextPage = () => {
  return (
    <LayoutWrapper>
      <div className="w-full flex flex-col gap-4 p-3 pb-0">
        <SearchBar />

        <div className="w-full flex flex-col gap-3">
          <Link
            href={'/appointment/abc12345'}
            className="w-full flex gap-2 items-center justify-between p-2 rounded-md bg-slate-100"
          >
            <div className="min-w-fit w-20 h-20 rounded-md bg-slate-400"></div>
            <div className="grow flex flex-col justify-between gap-1">
              <div className="line-clamp-2">
                <span className="font-medium line-clamp-1">
                  Dr. Chandra Megah
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="min-w-fit w-5 h-5 rounded-md bg-slate-400"></div>
                <div className="line-clamp-1">
                  <span className="text-sm">Karang Tengah Medika Hospital</span>
                </div>
              </div>
            </div>
            <span className="min-w-fit p-2 text-sm font-medium rounded-md bg-slate-900 text-white">
              Buat Janji
            </span>
          </Link>

          <Link
            href={'/appointment/efg6789'}
            className="w-full flex gap-2 items-center justify-between p-2 rounded-md bg-slate-100"
          >
            <div className="min-w-fit w-20 h-20 rounded-md bg-slate-400"></div>
            <div className="grow flex flex-col justify-between gap-1">
              <div className="line-clamp-2">
                <span className="font-medium line-clamp-1">
                  Dr. Chandra Megah
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="min-w-fit w-5 h-5 rounded-md bg-slate-400"></div>
                <div className="line-clamp-1">
                  <span className="text-sm">Karang Tengah Medika Hospital</span>
                </div>
              </div>
            </div>
            <span className="min-w-fit p-2 text-sm font-medium rounded-md bg-slate-900 text-white">
              Buat Janji
            </span>
          </Link>
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default Pencarian;
