import { LayoutWrapper } from '@/components/layout/LayoutWrapper';
import { NextPage } from 'next';
import axios from 'axios';
import useSWR from 'swr';
import { API_DOCTOR, API_MY_APPOINTMENT } from '@/lib/ApiLinks';
import { useEffect, useState } from 'react';
import { Filters } from '@/components/riwayat/Filters';
import { AppointmentList } from '@/components/riwayat/AppointmentList';
import { LoadingCard } from '@/components/LoadingCard';
import UserOnlyFeature from '@/components/riwayat/UserOnlyFeature';

const Riwayat: NextPage = () => {
  // State to control data based on appointment status
  const [filterData, setFilterData] = useState('All');

  // Handles SWR conditional fetching
  const [shouldFetch, setShouldFetch] = useState(false);

  // Get token from localstorage
  const isBrowser = typeof window !== 'undefined';
  const userId = isBrowser ? localStorage.getItem('userId') : '';
  const token = isBrowser ? localStorage.getItem('token') : '';

  // Fetch handler
  const userFetcher = (url: string) =>
    axios
      .get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data);
  const doctorFetcher = (url: string) => axios.get(url).then((res) => res.data);

  // SWR
  const userAppointment = useSWR(
    shouldFetch ? `${API_MY_APPOINTMENT}/${userId}` : null,
    userFetcher,
  );
  const doctors = useSWR(shouldFetch ? `${API_DOCTOR}` : null, doctorFetcher);

  useEffect(() => {
    setShouldFetch(true);
  }, []);

  return (
    <LayoutWrapper>
      <div className="w-full flex flex-col gap-4 p-3 pb-0 ">
        <h1 className="font-semibold text-xl">Riwayat Konsultasi</h1>

        {userId == null ? (
          <UserOnlyFeature />
        ) : doctors.isLoading || userAppointment.isLoading ? (
          <LoadingCard />
        ) : (
          <>
            <Filters setFilterData={setFilterData} />

            {!userAppointment.data ? (
              <div>Data tidak ditemukan</div>
            ) : (
              <AppointmentList
                appointmentData={userAppointment.data}
                doctorsData={doctors.data}
                filterData={filterData}
              />
            )}
          </>
        )}
      </div>
    </LayoutWrapper>
  );
};

export default Riwayat;
