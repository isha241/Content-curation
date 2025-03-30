import React, { useState } from 'react';
import { useAppointment } from '../context/AppointmentContext';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

function CalendarDay({ date, isSelected, hasAppointments, onClick, isPastDate }) {
  const day = new Date(date).getDate();
  const isToday = new Date(date).toDateString() === new Date().toDateString();

  return (
    <button
      onClick={onClick}
      disabled={isPastDate}
      className={`
        relative w-full aspect-square p-2 text-center rounded-lg
        ${isSelected ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-500' : 'hover:bg-gray-50'}
        ${isToday ? 'border-2 border-blue-500' : ''}
        ${isPastDate ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : ''}
        transition-colors duration-200
      `}
    >
      <span className="text-sm font-medium">{day}</span>
      {hasAppointments && !isPastDate && (
        <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
      )}
    </button>
  );
}

function TimeSlot({ time, isAvailable, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={!isAvailable}
      className={`
        w-full py-2 px-3 rounded-lg text-sm font-medium transition-colors
        ${isAvailable
          ? isSelected
            ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-500'
            : 'hover:bg-gray-100'
          : 'bg-gray-50 text-gray-400 cursor-not-allowed'
        }
      `}
    >
      {time}
    </button>
  );
}

export default function CalendarPage() {
  const navigate = useNavigate();
  const {
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    selectedType,
    setSelectedType,
    appointments,
    appointmentTypes,
    getAppointmentsByDate,
    getAvailableTimeSlots,
    addAppointment
  } = useAppointment();

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    // Add days from previous month
    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push(new Date(year, month, -i));
    }

    // Add days from current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    // Add empty cells for the remaining days in the grid
    const remainingDays = 42 - days.length;
    for (let i = 0; i < remainingDays; i++) {
      days.push(null);
    }

    return days;
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + direction));
  };

  const handleDateSelect = (date) => {
    // Create date objects for comparison, setting time to midnight
    const compareDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
    const compareToday = new Date();
    compareToday.setHours(0, 0, 0, 0);

    // Only allow selection if the date is today or in the future
    if (compareDate.getTime() >= compareToday.getTime()) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      setSelectedDate(`${year}-${month}-${day}`);
    }
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
  };

  const handleBookAppointment = () => {
    if (!selectedDate || !selectedTime || !selectedType) return;

    const newAppointment = {
      date: selectedDate,
      time: selectedTime,
      type: selectedType,
      status: 'confirmed',
      patientName: 'John Doe',
      patientEmail: 'john@example.com',
      patientPhone: '123-456-7890',
      notes: ''
    };

    addAppointment(newAppointment);
    setBookingDetails(newAppointment);
    setShowConfirmation(true);
  };

  const handleConfirmBooking = () => {
    setShowConfirmation(false);
    navigate('/');
  };

  const days = getDaysInMonth(currentMonth);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => navigateMonth(-1)}
                  className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <ChevronLeftIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => navigateMonth(1)}
                  className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <ChevronRightIcon className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-0.5 mb-1">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                <div key={day} className="text-center text-xs font-medium text-gray-500">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-0.5">
              {days.map((date, index) => {
                if (!date) {
                  return <div key={index} className="w-full aspect-square" />;
                }

                const dateString = date.toISOString().split('T')[0];
                const hasAppointments = getAppointmentsByDate(dateString).length > 0;
                const isSelected = dateString === selectedDate;
                
                // Create date objects for comparison, setting time to midnight
                const compareDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
                const compareToday = new Date();
                compareToday.setHours(0, 0, 0, 0);
                
                const isPastDate = compareDate.getTime() < compareToday.getTime();

                return (
                  <CalendarDay
                    key={index}
                    date={date}
                    isSelected={isSelected}
                    hasAppointments={hasAppointments}
                    onClick={() => handleDateSelect(date)}
                    isPastDate={isPastDate}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Time Slots and Appointment Type Section */}
        <div className="space-y-4">
          {/* Time Slots */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-base font-medium text-gray-900 mb-3">Available Time Slots</h3>
            <div className="grid grid-cols-2 gap-1.5">
              {getAvailableTimeSlots(selectedDate).map(time => (
                <TimeSlot
                  key={time}
                  time={time}
                  isAvailable={true}
                  isSelected={time === selectedTime}
                  onClick={() => handleTimeSelect(time)}
                />
              ))}
            </div>
          </div>

          {/* Appointment Types */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-base font-medium text-gray-900 mb-3">Appointment Type</h3>
            <div className="space-y-1.5">
              {appointmentTypes.map(type => (
                <button
                  key={type}
                  onClick={() => handleTypeSelect(type)}
                  className={`
                    w-full py-1.5 px-3 rounded-lg text-sm font-medium text-left transition-colors
                    ${selectedType === type
                      ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-500'
                      : 'hover:bg-gray-100'
                    }
                  `}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Book Appointment Button */}
          <button
            onClick={handleBookAppointment}
            disabled={!selectedDate || !selectedTime || !selectedType}
            className={`
              w-full py-2.5 px-4 rounded-lg text-white font-medium transition-colors
              ${selectedDate && selectedTime && selectedType
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-300 cursor-not-allowed'
              }
            `}
          >
            Book Appointment
          </button>
        </div>
      </div>

      {/* Booking Confirmation Modal */}
      {showConfirmation && bookingDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-5">
            <div className="flex items-center justify-center mb-4">
              <CheckCircleIcon className="h-12 w-12 text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-4">Appointment Confirmed!</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">
                  {new Date(bookingDetails.date + 'T00:00:00').toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p className="font-medium">{bookingDetails.time}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Type</p>
                <p className="font-medium">{bookingDetails.type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Confirmed
                </span>
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleConfirmBooking}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 