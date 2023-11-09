import { NextPage } from 'next';
import axios from 'axios';
import CalendarComponent from '../../components/jadwal/CalendarComponent';
import { useEffect, useState } from 'react';
import { LayoutWrapper } from '@/components/layout/LayoutWrapper';
import { API_DOCTOR } from '@/lib/ApiLinks';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { LoadingCard } from '@/components/LoadingCard';

// type Schedule = {
//   date: string;
//   month: string;
//   year: string;
//   time: string[];
// };

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

type FetchDataType = {
  data: Doctor;
  isLoading: boolean;
};

const JadwalPage: NextPage = () => {
  const router = useRouter();
  const userId = router.query.id;

  // Handles SWR conditional fetching
  const [shouldFetch, setShouldFetch] = useState(false);

  // SWR
  const fetcher = (url: string) =>
    axios
      .get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => res.data);
  const { data, isLoading }: FetchDataType = useSWR(
    shouldFetch ? `${API_DOCTOR}/${userId}` : null,
    fetcher,
  );

  // Fetch data after load
  useEffect(() => {
    setShouldFetch(true);
  }, []);

  return (
    <LayoutWrapper>
      {isLoading || data == undefined ? (
        <LoadingCard />
      ) : (
        <div>
          <h1 className="font-bold">{data.name}</h1>
          <p> Dokter {data.specialization}</p>
          <p>{data.hospital}</p>
          <CalendarComponent schedule={JSON.parse(data.schedule)} />
        </div>
      )}
    </LayoutWrapper>
  );
};

export default JadwalPage;
