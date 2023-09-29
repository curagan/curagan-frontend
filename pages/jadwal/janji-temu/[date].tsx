import { useRouter } from 'next/router';
import useSWR from 'swr';
import { API_APPOINTMENT_HISTORY } from '../../../lib/ApiLinks';
import axios from 'axios';
import AppointmentCard from '../../../components/jadwal/AppointmentCard';
import { useEffect, useState } from 'react';
import { addDays, formatISO } from 'date-fns';
import { LayoutWrapper } from '@/components/layout/LayoutWrapper';

interface AppointmentData {
  appointmentId: string;
  patientID: string;
  doctorID: string;
  datetime: string;
  status: string;
}

const fetcher = (url: string) => {
  const token = localStorage.getItem('token');
  return axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

const JanjiTemu = () => {
  const router = useRouter();
  const { date } = router.query;

  const [doctorId, setDoctorId] = useState<string>('');

  useEffect(() => {
    const id = localStorage.getItem('doctorId');
    if (id) {
      setDoctorId(id);
    }
  }, []);

  let isoEndDate;
  if (date) {
    try {
      const adjustedEndDate = addDays(new Date(date as string), 1);
      isoEndDate = formatISO(adjustedEndDate, { representation: 'date' });
    } catch (e) {
      console.error('Invalid date:', date);
    }
  }

  const { data, error } = useSWR<AppointmentData[]>(
    date && doctorId
      ? `${API_APPOINTMENT_HISTORY}/${doctorId}?start=${date}&end=${isoEndDate}`
      : null,
    fetcher,
  );

  if (error) return <div>Gagal memuat data</div>;
  if (!data) return <div>Memuat...</div>;

  return (
    <LayoutWrapper>
      <div>
        <h1 className="font-bold">Janji Temu untuk tanggal {date}</h1>
        {data.length === 0 ? (
          <p>Tidak ada janji dengan pasien</p>
        ) : (
          data.map((appointment, index) => (
            <AppointmentCard
              key={index}
              patientId={appointment.patientID}
              date={appointment.datetime}
            />
          ))
        )}
        <button
          onClick={() => router.back()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Kembali
        </button>
      </div>
    </LayoutWrapper>
  );
};

export default JanjiTemu;
