import { API, API_APPOINTMENT, API_PATIENT } from '@/lib/ApiLinks';
import axios from 'axios';
import Link from 'next/link';
import { Dispatch, SetStateAction, useState } from 'react';
import { io } from 'socket.io-client';

interface IAppointmentConfirmation {
  selectedDate: string;
  doctorId: string;
  doctorName: string;
  setDisplaySuccessAppointmentCard: Dispatch<SetStateAction<boolean>>;
}

export const AppointmentConfirmation = ({
  selectedDate,
  doctorId,
  doctorName,
  setDisplaySuccessAppointmentCard,
}: IAppointmentConfirmation) => {
  const [disableSubmit, setDisableSubmit] = useState(false);

  // Init socket.io
  const socket = io(API);

  const createAppointment = async () => {
    // ignore appointment if role is doctor
    const role = localStorage.getItem('role');
    if (role == 'doctor') return;

    // Get current user ID & token
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    // disable submit button
    setDisableSubmit(true);

    try {
      const response = await axios.post(
        API_APPOINTMENT,
        {
          patientID: userId,
          doctorID: doctorId,
          datetime: selectedDate,
          status: 'Pending',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.data;
      return data.appointmentId;
    } catch (error) {
      setDisableSubmit(false);
      console.log(error);
      return undefined;
    }
  };

  const handleSubmit = async () => {
    // Get appointmentId
    const appointmentId = await createAppointment();
    // Don't create notification if there's an error
    if (appointmentId == undefined) return;

    // Get current user role & ID
    const role = localStorage.getItem('role');
    const userId = localStorage.getItem('userId');

    // Get patient data
    const patientDataResponse = await axios.get(`${API_PATIENT}/${userId}`);
    const patientData = await patientDataResponse.data;

    // Create message templates for each role
    const messageToDoctor = {
      text: 'Ada pasien yang ingin berkonsultasi dengan anda',
      name: patientData.name,
      date: selectedDate,
      status: 'Pending',
    };
    const messageToPatient = {
      text: 'Permintaan konsultasi telah dikirim. Dokter akan memproses permintaan anda secepatnya.',
      name: doctorName,
      date: selectedDate,
      status: 'Pending',
    };

    // Send appointment notification to doctor
    socket.emit('createAppointment', {
      senderRole: role,
      senderId: userId,
      targetId: doctorId,
      targetRole: 'doctor',
      message: JSON.stringify(messageToDoctor),
      appointmentId: appointmentId,
      createdAt: String(new Date().toUTCString()),
    });

    // Send appointment notification to current user
    socket.emit('createAppointment', {
      senderRole: role,
      senderId: userId,
      targetId: userId,
      targetRole: 'patient',
      message: JSON.stringify(messageToPatient),
      appointmentId: appointmentId,
      createdAt: String(new Date().toUTCString()),
    });

    // Display appointment successful card
    setDisplaySuccessAppointmentCard(true);
  };

  return (
    <div className="w-full flex items-stretch justify-center gap-2">
      <Link
        href={'/beranda'}
        className="w-1/2 p-2 rounded-md text-sm text-center bg-red-600 text-white"
      >
        Kembali
      </Link>
      {disableSubmit ? (
        <button
          onClick={() => handleSubmit()}
          disabled
          className="w-1/2 p-2 rounded-md text-sm bg-slate-900 text-white bg-opacity-50"
        >
          Diproses...
        </button>
      ) : (
        <button
          onClick={() => handleSubmit()}
          className="w-1/2 p-2 rounded-md text-sm bg-slate-900 text-white"
        >
          Buat Appointment
        </button>
      )}
    </div>
  );
};
