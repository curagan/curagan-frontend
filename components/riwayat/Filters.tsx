export const Filters = () => {
  return (
    <div className="flex gap-2">
      <div className="border border-solid rounded-md border-black bg-slate-100 inline-block text-black px-2 py-1">
        Semua
      </div>
      <div className="border border-solid rounded-md border-black bg-white inline-block text-black px-2 py-1">
        Diproses
      </div>
      <div className="border border-solid rounded-md border-black bg-white inline-block text-black px-2 py-1">
        Diterima
      </div>
      <div className="border border-solid rounded-md border-black bg-white inline-block text-black px-2 py-1">
        Dibatalkan
      </div>
      <div className="border border-solid rounded-md border-black bg-white inline-block text-black px-2 py-1">
        Selesai
      </div>
    </div>
  );
};
