import { AppointmentSuccessful } from '@/components/appointment/AppointmentSuccessful';
import { LayoutWrapper } from '@/components/layout/LayoutWrapper';

export default function test() {
  return (
    <LayoutWrapper>
      <div className="relative flex flex-col justify-between gap-4 p-3">
        <AppointmentSuccessful />
      </div>
    </LayoutWrapper>
  );
}
