import { API, API_APPOINTMENT } from '@/lib/ApiLinks';
import axios from 'axios';
import { useState } from 'react';
import { io } from 'socket.io-client';
import useSWR from 'swr';
import { LoadingCard } from '../LoadingCard';

export default function AppointmentRequestAction({
  appointmentId,
  status,
}: {
  appointmentId: string;
  status: string;
}) {
  // Disable accept / reject buttons after submission
  const [disableSubmit, setDisableSubmit] = useState(false);

  // Display message after appointment status successfully updated
  const [statusUpdated, setStatusUpdated] = useState(false);

  // Handle displayed message when appointment is accepted / rejected
  const [appointmentAccepted, setAppointmentAccepted] = useState(false);

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
  const { data, isLoading, error } = useSWR(
    `${API_APPOINTMENT}/${appointmentId}`,
    fetcher,
  );

  // Init socket.io
  const socket = io(API);

  // Send notification to users
  const sendNotification = async (requestAccepted: boolean) => {
    // Get current user role
    const role = localStorage.getItem('role');

    if (requestAccepted) {
      // Create message templates for patient
      const messageToPatient = {
        text: 'Permintaan konsultasi anda dengan dokter yang bersangkutan diterima.',
        name: data.doctor.name,
        date: data.datetime,
        status: 'Accepted',
      };

      // Send appointment notification to patient
      socket.emit('createAppointment', {
        senderRole: role,
        senderId: data.doctorID,
        targetId: data.patientID,
        targetRole: 'patient',
        message: JSON.stringify(messageToPatient),
        appointmentId: appointmentId,
        createdAt: String(new Date().toUTCString()),
      });
    } else {
      // Create message templates for patient
      const messageToPatient = {
        text: 'Permintaan konsultasi anda dengan dokter yang bersangkutan ditolak.',
        name: data.doctor.name,
        date: data.datetime,
        status: 'Rejected',
      };

      // Send appointment notification to patient
      socket.emit('createAppointment', {
        senderRole: role,
        senderId: data.doctorID,
        targetId: data.patientID,
        targetRole: 'patient',
        message: JSON.stringify(messageToPatient),
        appointmentId: appointmentId,
        createdAt: String(new Date().toUTCString()),
      });
    }
  };

  // Appointment accept / reject handler
  const handleAppointmentRequest = async (requestAccepted: boolean) => {
    if (requestAccepted) {
      try {
        // Disable button submission
        setDisableSubmit(true);

        // Get doctor ID
        const doctorId = localStorage.getItem('doctorId');

        // Update appointment status to 'Accepted'
        const response = await axios.patch(
          `${API_APPOINTMENT}/${appointmentId}/${doctorId}`,
          {
            status: 'Accepted',
            message: 'Appointment accepted',
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          },
        );

        // Update status & appointment state
        setAppointmentAccepted(true);
        setStatusUpdated(true);

        // Notify patient
        const notify = await sendNotification(true);

        console.log('Appointment Request Acccepted');
      } catch (error) {
        setDisableSubmit(false);
        console.log(error);
      }
    } else {
      try {
        setDisableSubmit(true);

        const doctorId = localStorage.getItem('doctorId');
        console.log('Rejecting request...');

        // Update appointment status to 'Rejected'
        const response = await axios.patch(
          `${API_APPOINTMENT}/${appointmentId}/${doctorId}`,
          {
            status: 'Rejected',
            message: 'Appointment rejected',
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          },
        );

        // Update status state
        setStatusUpdated(true);

        // Notify patient
        const notify = await sendNotification(false);

        console.log('Appointment Request Rejected');
      } catch (error) {
        setDisableSubmit(false);
        console.log(error);
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingCard />
      ) : data.status == 'Pending' && !statusUpdated ? (
        <div className="w-full flex items-center justify-between gap-2">
          {/* Batal Button */}
          {disableSubmit ? (
            <button
              disabled
              className="w-1/2 p-2 rounded-md text-sm bg-red-700 text-white bg-opacity-40"
            >
              Batal
            </button>
          ) : (
            <button
              onClick={() => handleAppointmentRequest(false)}
              className="w-1/2 p-2 rounded-md text-sm bg-red-700 text-white"
            >
              Batal
            </button>
          )}

          {/* Terima Button */}
          {disableSubmit ? (
            <button
              disabled
              className="w-1/2 p-2 rounded-md text-sm bg-green-600 text-white bg-opacity-40"
            >
              Terima
            </button>
          ) : (
            <button
              onClick={() => handleAppointmentRequest(true)}
              className="w-1/2 p-2 rounded-md text-sm bg-green-600 text-white"
            >
              Terima
            </button>
          )}
        </div>
      ) : (
        ''
      )}

      {/* Status Message */}
      {isLoading ? (
        ''
      ) : data.status == 'Pending' ? (
        ''
      ) : data.status == 'Accepted' ||
        (statusUpdated && appointmentAccepted) ? (
        <span className="font-semibold text-center text-green-700">
          Appointment pasien diterima
        </span>
      ) : (
        <span className="font-semibold text-center text-red-700">
          Appointment pasien ditolak
        </span>
      )}
    </>
  );
}
