import { API_APPOINTMENT } from '@/lib/ApiLinks';
import axios from 'axios';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';

interface IAppointmentConfirmation {
  selectedDate: string;
  doctorId: string;
  setDisplaySuccessAppointmentCard: Dispatch<SetStateAction<boolean>>;
}

export const AppointmentConfirmation = ({
  selectedDate,
  doctorId,
  setDisplaySuccessAppointmentCard,
}: IAppointmentConfirmation) => {
  const handleSubmit = async () => {
    const role = localStorage.getItem('role');

    // ignore appointment if role is doctor
    if (role == 'doctor') return;

    const response = await axios.post(
      API_APPOINTMENT,
      {
        patientID: localStorage.getItem('userId'),
        doctorID: doctorId,
        datetime: selectedDate,
        status: 'Pending',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    );

    setDisplaySuccessAppointmentCard(true);
  };

  return (
    <div className="w-full flex items-stretch justify-center gap-2">
      <Link
        href={'/beranda'}
        className="w-1/2 p-2 rounded-md text-sm text-center bg-red-600 text-white"
      >
        Kembali
      </Link>
      <button
        onClick={() => handleSubmit()}
        className="w-1/2 p-2 rounded-md text-sm bg-slate-900 text-white"
      >
        Buat Appointment
      </button>
    </div>
  );
};
