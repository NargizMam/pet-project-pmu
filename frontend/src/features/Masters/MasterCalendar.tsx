// import React, { useEffect } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import { useAppDispatch, useAppSelector } from '../../app/hooks';
// import { Box, CircularProgress, Typography } from '@mui/material';
// import ErrorIcon from '@mui/icons-material/Error';
// import { Slot } from '../../types';
// import { selectMasterSchedule, selectMastersError, selectMastersLoading } from './mastersSlice.ts';
// import { fetchMasterSchedule } from './mastersThunk.ts';
//
// interface CalendarProps {
//   masterId: string;
// }
//
// const MasterCalendar: React.FC<CalendarProps> = ({ masterId }) => {
//   const dispatch = useAppDispatch();
//   const slots = useAppSelector((state) => selectMasterSchedule(state, masterId));
//   const loading = useAppSelector(selectMastersLoading);
//   const error = useAppSelector(selectMastersError);
//
//   console.log(slots);
//
//   // useEffect(() => {
//   //   dispatch(fetchMasterSchedule(masterId));
//   // }, [dispatch]);
//
//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//         <CircularProgress />
//       </Box>
//     );
//   }
//
//   if (error) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//         <ErrorIcon color="error" />
//         <Typography variant="h6" color="error">
//           {error.error}
//         </Typography>
//       </Box>
//     );
//   }
//
//   const events = slots
//     ? slots.map((slot: Slot) => ({
//       title: `Available Slots: ${slot.availableSlots.join(', ')}`,
//       start: slot.date,
//       allDay: true,
//     }))
//     : [];
//
//   // const handleDateSelect = (selectInfo: DateSelectArg) => {
//   //   console.log(selectInfo);
//   //   // Implement the logic to open a booking form modal
//   // };
//
//   return (
//     <FullCalendar
//       plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//       initialView="dayGridMonth"
//       events={events}
//     />
//   );
// };
//
// export default MasterCalendar;
