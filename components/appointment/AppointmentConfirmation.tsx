import { API_APPOINTMENT } from "@/lib/ApiLinks";
import axios from "axios";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import { io } from "socket.io-client";
import { useRouter } from "next/router";

interface IAppointmentConfirmation {
	selectedDate: string;
	doctorId: string;
	setDisplaySuccessAppointmentCard: Dispatch<SetStateAction<boolean>>;
}

interface Appointment {
	appointmentId: string;
}

export const AppointmentConfirmation = ({
	selectedDate,
	doctorId,
	setDisplaySuccessAppointmentCard,
}: IAppointmentConfirmation) => {
	const [disableSubmit, setDisableSubmit] = useState(false);
	const router = useRouter();

	const socket = io(":4000");

	const handleSubmit = async () => {
		const role = localStorage.getItem("role");

		// ignore appointment if role is doctor
		if (role == "doctor") return;

		setDisableSubmit(true);

		try {
			const response = await axios.post(
				API_APPOINTMENT,
				{
					patientID: localStorage.getItem("userId"),
					doctorID: doctorId,
					datetime: selectedDate,
					status: "Pending",
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);
			const data: Appointment = await response.data;

			setDisplaySuccessAppointmentCard(true);
			return data.appointmentId;
		} catch (error) {
			setDisableSubmit(false);
			console.log(error);
		}
	};

	const submit = async () => {
		const appointmentId = await handleSubmit();
		console.log(appointmentId);
		const targetId = router.query.id;
		const senderRole = localStorage.getItem("role");
		const message =
			senderRole === "patient"
				? `Asked For Appointment at ${selectedDate}`
				: "Has Take Action to Your Appointment";

		const data = {
			senderRole: senderRole,
			senderId: localStorage.getItem("userId"),
			targetId: targetId,
			targetRole: senderRole === "patient" ? "doctor" : "patient",
			message: message,
			appointmentId: appointmentId,
		};

		socket.emit("createAppointment", data);
	};

	return (
		<div className="w-full flex items-stretch justify-center gap-2">
			<Link
				href={"/beranda"}
				className="w-1/2 p-2 rounded-md text-sm text-center bg-red-600 text-white"
			>
				Kembali
			</Link>
			{disableSubmit ? (
				<button
					onClick={() => submit()}
					disabled
					className="w-1/2 p-2 rounded-md text-sm bg-slate-900 text-white bg-opacity-50"
				>
					Buat Appointment
				</button>
			) : (
				<button
					onClick={() => submit()}
					className="w-1/2 p-2 rounded-md text-sm bg-slate-900 text-white"
				>
					Buat Appointment
				</button>
			)}
		</div>
	);
};
