// import { useEffect } from 'react';
// import {
//   Day,
//   Inject,
//   Month,
//   ScheduleComponent,
//   ViewDirective,
//   ViewsDirective,
//   Week
// } from '@syncfusion/ej2-react-schedule';
// import { AppointmentApi } from '../../types';
// import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
// import { createAppointment, deleteAppointment, fetchAppointments, updateAppointment } from './appointmentThunk.ts';
// import { selectAppointmentsFetching, selectAppointmentsList } from './appointmentSlice.ts';
//
// const AppointmentReactSchedule = () => {
//   const dispatch = useAppDispatch();
//   const appointmentsList = useAppSelector(selectAppointmentsList);
//
//   let appointments;
//
//   useEffect(() => {
//     dispatch(fetchAppointments());
//   }, [dispatch]);
//
//   if(appointmentsList){
//     appointments = appointmentsList.map(appData => {
//       const appResource = {
//         _id: appData.service,
//         StartTime: new Date('2024-05-12T10:00:00'),
//         EndTime: new Date('2024-05-12T10:30:00'),
//         Subject: appData.service,
//         Duration: 30,
//         Description: appData.notes,
//         Status: appData.status,
//         Attendees: appData.client,
//       }
//       return appResource;
//   })};
//
//   const handleCreateAppointment = async (appData: AppointmentApi) => {
//     await dispatch(createAppointment(appData));
//     dispatch(fetchAppointments());
//   };
//
//   const handleUpdateAppointment = async (appData: AppointmentApi) => {
//     await dispatch(updateAppointment(appData));
//     dispatch(fetchAppointments());
//   };
//
//   const handleDeleteAppointment = async (appData: AppointmentApi) => {
//     await dispatch(deleteAppointment(appData._id));
//     dispatch(fetchAppointments());
//   };
//
//   return (
//     <div className="App">
//       <ScheduleComponent
//         currentView='Month'
//         eventSettings={{ dataSource: appointments }}
//         actionComplete={(args) => {
//           if (args.requestType === 'eventCreated') {
//             handleCreateAppointment(args.data);
//           } else if (args.requestType === 'eventChanged') {
//             handleUpdateAppointment(args.data);
//           } else if (args.requestType === 'eventRemoved') {
//             handleDeleteAppointment(args.data);
//           }
//         }}
//       >
//         <ViewsDirective>
//           <ViewDirective option='Month'/>
//         </ViewsDirective>
//         <Inject services={[Day, Week, Month]}/>
//       </ScheduleComponent>
//     </div>
//   );
// };
//
// export default AppointmentReactSchedule;
