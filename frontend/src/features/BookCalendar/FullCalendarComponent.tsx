import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import BookingForm from './BookingForm';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Slot } from '../../types';
import { selectAllSlots, selectMasterSlots } from './slotsSlice.ts';
import { fetchAllSlots, fetchMastersSlots } from './slotsThunk.ts';

interface Props {
  selectedMasterId?: string;
}

const FullCalendarComponent: React.FC<Props> = ({ selectedMasterId }) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const masterSlots = useAppSelector((state) => selectMasterSlots(state, selectedMasterId || ''));
  const allSlots = useAppSelector(selectAllSlots);

  useEffect(() => {
    if (selectedMasterId) {
      dispatch(fetchMastersSlots(selectedMasterId));
    } else {
      dispatch(fetchAllSlots());
    }
  }, [dispatch, selectedMasterId]);

  const handleDateClick = (arg: { dateStr: string }) => {
    setSelectedDate(arg.dateStr);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedDate(null);
  };

  const slots = selectedMasterId ? masterSlots : allSlots;
  const events = (slots || []).map((slot: Slot) => ({
    title: `Available: ${slot.availableSlots.join(', ')}`,
    start: slot.date,
    allDay: true,
  }));

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Booking Form</DialogTitle>
        <DialogContent>
          <BookingForm selectedDate={selectedDate} masterId={selectedMasterId} onClose={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FullCalendarComponent;
