// export const HistoryList = () => {
//   return (
//     <div>
//       <div className="flex flex-col space-y-4">
//         <div className="border border-solid rounded-md w-full h-30 bg-slate-200 text-black flex flex-col items-center justify-center">
//           <div className="w-full h-1/3 flex flex-row justify-between">
//             <h1 className="py-1 px-2 font-medium">date and time</h1>
//           </div>
//           <div className="w-full h-1/3  text-left">
//             <h1 className="px-2 py-1 text-sm">hospital</h1>
//           </div>
//           <div className="w-full h-1/3  flex flex-row justify-between">
//             <div className="w-1/5  text-center"></div>
//             <div className="w-4/5  flex flex-col">
//               <div className="h-1/2  font-semibold text-xl py-3 ">
//                 doctor name
//               </div>
//               <div className="h-1/2  flex flex-row">
//                 <div className="w-1/2 text-sm">specialization</div>
//                 <div className="w-1/2  text-right px-2 font-semibold text-blue-700">
//                   status
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="border border-solid rounded-md w-full h-30 bg-slate-200 text-black flex flex-col items-center justify-center">
//           <div className="w-full h-1/3 flex flex-row justify-between">
//             <h1 className="py-1 px-2 font-medium">Minggu</h1>
//             <h1 className="py-1 px-2 font-medium">13.00</h1>
//           </div>
//           <div className="w-full h-1/3  text-left">
//             <h1 className="px-2 py-1 text-sm">RS Murni Teguh</h1>
//           </div>
//           <div className="w-full h-1/3  flex flex-row justify-between">
//             <div className="w-1/5  text-center"></div>
//             <div className="w-4/5  flex flex-col">
//               <div className="h-1/2  font-semibold text-xl py-3 ">
//                 Dr. Budi Santoso
//               </div>
//               <div className="h-1/2  flex flex-row">
//                 <div className="w-1/2 text-sm">Dokter Umum</div>
//                 <div className="w-1/2 text-right px-2 text-green-700 font-semibold">
//                   Selesai
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// pages/appointments.tsx

import { useEffect, useState } from 'react';
import axios from 'axios';

interface Doctor {
  id: string;
  email: string;
  specialization: string;
  name: string;
  imageURL: string;
  location: string;
  hospital: string;
  schedule: string;
}

interface Appointment {
  appointmentId: string;
  patientID: string;
  doctorID: string;
  datetime: string;
  status: string;
}

const AppointmentCard: React.FC<{
  appointment: Appointment;
  doctor: Doctor;
}> = ({ appointment, doctor }) => (
  <div className="border border-solid rounded-md w-full h-30 bg-slate-200 text-black flex flex-col items-center justify-center">
    <div className="w-full h-1/3 flex flex-row justify-between">
      <h1 className="py-1 px-2 font-medium">
        {new Date(appointment.datetime).toLocaleString()}
      </h1>
    </div>
    <div className="w-full h-1/3  text-left">
      <h1 className="px-2 py-1 text-sm">{doctor.hospital}</h1>
    </div>
    <div className="w-full h-1/3  flex flex-row justify-between">
      <div className="w-1/5  text-center"></div>
      <div className="w-4/5  flex flex-col">
        <div className="h-1/2  font-semibold text-xl py-3 ">{doctor.name}</div>
        <div className="h-1/2  flex flex-row">
          <div className="w-1/2 text-sm">{doctor.specialization}</div>
          <div className="w-1/2  text-right px-2 font-semibold text-blue-700">
            {appointment.status}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const HistoryList: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getDoctorById = async (id: string): Promise<Doctor | null> => {
    try {
      const response = await axios.get(
        `https://curagan-api.nikenhpsr.site/doctor/${id}`,
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching doctor:', error);
      setError('Error fetching doctor');
      return null;
    }
  };

  const getAppointmentsByUserId = async (
    id: string,
  ): Promise<Appointment[] | null> => {
    try {
      const accessToken = localStorage.getItem('token');

      if (!accessToken) {
        console.error('Access token not found in localStorage');
        return null;
      }

      const userId = localStorage.getItem('userId');

      if (!userId) {
        console.error('User ID not found in localStorage');
        return null;
      }

      const response = await axios.get(
        `https://curagan-api.nikenhpsr.site/appointments/my-appointments/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setError('Error fetching appointments');
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem('userId');

        if (!userId) {
          console.error('User ID not found in localStorage');
          return;
        }

        const appointmentsData = await getAppointmentsByUserId('userId');

        if (appointmentsData) {
          setAppointments(appointmentsData);

          const doctorIds = appointmentsData.map(
            (appointment) => appointment.doctorID,
          );

          const doctorsData = await Promise.all(
            doctorIds.map((id) => getDoctorById(id)),
          );

          setDoctors(
            doctorsData.filter((doctor) => doctor !== null) as Doctor[],
          );
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      {appointments.length > 0 ? (
        <div className="flex flex-col gap-4">
          {appointments.map((appointment) => {
            const doctor = doctors.find(
              (doc) => doc.id === appointment.doctorID,
            );
            return doctor ? (
              <AppointmentCard
                key={appointment.appointmentId}
                appointment={appointment}
                doctor={doctor}
              />
            ) : null;
          })}
        </div>
      ) : (
        <p>No appointments found.</p>
      )}
    </div>
  );
};

export default HistoryList;
