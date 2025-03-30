import React, { createContext, useContext, useState } from 'react';

const AppointmentContext = createContext();

// Mock data for initial appointments
const mockAppointments = [
  {
    id: 1,
    date: '2024-03-20',
    time: '10:00',
    type: 'Cleaning',
    status: 'confirmed',
    patientName: 'John Doe',
    patientEmail: 'john@example.com',
    patientPhone: '123-456-7890',
    notes: 'Regular cleaning appointment'
  },
  {
    id: 2,
    date: '2024-03-22',
    time: '14:30',
    type: 'Check-up',
    status: 'pending',
    patientName: 'Jane Smith',
    patientEmail: 'jane@example.com',
    patientPhone: '098-765-4321',
    notes: 'Annual dental check-up'
  }
];

// Available time slots
const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
];

// Appointment types
const appointmentTypes = [
  'Cleaning',
  'Check-up',
  'Whitening',
  'Filling',
  'Root Canal',
  'Crown',
  'Emergency'
];

export function AppointmentProvider({ children }) {
  const [appointments, setAppointments] = useState(mockAppointments);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    type: 'all'
  });
  const [searchQuery, setSearchQuery] = useState('');

  const addAppointment = (appointment) => {
    const newAppointment = {
      ...appointment,
      id: Date.now().toString(),
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };
    setAppointments([...appointments, newAppointment]);
  };

  const updateAppointment = (id, updatedData) => {
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, ...updatedData } : apt
    ));
  };

  const deleteAppointment = (id) => {
    setAppointments(appointments.filter(apt => apt.id !== id));
  };

  const getAppointmentsByDate = (date) => {
    return appointments.filter(apt => apt.date === date);
  };

  const getAvailableTimeSlots = (date) => {
    const bookedTimes = getAppointmentsByDate(date).map(apt => apt.time);
    return timeSlots.filter(time => !bookedTimes.includes(time));
  };

  const editAppointment = (id, updatedAppointment) => {
    setAppointments(appointments.map(apt => 
      apt.id === id ? {
        ...apt,
        ...updatedAppointment,
        date: updatedAppointment.date,
        time: updatedAppointment.time,
        updatedAt: new Date().toISOString()
      } : apt
    ));
  };

  const value = {
    appointments,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    selectedType,
    setSelectedType,
    filters,
    setFilters,
    searchQuery,
    setSearchQuery,
    timeSlots,
    appointmentTypes,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    getAppointmentsByDate,
    getAvailableTimeSlots,
    editAppointment
  };

  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  );
}

export function useAppointment() {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('useAppointment must be used within an AppointmentProvider');
  }
  return context;
} 