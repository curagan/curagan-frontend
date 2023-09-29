import React from 'react';
import { format } from 'date-fns';

type AppointmentCardProps = {
  patientId: string;
  date: string;
};

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  patientId,
  date,
}) => {
  const formattedDate = format(new Date(date), 'd - MMMM - yyyy');
  const formattedTime = format(new Date(date), 'HH:mm');

  return (
    <div className="w-full flex flex-col gap-2 mb-4">
      <div className="w-full flex gap-2 items-center justify-between p-2 rounded-md bg-slate-100">
        <div className="grow flex flex-col justify-between gap-1">
          <div className="flex items-center gap-2">
            <div className="line-clamp-1">
              <span className="font-bold">Tanggal:</span> {formattedDate}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="line-clamp-1">
              <span className="font-bold">Jam:</span> {formattedTime}
            </div>
          </div>
          <div className="line-clamp-2">
            <span className="font-bold">Patient Id:</span> {patientId}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
