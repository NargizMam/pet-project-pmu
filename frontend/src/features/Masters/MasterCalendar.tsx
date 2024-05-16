import React, { useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import EventInput from "@fullcalendar/react"
import DateSelectArg from "@fullcalendar/react"
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Box, CircularProgress, Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import { Slot } from '../../types';
import { selectMasterSchedule, selectMastersError, selectMastersLoading } from './mastersSlice.ts';
import { fetchMasterSchedule } from './mastersThunk.ts';

interface CalendarProps {
  masterId: string;
}

const MasterCalendar: React.FC<CalendarProps> = ({ masterId }) => {
  const dispatch = useAppDispatch();
  const slots = useAppSelector(selectMasterSchedule);
  const loading = useAppSelector(selectMastersLoading);
  const error = useAppSelector(selectMastersError);

  useEffect(() => {
    dispatch(fetchMasterSchedule(masterId));
  }, [dispatch, masterId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <ErrorIcon color="error" />
        <Typography variant="h6" color="error">
          {error.error}
        </Typography>
      </Box>
    );
  }

  const events: EventInput[] = slots
    ? slots.map((slot: Slot) => ({
      title: `Available Slots: ${slot.availableSlots.join(', ')}`,
      start: slot.date,
      allDay: true,
    }))
    : [];

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    console.log(selectInfo);
    // Implement the logic to open a booking form modal
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={events}
      select={handleDateSelect}
    />
  );
};

export default MasterCalendar;
