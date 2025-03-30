import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppointment } from '../context/AppointmentContext';
import { ClockIcon, CalendarIcon, UserIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

export default function AppointmentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { appointments, updateAppointment, deleteAppointment } = useAppointment();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    notes: ''
  });

  const appointment = appointments.find(apt => apt.id === parseInt(id));

  if (!appointment) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Appointment Not Found</h1>
          <button
            onClick={() => navigate('/calendar')}
            className="text-blue-600 hover:text-blue-700"
          >
            Return to Calendar
          </button>
        </div>
      </div>
    );
  }

  const handleEdit = () => {
    setFormData({
      patientName: appointment.patientName,
      patientEmail: appointment.patientEmail,
      patientPhone: appointment.patientPhone,
      notes: appointment.notes
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    updateAppointment(appointment.id, formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      deleteAppointment(appointment.id);
      navigate('/calendar');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">
                Appointment Details
              </h1>
              <div className="flex space-x-3">
                {!isEditing ? (
                  <>
                    <button
                      onClick={handleEdit}
                      className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={handleDelete}
                      className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Appointment Details */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="text-base font-medium text-gray-900">
                      {new Date(appointment.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <ClockIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="text-base font-medium text-gray-900">
                      {appointment.time}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Type</p>
                  <p className="text-base font-medium text-gray-900">
                    {appointment.type}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className={`
                    inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                  `}>
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Patient Information */}
              <div className="space-y-4">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        value={formData.patientName}
                        onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.patientEmail}
                        onChange={(e) => setFormData({ ...formData, patientEmail: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.patientPhone}
                        onChange={(e) => setFormData({ ...formData, patientPhone: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Notes
                      </label>
                      <textarea
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center space-x-3">
                      <UserIcon className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Patient Name</p>
                        <p className="text-base font-medium text-gray-900">
                          {appointment.patientName}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="text-base font-medium text-gray-900">
                          {appointment.patientEmail}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <PhoneIcon className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="text-base font-medium text-gray-900">
                          {appointment.patientPhone}
                        </p>
                      </div>
                    </div>

                    {appointment.notes && (
                      <div>
                        <p className="text-sm text-gray-500">Notes</p>
                        <p className="text-base text-gray-900">
                          {appointment.notes}
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 