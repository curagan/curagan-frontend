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
} from 'date-fns';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { API_DOCTOR } from '../../lib/ApiLinks';

type Schedule = {
  date: string;
  month: string;
  year: string;
  time: string;
};

const validationSchema = yup.object().shape({
  date: yup.string().required(),
  month: yup.string().required(),
  year: yup.string().required(),
  time: yup.string().required(),
});

type CalendarComponentProps = {
  schedule: Schedule[];
};

const CalendarComponent: React.FC<CalendarComponentProps> = ({ schedule }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState<Date[]>([]);
  const [filteredSchedules, setFilteredSchedules] = useState<Schedule[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { control, handleSubmit, errors } = useForm<Schedule>({
    resolver: yupResolver(validationSchema),
  }) as any;

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

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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

    // Combining existing schedules with new one
    const existingSchedules = [...(filteredSchedules ?? [])];
    existingSchedules.push(data);

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

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <button onClick={prevMonth}>&lt;</button>
        <span>{format(currentDate, 'MMMM yyyy')}</span>
        <button onClick={nextMonth}>&gt;</button>
        <button onClick={openModal}>+ tambah jadwal</button>
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
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <label>
                Date:
                <Controller
                  name="date"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="DD"
                      className="your-input-class"
                    />
                  )}
                />
                {errors?.date && <p>Please select a day.</p>}{' '}
              </label>
              <label>
                Month:
                <Controller
                  name="month"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <select {...field}>
                      {monthNames.map((month, index) => (
                        <option key={index} value={index + 1}>
                          {month}
                        </option>
                      ))}
                    </select>
                  )}
                />
                {errors?.month && <p>Please select a month.</p>}
              </label>
              <label>
                Year:
                <Controller
                  name="year"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <select {...field}>
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
                {errors?.year && <p>Please select a year.</p>}
              </label>
              <label>
                Time:
                <Controller
                  name="time"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <select {...field}>
                      {timeSlots.map((time, index) => (
                        <option key={index} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  )}
                />
                {errors?.time && <p>Please select a time.</p>}
              </label>
              {errors?.time && <p>Please select a time.</p>}{' '}
              <button type="submit">TAMBAH JADWAL</button>
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

          return (
            <div
              key={index}
              className={`p-4 border ${isScheduled ? 'bg-blue-200' : ''}`}
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
