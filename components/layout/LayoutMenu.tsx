import Link from 'next/link';
import { MenuLink } from './MenuLink';
import { useRouter } from 'next/router';

export const LayoutMenu = () => {
  const router = useRouter();

  const doesRoleExist = localStorage.getItem('role') !== null;
  const role = localStorage.getItem('role');
  const doctorId = localStorage.getItem('doctorId'); // Added this line to get doctorId from localStorage

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('doctorId');
    localStorage.removeItem('userId');

    router.push('/beranda');
  };

  return (
    <div className="absolute bottom-0 w-full max-w-md h-fit flex justify-end px-4 -translate-y-28">
      <div className="w-1/2 min-w-fit flex flex-col items-end p-3 rounded-md text-lg text-right bg-slate-300">
        {doesRoleExist && role === 'doctor' ? (
          <>
            <MenuLink href="/akun" name="Akun" />
            <MenuLink href={`/jadwal/${doctorId}`} name="Jadwal" />{' '}
            {/* Updated this line */}
            <MenuLink href="/daftarAppointment" name="Daftar Appointment" />
            <div className="w-full h-[1px] bg-gray-600"></div>
          </>
        ) : doesRoleExist && role === 'patient' ? (
          <>
            <MenuLink href="/akun" name="Akun" />
            <div className="w-full h-[1px] bg-gray-600"></div>
          </>
        ) : (
          ''
        )}

        {doesRoleExist ? (
          <button
            onClick={handleLogout}
            className="w-full py-3 px-2 font-medium text-right rounded-md text-red-700 hover:bg-slate-400 hover:bg-opacity-30"
          >
            Logout
          </button>
        ) : (
          <Link
            href="/login"
            className="w-full py-3 px-2 font-medium text-right rounded-md text-[#13629D] hover:bg-slate-400 hover:bg-opacity-30"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};
