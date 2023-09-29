import { GetServerSideProps } from 'next';
import axios from 'axios';
import CalendarComponent from '../../components/jadwal/CalendarComponent';
import { useEffect, useState } from 'react';
import { LayoutWrapper } from '@/components/layout/LayoutWrapper';

type Schedule = {
  date: string;
  month: string;
  year: string;
  time: string[];
};

type Doctor = {
  id: string;
  email: string;
  specialization: string;
  name: string;
  imageURL: string;
  location: string;
  hospital: string;
  schedule: string;
};

type JadwalProps = {
  doctor: Doctor;
};

const JadwalPage: React.FC<JadwalProps> = ({ doctor }) => {
  const [parsedSchedule, setParsedSchedule] = useState<Schedule[]>([]);

  useEffect(() => {
    try {
      const schedule: Schedule[] = JSON.parse(doctor.schedule);

      setParsedSchedule(schedule);
    } catch (err) {
      console.error("Failed to parse doctor's schedule", err);
    }
  }, [doctor]);

  return (
    <LayoutWrapper>
      <div>
        <h1 className="font-bold">{doctor.name}</h1>
        <p> Dokter {doctor.specialization}</p>
        <p>{doctor.hospital}</p>
        <CalendarComponent schedule={parsedSchedule} />
      </div>
    </LayoutWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id as string;
  let doctor: Doctor;

  try {
    const res = await axios.get(
      `https://curagan-api.nikenhpsr.site/doctor/${id}`,
    );
    doctor = res.data;
  } catch (err) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      doctor,
    },
  };
};

export default JadwalPage;
