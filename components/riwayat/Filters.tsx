export const Filters = () => {
  return (
    <div className="flex gap-2">
      <button className="border border-solid rounded-md border-black bg-slate-100 inline-block text-black px-2 py-1">
        Semua
      </button>
      <button className="border border-solid rounded-md border-black bg-white inline-block text-black px-2 py-1">
        Diproses
      </button>
      <button className="border border-solid rounded-md border-black bg-white inline-block text-black px-2 py-1">
        Diterima
      </button>
      <button className="border border-solid rounded-md border-black bg-white inline-block text-black px-2 py-1">
        Dibatalkan
      </button>
      <button className="border border-solid rounded-md border-black bg-white inline-block text-black px-2 py-1">
        Selesai
      </button>
    </div>
  );
};
