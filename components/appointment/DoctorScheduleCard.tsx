import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface IDoctorScheduleCard {
  schedule: string;
  setSelectedDate: Dispatch<SetStateAction<string>>;
}

export const DoctorScheduleCard = ({
  schedule,
  setSelectedDate,
}: IDoctorScheduleCard) => {
  const scheduleList = JSON.parse(schedule);

  const [displayIndex, setDisplayIndex] = useState(0);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState(0);

  const data = scheduleList[displayIndex];
  const getDate = new Date(
    `${data.year}-${data.month}-${data.date}T${data.time[selectedTimeIndex]}:00`,
  );

  useEffect(() => {
    setSelectedDate(getDate.toISOString());
  }, [displayIndex, selectedTimeIndex]);

  return (
    <div className="w-full flex flex-col gap-2">
      <span className="font-medium">Pilih Tanggal & Waktu Konsultasi</span>

      {/* Weekday, Day & Month */}
      <div className="w-full flex flex-col gap-3 p-2 rounded-md bg-slate-100">
        <div className="overflow-x-auto overflow-y-clip">
          <div className="min-w-max max-w-[970px] h-16 flex flex-wrap items-start gap-2">
            {scheduleList.map((schedule: any, i: number) => {
              const thisDate = new Date(
                `${schedule.year}-${schedule.month}-${schedule.date}`,
              );
              const getWeekday = thisDate.toLocaleDateString('id-ID', {
                weekday: 'long',
              });
              const getDayMonthYear = thisDate.toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
                year: '2-digit',
              });

              return (
                <button
                  key={'date' + i}
                  onClick={() => {
                    setDisplayIndex(i);
                    setSelectedTimeIndex(0);
                  }}
                  className={`w-20 h-16 flex flex-col items-center justify-center p-1 rounded-md ${
                    i == displayIndex
                      ? 'bg-[#13629D] text-white'
                      : 'border border-black'
                  }`}
                >
                  <span className="font-medium">{getWeekday}</span>
                  <span className="text-sm">{getDayMonthYear}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="w-full h-[1px] bg-gray-400"></div>

        {/* Time */}
        <div className="w-full flex flex-wrap items-start gap-3">
          {data.time.map((time: any, i: number) => {
            return (
              <button
                key={time}
                onClick={() => {
                  setSelectedTimeIndex(i);
                }}
                className={`w-16 flex items-center justify-center p-1 px-2 rounded-md ${
                  i == selectedTimeIndex
                    ? 'bg-[#13629D] text-white'
                    : 'border border-black'
                }`}
              >
                <span className="font-medium">{time}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
