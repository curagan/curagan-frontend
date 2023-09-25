import { LayoutWrapper } from '@/components/layout/LayoutWrapper';
import { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <LayoutWrapper>
      <div className="w-full flex flex-col gap-4 p-3 pb-0">
        {/* Searchbar */}
        <form className="w-full">
          <label htmlFor="searchBar" className="sr-only">
            Cari dokter atau spesialisasi
          </label>
          <div className="relative flex items-center">
            <div className="absolute h-6 w-6 rounded-full bg-slate-600 translate-x-3"></div>
            <input
              type="text"
              name="searchBar"
              placeholder="Cari dokter atau spesialisasi"
              className="w-full pl-11 pr-3 py-2 rounded-full border border-gray-900"
            />
          </div>
        </form>

        {/* Hero Card */}
        <div className="w-full flex flex-col gap-4 p-3 rounded-md bg-slate-900 text-white">
          <h2 className="text-xl font-medium">Jagalah Kesehatan Anda</h2>
          <p className="w-4/5 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
            sapiente natus modi quae.
          </p>
          <button className="w-full rounded-md p-2 mt-9 text-lg bg-[#13629D] bg-opacity-80 hover:bg-opacity-100">
            Buat Appointment
          </button>
        </div>

        {/* Doctor List */}
        <div className="w-full flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <h2 className="font-medium">Dokter yang Tersedia</h2>
              <p className="text-sm text-gray-500">
                Berbagai pilihan dokter yang siap melayani
              </p>
            </div>
            <button className="w-fit px-2 py-1 rounded text-sm bg-blue-600 text-white">
              Lihat Semua
            </button>
          </div>

          <div className="overflow-x-auto overflow-y-clip">
            <div className="min-w-full w-[1000px] h-44 flex flex-wrap items-start gap-3">
              <div className="w-[230px] h-[78px] flex items-center gap-3 p-2 border rounded-md">
                <div className="w-14 h-14 min-w-fit rounded-full bg-gray-600"></div>
                <span className="w-3/5 line-clamp-2 text-sm">
                  Dr. Viska Anastashia
                </span>
              </div>
              <div className="w-[230px] h-[78px] flex items-center gap-2 p-2 border rounded-md">
                <div className="w-14 h-14 min-w-fit rounded-full bg-gray-600"></div>
                <span className="w-3/5 line-clamp-2 text-sm">
                  Dr. Viska Anastashia Dadwraed
                </span>
              </div>
              <div className="w-[230px] h-[78px] flex items-center gap-3 p-2 border rounded-md">
                <div className="w-14 h-14 min-w-fit rounded-full bg-gray-600"></div>
                <span className="w-3/5 line-clamp-2 text-sm">
                  Dr. Viska Anastashia
                </span>
              </div>
              <div className="w-[230px] h-[78px] flex items-center gap-3 p-2 border rounded-md">
                <div className="w-14 h-14 min-w-fit rounded-full bg-gray-600"></div>
                <span className="w-3/5 line-clamp-2 text-sm">
                  Dr. Viska Anastashia
                </span>
              </div>
              <div className="w-[230px] h-[78px] flex items-center gap-3 p-2 border rounded-md">
                <div className="w-14 h-14 min-w-fit rounded-full bg-gray-600"></div>
                <span className="w-3/5 line-clamp-2 text-sm">
                  Dr. Viska Anastashia
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Message / Advertisement */}
        <div className="w-full flex flex-col items-center gap-4 p-3 rounded-md bg-slate-100">
          <h2 className="text-lg text-center font-medium">
            Buat Janji Mudah & Bebas Antre
          </h2>
          <div className="w-5/6 flex items-center gap-3">
            <div className="w-14 h-14 min-w-fit rounded-full bg-gray-600"></div>
            <p className="text-sm">Tersedia dokter dari berbagai wilayah</p>
          </div>
          <div className="w-5/6 flex items-center gap-3">
            <div className="w-14 h-14 min-w-fit rounded-full bg-gray-600"></div>
            <p className="text-sm">Cepat - tanpa antre & daftar ulang</p>
          </div>
          <div className="w-5/6 flex items-center gap-3">
            <div className="w-14 h-14 min-w-fit rounded-full bg-gray-600"></div>
            <p className="text-sm">Tersedia ragam jadwal sesuai kebutuhanmu</p>
          </div>
        </div>

        {/* Footer */}
        <footer className="w-full flex flex-col items-center gap-2 p-3 text-center rounded-t-md bg-slate-200">
          <div className="w-full flex items-center justify-center p-2">
            <span className="text-2xl">LOGO</span>
          </div>
          <span className="text-sm text-gray-500">
            © Curagan 2023, ALL RIGHTS RESERVED
          </span>
        </footer>
      </div>
    </LayoutWrapper>
  );
};

export default Home;
