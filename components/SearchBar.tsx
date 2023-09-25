export const SearchBar = () => {
  return (
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
  );
};
