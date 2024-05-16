import { useEffect } from 'react';
import { AppointmentApiFullInfo } from '../../../types';
import { deleteAppointment, fetchAppointments, fetchOneAppointmentInfo } from '../appointmentThunk.ts';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { useParams } from 'react-router-dom';
import { selectOneAppointment } from '../appointmentSlice.ts';


const AppointmentInfo = () => {
  const dispatch = useAppDispatch();
  const {id} = useParams();
  const appointment = useAppSelector(selectOneAppointment);
  console.log(id);
  useEffect(() => {
    if (id) {
      dispatch(fetchOneAppointmentInfo(id));
    }
  }, [id]);

  // const handleUpdateAppointment = async (appData: AppointmentApiFullInfo) => {
  //   await dispatch(updateAppointment(appData));
  //   dispatch(fetchAppointments());
  // };

  const handleDeleteAppointment = async (appData: AppointmentApiFullInfo) => {
    await dispatch(deleteAppointment(appData._id));
    dispatch(fetchAppointments());
  };

  return (
    appointment ? (
      <div>
        <h2>Прием мастера</h2>
        <p><strong>Дата и время:</strong> {new Date(appointment.date).toLocaleString()}</p>
        <p><strong>Название услуги:</strong> {appointment.service.title}</p>
        <p><strong>Мастер:</strong> {appointment.master.name}</p>
        <p><strong>Клиент:</strong> {appointment.client.name}</p>
        <p><strong>Телефон клиента:</strong> {appointment.client.phone}</p>
        <p><strong>Статус:</strong> {appointment.status}</p>
        <button >Обновить</button>
        <button onClick={() => handleDeleteAppointment(appointment)}>Удалить</button>
      </div>
    ) : (
      <h1>Информация о записи не найдена</h1>
    )
  );
};

export default AppointmentInfo;
