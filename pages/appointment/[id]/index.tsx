import { NextPage } from 'next';
import { LayoutWrapper } from '@/components/layout/LayoutWrapper';
import { useRouter } from 'next/router';
import axios from 'axios';
import useSWR from 'swr';
import { API_DOCTOR } from '@/lib/ApiLinks';
import { LoadingCard } from '@/components/LoadingCard';
import { DoctorAppointmentCard } from '@/components/appointment/DoctorAppointmentCard';
import { DoctorScheduleCard } from '@/components/appointment/DoctorScheduleCard';
import { useState } from 'react';
import { AppointmentConfirmation } from '@/components/appointment/AppointmentConfirmation';
import { AppointmentSuccessful } from '@/components/appointment/AppointmentSuccessful';

const Appointment: NextPage = () => {
  const router = useRouter();
  const id = router.query.id;

  // Fetch data
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, isLoading, error } = useSWR(`${API_DOCTOR}/${id}`, fetcher);

  // Get date from DoctorScheduleCard
  const [selectedDate, setSelectedDate] = useState('');

  // Display success card if appointment is made
  const [displaySuccessAppointmentCard, setDisplaySuccessAppointmentCard] =
    useState(false);

  return (
    <LayoutWrapper>
      <div className="relative w-full h-full flex flex-col justify-between gap-4 p-3">
        {isLoading ? (
          <LoadingCard />
        ) : (
          <>
            <div className="w-full flex flex-col gap-4">
              <DoctorAppointmentCard
                name={data.name}
                hospital={data.hospital}
                location={data.location}
              />

              <DoctorScheduleCard
                schedule={data.schedule}
                setSelectedDate={setSelectedDate}
              />
            </div>

            <AppointmentConfirmation
              selectedDate={selectedDate}
              doctorId={id as string}
              setDisplaySuccessAppointmentCard={
                setDisplaySuccessAppointmentCard
              }
            />
          </>
        )}

        {displaySuccessAppointmentCard && <AppointmentSuccessful />}
      </div>
    </LayoutWrapper>
  );
};

export default Appointment;
