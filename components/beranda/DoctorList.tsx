export const DoctorList = () => {
  const doctors = [
    'Dr. Viska Anastashia',
    'dr. Alfa Sylvestris, Sp.M',
    'Dr. Chandra Megah',
    'dr. Agung Saputro',
    'dr. Ahriani Achmad, Sp.M',
    'dr. Aiza Fitria',
  ];

  return (
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
        <div className="min-w-full w-[970px] h-44 flex flex-wrap items-start gap-3">
          {doctors.map((doctor) => (
            <div
              key={doctor}
              className="w-[230px] h-[78px] flex items-center gap-3 p-2 border rounded-md"
            >
              <div className="w-14 h-14 min-w-fit rounded-full bg-gray-600"></div>
              <span className="w-3/5 line-clamp-2 text-sm">{doctor}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
