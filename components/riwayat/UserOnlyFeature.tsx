import Link from 'next/link';

export default function UserOnlyFeature() {
  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center p-2 rounded-md text-center bg-slate-100">
      <span className="text-lg font-medium">
        Fitur Khusus Pelanggan Terdaftar
      </span>
      <span>Silahkan login sebagai pelanggan</span>
      <Link
        href={'/login'}
        className="w-full p-2 text-lg font-medium rounded-md bg-[#13629D] text-white"
      >
        Login
      </Link>
    </div>
  );
}
