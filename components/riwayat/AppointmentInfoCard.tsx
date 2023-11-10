import Image from 'next/image';
import imgLocation from '@/public/icons/location.png';
import imgDoctorAvatar from '@/public/icons/doctor-avatar.png';
import imgPatientAvatar from '@/public/icons/avatar.png';
import Link from 'next/link';
import useSWR from 'swr';
import { API_PATIENT } from '@/lib/ApiLinks';
import axios from 'axios';

interface IAppointmentCard {
  doctorsData: any;
  appointment: any;
}

export default function AppointmentInfoCard({
  doctorsData,
  appointment,
}: IAppointmentCard) {
  // Get doctor data
  const doctor = doctorsData.find(
    (doctor: any) => doctor.id == appointment.doctorID,
  );

  // Get current role
  const role = localStorage.getItem('role');

  // Get patient data
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, isLoading } = useSWR(
    `${API_PATIENT}/${appointment.patientID}`,
    fetcher,
  );

  // Get date & time
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

      {/* Location */}
      <div className="w-full flex items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 flex items-center justify-center rounded-md">
            <Image
              src={imgLocation}
              alt="location"
              className="object-contain"
            />
          </div>
          <span className="text-sm text-gray-600">
            {`${doctor.hospital}, ${doctor.location}`}
          </span>
        </div>
      </div>

      {/* Doctor / Patient Image & Name */}
      <div className="w-full flex items-center gap-2 ml-3 my-2">
        <div className="w-14 h-14 flex items-center justify-center rounded-md border">
          {isLoading ? (
            ''
          ) : role == 'doctor' ? (
            <Image
              src={imgPatientAvatar}
              alt="patient image"
              className="object-contain"
            />
          ) : (
            <Image
              src={imgDoctorAvatar}
              alt="doctor image"
              className="object-contain"
            />
          )}
        </div>
        <span>
          {isLoading ? '...' : role == 'doctor' ? data.name : doctor.name}
        </span>
      </div>

      {/* Appointment Status */}
      <div className="w-full flex items-center justify-end gap-2">
        <span
          className={`w-fit rounded-md font-medium ${
            appointment.status == 'Pending' || appointment.status == 'Submitted'
              ? 'text-slate-900'
              : appointment.status == 'Accepted'
              ? 'text-green-500'
              : appointment.status == 'Rejected'
              ? 'text-red-500'
              : 'text-gray-500'
          }`}
        >
          {appointment.status}
        </span>
      </div>

      {/* Extension Request */}
      {role == 'patient' && appointment.status == 'Accepted' && (
        <div className="w-full flex items-center justify-between gap-2">
          <Link
            href={`/appointment/extend/${doctor.id}`}
            className="w-full rounded-md p-2 text-center text-white bg-[#13629D] bg-opacity-80 hover:bg-opacity-100"
          >
            Minta perpanjangan konsultasi
          </Link>
        </div>
      )}
    </div>
  );
}
