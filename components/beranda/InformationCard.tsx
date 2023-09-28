import Image from 'next/image';
import imgCheck from '@/public/icons/check.png';

export const InformationCard = () => {
  return (
    <div className="w-full flex flex-col items-center gap-4 p-3 rounded-md bg-slate-100">
      <h2 className="text-lg text-center font-medium">
        Buat Janji Mudah & Bebas Antre
      </h2>
      <div className="w-5/6 flex items-center gap-3">
        <div className="w-14 h-14">
          <Image src={imgCheck} alt="benefit 1" className="object-contain" />
        </div>
        <p className="text-sm">Tersedia dokter dari berbagai wilayah</p>
      </div>
      <div className="w-5/6 flex items-center gap-3">
        <div className="w-14 h-14">
          <Image src={imgCheck} alt="benefit 2" className="object-contain" />
        </div>
        <p className="text-sm">Cepat - tanpa antre & daftar ulang</p>
      </div>
      <div className="w-5/6 flex items-center gap-3">
        <div className="w-14 h-14">
          <Image src={imgCheck} alt="benefit 3" className="object-contain" />
        </div>
        <p className="text-sm">Tersedia ragam jadwal sesuai kebutuhanmu</p>
      </div>
    </div>
  );
};
