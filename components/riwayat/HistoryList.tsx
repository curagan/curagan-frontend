export const HistoryList = () => {
  return (
    <div>
      <div className="flex flex-col space-y-4">
        <div className="border border-solid rounded-md w-full h-30 bg-slate-200 text-black flex flex-col items-center justify-center">
          <div className="w-full h-1/3 flex flex-row justify-between">
            <h1 className="py-1 px-2 font-medium">Sabtu</h1>
            <h1 className="py-1 px-2 font-medium">11.00</h1>
          </div>
          <div className="w-full h-1/3  text-left">
            <h1 className="px-2 py-1 text-sm">RS Murni Teguh</h1>
          </div>
          <div className="w-full h-1/3  flex flex-row justify-between">
            <div className="w-1/5  text-center"></div>
            <div className="w-4/5  flex flex-col">
              <div className="h-1/2  font-semibold text-xl py-3 ">
                Dr. Viska Anastashia
              </div>
              <div className="h-1/2  flex flex-row">
                <div className="w-1/2 text-sm">Dokter Umum</div>
                <div className="w-1/2  text-right px-2 font-semibold text-blue-700">
                  Diproses
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border border-solid rounded-md w-full h-30 bg-slate-200 text-black flex flex-col items-center justify-center">
          <div className="w-full h-1/3 flex flex-row justify-between">
            <h1 className="py-1 px-2 font-medium">Minggu</h1>
            <h1 className="py-1 px-2 font-medium">13.00</h1>
          </div>
          <div className="w-full h-1/3  text-left">
            <h1 className="px-2 py-1 text-sm">RS Murni Teguh</h1>
          </div>
          <div className="w-full h-1/3  flex flex-row justify-between">
            <div className="w-1/5  text-center"></div>
            <div className="w-4/5  flex flex-col">
              <div className="h-1/2  font-semibold text-xl py-3 ">
                Dr. Budi Santoso
              </div>
              <div className="h-1/2  flex flex-row">
                <div className="w-1/2 text-sm">Dokter Umum</div>
                <div className="w-1/2 text-right px-2 text-green-700 font-semibold">
                  Selesai
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
