import { API_APPOINTMENT } from "@/lib/ApiLinks";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

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
	const [appointmentData, setAppointmentData] = useState<Appointment[]>([]);
	const [isRejected, setIsRejected] = useState(false);
	const [message, setMessage] = useState("");
	useEffect(() => {
		const data = async () => {
			const response = await fetch(`${API_APPOINTMENT}/${router.query.id}`);
			const data = await response.json();
			setAppointmentData((prev) => [...prev, data]);
		};
		data();
	}, [router.query.id]);

	const accept = async () => {
		await fetch(`${API_APPOINTMENT}/${router.query.id}`, {
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

	const reject = async () => {
		console.log(message);
		await fetch(`${API_APPOINTMENT}/${router.query.id}`, {
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
	const handleMessage = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setMessage(event.target.value);
	};

	useEffect(() => {
		const id = router.query.id;
		console.log(id);
	}, []);

	return (
		<div className="flex min-h-screen justify-center items-center">
			<div className="p-4 rounded-lg border-black border-[1px] border-solid w-fit h-fit">
				{appointmentData
					? appointmentData.map((data) => {
							return (
								<div className="flex flex-col gap-2">
									<span>
										Patient Name:
										{data.patient.name}
									</span>
									<span>Doctor Name: {data.doctor.name}</span>
									<span>
										Date & Time:
										{String(data.datetime)}
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
										<>
											<select
												className="border-black border-solid border-[1px] rounded-md p-2"
												onChange={handleMessage}
											>
												<option value="">--Reason--</option>
												<option value="Full booked at desired time">
													Full booked at desired time
												</option>
												<option value="Doctor not on duty">
													Doctor not on duty
												</option>
												<option value="Out of doctor expertise">
													Out of doctor expertise
												</option>
												<option value="Unavailable">Unavailable</option>
											</select>
											<button
												className="border-black border-[1px] border-solid w-full rounded-md p-2 bg-red-300 hover:bg-red-500"
												onClick={() => reject()}
											>
												Submit
											</button>
										</>
									) : (
										""
									)}
								</div>
							);
					  })
					: ""}
			</div>
		</div>
	);
}
