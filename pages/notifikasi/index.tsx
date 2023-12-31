import { LoadingCard } from '@/components/LoadingCard';
import { LayoutWrapper } from '@/components/layout/LayoutWrapper';
import NotificationCard from '@/components/notifikasi/NotificationCard';
import { API, API_NOTIFICATION } from '@/lib/ApiLinks';
import axios from 'axios';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import useSWR from 'swr';

interface INotification {
  notificationId: string;
  message: string;
  senderId: string;
  senderRole: string;
  targetId: string;
  targetRole: string;
  appointmentId: string;
  createdAt: string;
}

const Notifikasi: NextPage = () => {
  // User role & userId
  const [user, setUser] = useState({
    role: '',
    userId: '',
  });

  // Handles SWR conditional fetching
  const [shouldFetch, setShouldFetch] = useState(false);

  // SWR
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, isLoading } = useSWR(
    shouldFetch ? `${API_NOTIFICATION}/${user.userId}` : null,
    fetcher,
  );
  if (!isLoading) console.log(data);

  // Init socket.io
  const socket = io(API);

  // Store current user role & Id, then fetch data
  useEffect(() => {
    setUser({
      role: localStorage.getItem('role') as string,
      userId: localStorage.getItem('userId') as string,
    });
    setShouldFetch(true);
  }, []);

  // Socket
  useEffect(() => {
    socket.emit('identifyUser', user);

    socket.on('notification', (message: INotification) => {
      console.log('socket.on notification');
    });
  }, []);

  const returnReversedNotifications = (dataSWR: any) => {
    const reversedData = [...dataSWR].reverse();

    return reversedData.map((notification: INotification) => (
      <NotificationCard
        key={notification.notificationId}
        notification={notification}
      />
    ));
  };

  return (
    <LayoutWrapper>
      <div className="w-full flex flex-col gap-4 p-3 pb-0 ">
        <h1 className="font-semibold text-xl">Notifikasi</h1>

        {isLoading ? (
          <LoadingCard />
        ) : data == undefined || data.length == 0 ? (
          <div className="w-full flex flex-col gap-2 items-center justify-center p-2 rounded-md text-center bg-slate-100">
            <span>Tidak ada notifikasi untuk saat ini</span>
          </div>
        ) : (
          returnReversedNotifications(data)
        )}
      </div>
    </LayoutWrapper>
  );
};

export default Notifikasi;
