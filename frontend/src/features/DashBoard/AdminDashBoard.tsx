import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AppointmentApi } from '../../types';

const AdminPanel: React.FC = () => {
  const [appointments, setAppointments] = useState<AppointmentApi[]>([]);

  useEffect(() => {
    axios.get('/api/appointments').then(response => {
      setAppointments(response.data);
    });
  }, []);

  const handleStatusChange = (appointmentId: string, status: string) => {
    axios.put(`/api/appointments/${appointmentId}`, { status }).then(response => {
      setAppointments(prev =>
        prev.map(app =>
          app._id === appointmentId ? { ...app, status: response.data.status } : app
        )
      );
    });
  };

  return (
    <div>
      <h1>Записи</h1>
      <table>
        <thead>
        <tr>
          <th>Мастер</th>
          <th>Клиент</th>
          <th>Дата</th>
          <th>Время</th>
          <th>Статус</th>
          <th>Действия</th>
        </tr>
        </thead>
        <tbody>
        {appointments.map(app => (
          <tr key={app._id}>
            <td>{app.master}</td>
            <td>{app.client}</td>
            <td>{app.date.toISOString()}</td>
            <td>{app.time}</td>
            <td>{app.status}</td>
            <td>
              <button onClick={() => handleStatusChange(app._id, 'confirmed')}>Подтвердить</button>
              <button onClick={() => handleStatusChange(app._id, 'cancelled')}>Отменить</button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
