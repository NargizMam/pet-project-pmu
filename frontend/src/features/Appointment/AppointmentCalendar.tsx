import { useEffect, useState } from 'react';
import { AppointmentApi } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { createAppointment, fetchAppointments } from './appointmentThunk.ts';
import { selectAppointmentsList } from './appointmentSlice.ts';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import AppointmentModal from './component/AppointmentModal.tsx';
import { useNavigate } from 'react-router-dom';

const AppointmentCalendar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const appointmentsList = useAppSelector(selectAppointmentsList);
  const [showModal, setShowModal] = useState(false);

if(showModal){
  console.log('11111');
}
  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  const handleDateClick = (id: string) => {
    setShowModal(true);
    console.log(id);
    navigate(`/appointments/${id}`);

  };

  if(appointmentsList){
appointmentsList.map(appData => {
      const appResource = {
        title: appData.service.title,
        start: new Date('2024-05-12T10:00:00'),
        end: new Date('2024-05-12T10:30:00'),
      }
      return appResource;
    })}

   const handleCreateAppointment = async (appData: AppointmentApi) => {
    await dispatch(createAppointment(appData));
    dispatch(fetchAppointments());
  };


  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: 'today prev,next',
          center: 'title',
          end: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        height="90vh"
        events={appointmentsList}
        eventDidMount={(e) => handleDateClick(e.event.id)}
      />
      <AppointmentModal open={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default AppointmentCalendar;
