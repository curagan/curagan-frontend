import { Dispatch, SetStateAction, useState } from 'react';

interface IFilters {
  setFilterData: Dispatch<SetStateAction<string>>;
}

export const Filters = ({ setFilterData }: IFilters) => {
  const [selectedFilter, setSelectedFilter] = useState(0);
  const indoTextArr = [
    'Semua',
    'Diproses',
    'Diterima',
    'Dibatalkan',
    'Selesai',
  ];
  const filterValues = ['All', 'Pending', 'Accepted', 'Rejected', 'Done'];

  return (
    <div className="w-full flex items-center gap-2 rounded-md">
      <div className="overflow-x-auto overflow-y-clip">
        <div className="min-w-max h-9 flex flex-wrap items-start gap-2">
          {indoTextArr.map((text, i) => (
            <button
              key={text}
              onClick={() => {
                setFilterData(filterValues[i]);
                setSelectedFilter(i);
              }}
              className={`h-9 rounded-md px-2 py-1 text-sm text-black ${
                i == selectedFilter
                  ? 'bg-[#13629D] text-white'
                  : 'border border-black'
              }`}
            >
              {text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
