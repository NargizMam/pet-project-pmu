// import { useEffect, useState } from 'react';
// import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
// import { fetchAppointments } from './appointmentThunk.ts';
// import { selectAppointmentsList } from './appointmentSlice.ts';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import AppointmentModal from './component/AppointmentModal.tsx';
// import { useNavigate } from 'react-router-dom';
//
// const AppointmentCalendar = () => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const appointmentsList = useAppSelector(selectAppointmentsList);
//   const [showModal, setShowModal] = useState(false);
//
// if(showModal){
//   console.log('11111');
// }
//   useEffect(() => {
//     dispatch(fetchAppointments());
//   }, [dispatch]);
//
//   const handleDateClick = (arg: any) => {
//     const id = arg._def.extendedProps._id
//     setShowModal(true);
//     navigate(`/appointments/${id}`)
//   };
//
//   if(appointmentsList){
// appointmentsList.map(appData => {
//       const appResource = {
//         title: appData.service.title,
//         start: new Date('2024-05-12T10:00:00'),
//         end: new Date('2024-05-12T10:30:00'),
//       }
//       return appResource;
//     })}
//
//    const handleCreateAppointment = async () => {
//      console.log('handle');
//     // await dispatch(createAppointment(appData));
//     // dispatch(fetchAppointments());
//   };
//
//
//   return (
//     <>
//       <FullCalendar
//         plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//         headerToolbar={{
//           left: 'prev,next today',
//           center: 'title',
//           right: 'dayGridMonth,timeGridWeek,timeGridDay'
//         }}
//         initialView='dayGridMonth'
//         editable={true}
//         selectable={true}
//         selectMirror={true}
//         dayMaxEvents={true}
//         datesSet={handleDates}
//         select={handleDateSelect}
//         events={events}
//         eventContent={renderEventContent}
//         eventClick={handleEventClick}
//         eventAdd={handleEventAdd}
//         eventChange={handleEventChange}
//         eventRemove={handleEventRemove}
//       />
//       <AppointmentModal open={showModal} onClose={() => setShowModal(false)} />
//     </>
//   );
// };
//
// export default AppointmentCalendar;
