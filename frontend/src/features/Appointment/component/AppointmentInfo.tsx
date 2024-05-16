import React, { useEffect } from 'react';
import { AppointmentApi } from '../../../types';
import {
  deleteAppointment,
  fetchAppointments,
  fetchOneAppointmentInfo,
  updateAppointment
} from '../appointmentThunk.ts';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { useParams } from 'react-router-dom';
import { selectOneAppointment } from '../appointmentSlice.ts';

interface Props {
  appointment: AppointmentApi;
}

const AppointmentInfo: React.FC<Props> = ({ appointment }) => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const appointmentInfo = useAppSelector(selectOneAppointment)

  useEffect(() => {
    if(id){
      dispatch(fetchOneAppointmentInfo(id));
    }
  }, [id]);

  const handleUpdateAppointment = async (appData: AppointmentApi) => {
    await dispatch(updateAppointment(appData));
    dispatch(fetchAppointments());
  };

  const handleDeleteAppointment = async (appData: AppointmentApi) => {
    await dispatch(deleteAppointment(appData._id));
    dispatch(fetchAppointments());
  };
  return (
    <div>
      <h2>Прием мастера</h2>
      <p><strong>Дата и время:</strong> {appointment.start.toLocaleString()}</p>
      <p><strong>Название услуги:</strong> {appointment.service.title}</p>
      {/* Добавьте другие поля при необходимости */}
    </div>
  );
};

export default AppointmentInfo;
