import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDaysInMonth,
  getDay,
  addDays,
  isSameMonth,
} from 'date-fns';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { API_DOCTOR } from '../../lib/ApiLinks';
import TimeDropdown from '../jadwal/TimeDropdown';
import { useRouter } from 'next/router';

type Schedule = {
  date: string;
  month: string;
  year: string;
  time: string[];
};

const validationSchema = yup.object().shape({
  date: yup.string().required(),
  month: yup.string().required(),
  year: yup.string().required(),
  time: yup.array().of(yup.string()).required(),
});

type CalendarComponentProps = {
  schedule: Schedule[];
};
const CalendarComponent: React.FC<CalendarComponentProps> = ({ schedule }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState<Date[]>([]);
  const [filteredSchedules, setFilteredSchedules] = useState<Schedule[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [dayOptions, setDayOptions] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [refreshOptions, setRefreshOptions] = useState(false);
  const { control, handleSubmit, formState } = useForm<Schedule>({
    resolver: yupResolver(validationSchema) as any,
  });
  const { errors } = formState;
  const router = useRouter();

  const fetchDataFromAPI = async () => {
    const doctorId = localStorage.getItem('doctorId');
    const token = localStorage.getItem('token');
    if (!doctorId || !token) {
      console.log('Missing doctorId or token');
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.get(`${API_DOCTOR}/${doctorId}`, config);
      const scheduleData = JSON.parse(response.data.schedule);
      setFilteredSchedules(scheduleData);
    } catch (error: any) {
      console.log('Error fetching schedule:', error.message);
    }
  };

  useEffect(() => {
    fetchDataFromAPI();
  }, []);
  const openModal = () => {
    setIsModalOpen(true);

    setSelectedMonth(new Date().getMonth() + 1);
    setSelectedYear(new Date().getFullYear());
  };

  const closeModal = () => {
    setIsModalOpen(false);

    setSelectedMonth(null);
    setSelectedYear(null);
  };

  const handleFormSubmit: SubmitHandler<Schedule> = async (data: Schedule) => {
    const doctorId = localStorage.getItem('doctorId');
    const token = localStorage.getItem('token');

    if (!doctorId || !token) {
      console.log('Missing doctorId or token');
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    const paddedDate = data.date.padStart(2, '0');
    const paddedMonth = data.month.toString().padStart(2, '0');

    const formattedTimes = data.time.map((time) => time.replace('.', ':'));

    const newSchedule: Schedule = {
      ...data,
      date: paddedDate,
      month: paddedMonth,
      time: formattedTimes,
    };

    const existingSchedules = [...(filteredSchedules ?? [])];
    existingSchedules.push(newSchedule);

    console.log('Sending this data: ', existingSchedules);

    try {
      const response = await axios.put(
        `${API_DOCTOR}/${doctorId}`,
        { schedule: existingSchedules },
        config,
      );

      if (response.status === 200) {
        console.log('Schedule added successfully');
        setFilteredSchedules(existingSchedules);
        closeModal();
      }
    } catch (error: any) {
      console.log('Error updating schedule:', error.message);
    }
  };

  useEffect(() => {
    const getDaysInSelectedMonth = () => {
      if (selectedMonth !== null && selectedYear !== null) {
        return getDaysInMonth(new Date(selectedYear, selectedMonth - 1));
      }
      return 31;
    };

    const newDayOptions = Array.from(
      { length: getDaysInSelectedMonth() },
      (_, i) => i + 1,
    );

    setDayOptions(newDayOptions);
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    setCalendarDays(eachDayOfInterval({ start, end }));
  }, [currentDate]);

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const timeSlots = Array.from(
    { length: 25 },
    (_, i) => i.toString().padStart(2, '0') + ':00',
  );

  const monthNames = Array.from({ length: 12 }, (_, i) =>
    format(new Date(2022, i, 1), 'MMMM'),
  );

  useEffect(() => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);

    const firstDayOfMonth = getDay(start);

    const placeholders = Array.from({ length: firstDayOfMonth }, (_, i) =>
      addDays(start, i - firstDayOfMonth),
    );

    const daysOfMonth = eachDayOfInterval({ start, end });

    setCalendarDays([...placeholders, ...daysOfMonth]);
  }, [currentDate]);

  const goToAppointments = (date: Date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');

    router.push(`/jadwal/janji-temu/${formattedDate}`);
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <button onClick={prevMonth}>&lt;</button>
        <span>{format(currentDate, 'MMMM yyyy')}</span>
        <button onClick={nextMonth}>&gt;</button>
        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          onClick={openModal}
        >
          {' '}
          tambah jadwal
        </button>
      </div>
      <div className="grid grid-cols-7 gap-4">
        <div className="text-red-500 font-medium">Minggu</div>
        <div className="font-medium">Senin</div>
        <div className="font-medium">Selasa</div>
        <div className="font-medium">Rabu</div>
        <div className="font-medium">Kamis</div>
        <div className="font-medium">Jumat</div>
        <div className="font-medium">Sabtu</div>
      </div>
      {isModalOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center"
          onClick={closeModal}
        >
          <div
            className="bg-white p-4 rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <span
              className="absolute top-1 right-1 cursor-pointer"
              onClick={closeModal}
            >
              &times;
            </span>
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Date
                </label>
                <Controller
                  name="date"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <select
                      {...field}
                      className="mt-1 p-2 w-full border rounded-md"
                    >
                      <option value="" disabled selected>
                        Select Date
                      </option>
                      {dayOptions.map((date) => (
                        <option key={date} value={date}>
                          {date}
                        </option>
                      ))}
                    </select>
                  )}
                />
                {errors?.date && (
                  <p className="text-red-600">Please select a day.</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Month
                </label>
                <Controller
                  name="month"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <select
                      {...field}
                      className="mt-1 p-2 w-full border rounded-md"
                    >
                      <option value="" disabled selected>
                        Select Month
                      </option>
                      {monthNames.map((month, index) => (
                        <option key={index} value={index + 1}>
                          {month}
                        </option>
                      ))}
                    </select>
                  )}
                />
                {errors?.month && (
                  <p className="text-red-600">Please select a month.</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Year
                </label>
                <Controller
                  name="year"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <select
                      {...field}
                      className="mt-1 p-2 w-full border rounded-md"
                    >
                      <option value="" disabled selected>
                        Select Year
                      </option>
                      {Array.from(
                        { length: 11 },
                        (_, i) => new Date().getFullYear() + i,
                      ).map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  )}
                />
                {errors?.year && (
                  <p className="text-red-600">Please select a year.</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Time
                </label>
                <Controller
                  name="time"
                  control={control}
                  defaultValue={[]}
                  render={({ field }) => (
                    <TimeDropdown
                      timeSlots={timeSlots}
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
                    />
                  )}
                />
                {errors?.time && (
                  <p className="text-red-600">Please select a time.</p>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  TAMBAH JADWAL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="grid grid-cols-7 gap-4">
        {calendarDays.map((day, index) => {
          const isScheduled = Array.isArray(filteredSchedules)
            ? filteredSchedules.some(
                (item) =>
                  parseInt(item.date) === day.getDate() &&
                  parseInt(item.month) === day.getMonth() + 1 &&
                  parseInt(item.year) === day.getFullYear(),
              )
            : false;

          const isCurrentMonth = isSameMonth(day, currentDate);
          const formattedDate = format(day, 'yyyy-MM-dd');

          return (
            <div
              key={index}
              className={`p-4 border cursor-pointer ${
                isScheduled ? 'bg-blue-200' : ''
              } ${!isCurrentMonth ? 'bg-gray-300' : ''}`}
              onClick={() => {
                if (isScheduled) {
                  router.push(`/jadwal/janji-temu/${formattedDate}`);
                }
              }}
            >
              {day.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarComponent;
