import Image from 'next/image';
import { API_PATIENT } from '@/lib/ApiLinks';
import axios from 'axios';
import React from 'react';
import useSWR from 'swr';
import imgAvatar from '@/public/icons/avatar.png';
import AppointmentRequestAction from './AppointmentRequestAction';

const AppointmentCard = ({ appointment }: any) => {
  // Fetch patient data
  const fetcher = (url: string) =>
    axios
      .get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    `${API_PATIENT}/${appointment.patientID}`,
    fetcher,
  );

  // Get appointment date & time
  const thisDate = new Date(appointment.datetime);
  const getDate = thisDate.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const getTime = thisDate.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="w-full flex flex-col gap-2 p-2 border rounded-md bg-slate-200">
      {/* Appointment Date & Time */}
      <div className="w-full flex items-center justify-between gap-2 text-lg font-medium">
        <span>{getDate}</span>
        <span>{getTime}</span>
      </div>

      {/* Patient Image & Name */}
      <div className="w-full flex items-center gap-2 ml-3 my-2">
        <div className="w-14 h-14 flex items-center justify-center rounded-md border">
          <Image
            src={imgAvatar}
            alt="patient image"
            className="object-contain"
          />
        </div>
        {isLoading ? <span>...</span> : <span>{data.name}</span>}
      </div>

      {/* Accept / Reject */}
      <AppointmentRequestAction
        appointmentId={appointment.appointmentId}
        status={appointment.status}
      />
    </div>
  );
};

export default AppointmentCard;
