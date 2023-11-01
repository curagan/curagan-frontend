import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { LayoutWrapper } from "@/components/layout/LayoutWrapper";

interface Notification {
	notificationId: string;
	message: string;
	senderId: string;
	senderRole: string;
	targetId: string;
	targetRole: string;
	appointmentId: string;
}

interface Patient {
	name: string;
}

export default function Notifikasi() {
	const [notification, setNotification] = useState<Notification[]>([]);
	const socket = io(":4000");
	const lastNotificationIdRef = useRef<string | null>(null);
	const [dataReady, setDataReady] = useState(false);
	const [notificationMessage, setNotificationMessage] = useState<string[]>([]);

	const initFetchNotification = async () => {
		const response = await fetch(
			`http://localhost:4000/notification/${localStorage.getItem("userId")}`
		);
		const data = await response.json();
		setNotification(data);
	};

	useEffect(() => {
		initFetchNotification();
		setDataReady(true);
	}, []);

	useEffect(() => {
		const data = {
			role: localStorage.getItem("role"),
			userId: localStorage.getItem("userId"),
		};
		socket.emit("identifyUser", data);
	}, []);

	const notifMessage = async (senderId: string, message: string) => {
		const response = await fetch(`http://localhost:4000/patient/${senderId}`);
		const data: Patient = await response.json();
		setNotificationMessage((prev) => [...prev, `${data.name} ${message}`]);
	};

	useEffect(() => {
		socket.on("notification", (message: Notification) => {
			if (message.notificationId !== lastNotificationIdRef.current) {
				// Only add the new notification if it's not a duplicate
				lastNotificationIdRef.current = message.notificationId;
				setNotification((prev) => [...prev, message]);
			}
		});
	}, []);

	useEffect(() => {
		setNotificationMessage([]);
		notification.map((notif) => {
			notifMessage(notif.senderId, notif.message);
		});
	}, [notification]);

	return (
		<LayoutWrapper>
			<div>
				<div className="w-full text-lg font-bold flex justify-center mb-8">
					<p>Notification</p>
				</div>
				<div className="flex flex-col gap-4">
					{dataReady
						? notificationMessage.map((notif, idx) => {
								return (
									<a
										href={`/detail/${notification[idx].appointmentId}`}
										key={idx}
									>
										<div className="border-solid border-gray-500 border-[1px]">
											{notif}
										</div>
									</a>
								);
						  })
						: ""}
				</div>
			</div>
		</LayoutWrapper>
	);
}
