import AppointmentRequestAction from '../jadwal/AppointmentRequestAction';

interface INotificationCard {
  notification: {
    notificationId: string;
    message: string;
    senderId: string;
    senderRole: string;
    targetId: string;
    targetRole: string;
    appointmentId: string;
    createdAt: string;
  };
}

export default function NotificationCard({ notification }: INotificationCard) {
  // Parse notification message
  const { text, name, date, status } = JSON.parse(notification.message);

  // Get current role
  const role = localStorage.getItem('role');

  // Get date & time
  const getDate = (thisDate: string) =>
    new Date(thisDate).toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  const getTime = (thisDate: string) =>
    new Date(thisDate).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });

  if (role == 'patient') {
    return (
      <div
        className={`w-full flex flex-col gap-2 p-2 rounded-md ${
          status == 'Accepted'
            ? 'bg-green-200'
            : status == 'Rejected'
            ? 'bg-red-200'
            : 'bg-slate-200'
        }`}
      >
        <p className="text-xs text-gray-500">
          {getDate(notification.createdAt)} @ {getTime(notification.createdAt)}
        </p>

        <p>{text}</p>

        <div className="w-full flex flex-col gap-1 px-3">
          <p className="flex gap-1">
            <strong className="w-[72px]">Dokter: </strong>
            {name}
          </p>
          <p className="flex gap-1">
            <strong className="w-[72px]">Tanggal: </strong>
            {getDate(date)}
          </p>
          <p className="flex gap-1">
            <strong className="w-[72px]">Waktu: </strong>
            {getTime(date)}
          </p>
        </div>
      </div>
    );
  }

  if (role == 'doctor') {
    return (
      <div className="w-full flex flex-col gap-2 p-2 rounded-md bg-slate-200">
        <p className="text-xs text-gray-500">
          {getDate(notification.createdAt)} @ {getTime(notification.createdAt)}
        </p>

        <p>{text}</p>

        <div className="w-full flex flex-col gap-1 px-3">
          <p className="flex gap-1">
            <strong className="w-[72px]">Nama: </strong>
            {name}
          </p>
          <p className="flex gap-1">
            <strong className="w-[72px]">Tanggal: </strong>
            {getDate(date)}
          </p>
          <p className="flex gap-1">
            <strong className="w-[72px]">Waktu: </strong>
            {getTime(date)}
          </p>
        </div>

        <AppointmentRequestAction
          appointmentId={notification.appointmentId}
          status={status}
        />
      </div>
    );
  }
}
