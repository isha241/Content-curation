import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAppointment } from '../context/AppointmentContext';
import { ArrowLeftIcon, ClockIcon, CalendarIcon, UserIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

export default function AppointmentDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { appointments } = useAppointment();

  const appointment = appointments.find(apt => apt.id === id);

  if (!appointment) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Appointment Not Found</h2>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-1" />
        Back
      </button>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">{appointment.type}</h1>
            <span className={`
              inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
              ${appointment.status === 'confirmed' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
              }
            `}>
              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
            </span>
          </div>
        </div>

        {/* Appointment Details */}
        <div className="px-6 py-4 space-y-6">
          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <CalendarIcon className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">{new Date(appointment.date).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <ClockIcon className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p className="font-medium">{appointment.time}</p>
              </div>
            </div>
          </div>

          {/* Patient Information */}
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Patient Information</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <UserIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{appointment.patientName}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <PhoneIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{appointment.patientPhone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{appointment.patientEmail}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          {appointment.notes && (
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Notes</h2>
              <p className="text-gray-600">{appointment.notes}</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex justify-end space-x-3">
            <Link
              to={`/appointments/${id}/edit`}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Edit Appointment
            </Link>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 