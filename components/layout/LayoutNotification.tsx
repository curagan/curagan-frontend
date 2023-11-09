import Image from 'next/image';
import Link from 'next/link';
import imgNotification from '@/public/icons/notification.png';

export const LayoutNotification = () => {
  return (
    <Link
      href={'/notifikasi'}
      className="w-[78px] max-w-[78px] flex flex-col items-center justify-start gap-1 p-2 hover:bg-slate-300 transition-all"
    >
      <div className="relative w-10 h-10 rounded-full">
        <div className="absolute right-0 w-3 h-3 rounded-full bg-red-500"></div>
        <Image
          src={imgNotification}
          alt="Notifikasi"
          className="object-contain"
        />
      </div>
      <span>Notifikasi</span>
    </Link>
  );
};
