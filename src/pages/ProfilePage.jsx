import React from 'react';
import { Link } from 'react-router-dom';
import { useAppointment } from '../context/AppointmentContext';
import { UserIcon, CalendarIcon, ClockIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

function AppointmentHistoryItem({ appointment }) {
  return (
    <Link
      to={`/appointments/${appointment.id}`}
      className="block bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium text-gray-900">{appointment.type}</h3>
        <span className={`
          inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
          ${appointment.status === 'confirmed' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-yellow-100 text-yellow-800'
          }
        `}>
          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
        </span>
      </div>
      <div className="text-sm text-gray-500">
        <p>{new Date(appointment.date).toLocaleDateString()} at {appointment.time}</p>
      </div>
    </Link>
  );
}

export default function ProfilePage() {
  const { appointments } = useAppointment();

  // Mock patient data (in a real app, this would come from user authentication)
  const patientData = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    address: '123 Main St, City, State 12345',
    dateOfBirth: '1990-01-01',
    lastVisit: '2024-02-15'
  };

  // Get all appointments for the current patient
  const patientAppointments = appointments.filter(apt => apt.patientEmail === patientData.email);

  // Sort appointments by date (newest first)
  const sortedAppointments = [...patientAppointments].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Profile Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
              <UserIcon className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{patientData.name}</h1>
              <p className="text-gray-500">Patient ID: #12345</p>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <EnvelopeIcon className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{patientData.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <PhoneIcon className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{patientData.phone}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="font-medium">{patientData.address}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date of Birth</p>
              <p className="font-medium">{new Date(patientData.dateOfBirth).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Visit</p>
              <p className="font-medium">{new Date(patientData.lastVisit).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Appointment History */}
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Appointment History</h2>
            <Link
              to="/calendar"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Book New Appointment
            </Link>
          </div>

          {sortedAppointments.length > 0 ? (
            <div className="space-y-4">
              {sortedAppointments.map(appointment => (
                <AppointmentHistoryItem key={appointment.id} appointment={appointment} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No appointments</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by booking a new appointment.</p>
              <div className="mt-6">
                <Link
                  to="/calendar"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 