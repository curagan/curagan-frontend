import { useRouter } from "next/router";
import { API_APPOINTMENT } from "@/lib/ApiLinks";
import { useState, useEffect, TextareaHTMLAttributes } from "react";
import axios from "axios";
import useSWR from "swr";
import { boolean } from "yup";

interface Appointment {
  appointmentId: string;
  patientID: string;
  datetime: Date;
  doctorID: string;
  message: string | null;
  status: string;
  patient: Patient;
  doctor: Doctor;
}

interface Patient {
  id: string;
  email: string;
  name: string;
  imageURL: string;
}

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
export default function RiwayatID() {
  const router = useRouter();
  const initState = {
    appointmentId: "",
    patientID: "",
    datetime: new Date(),
    doctorID: "",
    message: null,
    status: "",
    patient: {
      id: "",
      email: "",
      name: "",
      imageURL: "",
    },
    doctor: {
      id: "",
      email: "",
      specialization: "",
      name: "",
      imageURL: "",
      location: "",
      hospital: "",
      schedule: "",
    },
  };
  const { id } = router.query;
  const [appointmentData, setAppointmentData] =
    useState<Appointment>(initState);
  const [patientName, setPatientName] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [isRejected, setIsRejected] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const data = async () => {
      const response = await fetch(`${API_APPOINTMENT}/${id}`);
      const data = await response.json();
      setAppointmentData(await data);
      setPatientName(await data.patient.name);
      setDoctorName(await data.doctor.name);
    };
    data();
  }, [id]);

  const accept = async () => {
    const response = await fetch(`${API_APPOINTMENT}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        status: "Accepted",
        message: "Accept Appointment",
      }),
    });
  };

  const reject = async (message: string) => {
    const response = await fetch(`${API_APPOINTMENT}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        status: "Rejected",
        message: message,
      }),
    });
  };
  const rejectButton = () => {
    setIsRejected(true);
  };
  const handleMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div>
      <div className="p-4 rounded-lg border-black border-[1px] border-solid w-fit">
        {appointmentData ? (
          <div className="flex flex-col gap-2">
            <span>
              Patient Name:
              {patientName}
            </span>
            <span>Doctor Name: {doctorName}</span>
            <span>
              Date & Time:
              {String(appointmentData)}
            </span>
            <div className="flex flex-row justify-between">
              <button
                className="border-black border-[1px] border-solid w-fit rounded-md p-2 bg-green-300 hover:bg-green-500"
                onClick={accept}
              >
                Accept
              </button>
              <button
                className="border-black border-[1px] border-solid w-fit rounded-md p-2 bg-red-300 hover:bg-red-500"
                onClick={rejectButton}
              >
                Reject
              </button>
            </div>
            {isRejected ? (
              <input type="text" onChange={handleMessage}></input>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
