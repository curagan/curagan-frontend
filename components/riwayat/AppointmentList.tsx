import AppointmentInfoCard from './AppointmentInfoCard';

interface IAppointmentList {
  appointmentData: any;
  doctorsData: any;
  filterData: string;
}

export const AppointmentList = ({
  appointmentData,
  doctorsData,
  filterData,
}: IAppointmentList) => {
  const returnReversedAppointments = (data: any) => {
    const reversedData = [...data].reverse();

    return reversedData.map((appointment: any) => {
      if (filterData == 'All') {
        return (
          <AppointmentInfoCard
            key={appointment.appointmentId}
            appointment={appointment}
            doctorsData={doctorsData}
          />
        );
      } else {
        return (
          appointment.status == filterData && (
            <AppointmentInfoCard
              key={appointment.appointmentId}
              appointment={appointment}
              doctorsData={doctorsData}
            />
          )
        );
      }
    });
  };

  return (
    <div className="w-full flex flex-col gap-3">
      {returnReversedAppointments(appointmentData)}
    </div>
  );
};
