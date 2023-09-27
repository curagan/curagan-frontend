export const HistoryList = () => {
  return (
    <div>
      <div className="flex flex-col space-y-4">
        <div className="border border-solid rounded-md w-full h-30 bg-slate-500 text-white flex flex-col items-center justify-center">
          <div className="w-full h-1/3 flex flex-row justify-between">
            <h1 className="py-1 px-2">Sabtu</h1>
            <h1 className="py-1 px-2">11.00</h1>
          </div>
          <div className="w-full h-1/3  text-left">
            <h1 className="px-2 py-2 text-lg">RS Murni Teguh</h1>
          </div>
          <div className="w-full h-1/3  flex flex-row justify-between">
            <div className="w-1/5  text-center">Gambar</div>
            <div className="w-4/5  flex flex-col">
              <div className="h-1/2  font-semibold text-xl ">Dokter Viska</div>
              <div className="h-1/2  flex flex-row">
                <div className="w-1/2  text-sm">Dokter Umum</div>
                <div className="w-1/2  text-right px-2">Diproses</div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-32 bg-green-500 text-white flex items-center justify-center">
          Box 2
        </div>
        <div className="w-full h-32 bg-red-500 text-white flex items-center justify-center">
          Box 3
        </div>
      </div>
    </div>
  );
};
