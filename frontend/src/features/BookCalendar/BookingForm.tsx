import React, { useState } from 'react';
import { Button, TextField, DialogActions } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createAppointment } from '../Appointment/appointmentThunk.ts';
import { selectUser } from '../Users/usersSlice.ts';
import { AppointmentMutation } from '../../types';

interface BookingFormProps {
  selectedDate: string | null;
  masterId: string | undefined;
  onClose: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ selectedDate, masterId, onClose }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser)!;
  const [clientData, setClientData] = useState({
    fullName: '',
    contact: '',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientData({
      ...clientData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !masterId) return;

    const appointmentData = {
      master: masterId,
      client: user._id.toString(),
      date: selectedDate,
      start: '10:00',
      end: '13:00',
      service: 'some-service-id',
      notes: clientData.notes,
    };

    try {
      await dispatch(createAppointment(appointmentData as AppointmentMutation));
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        margin="dense"
        label="Full Name"
        type="text"
        fullWidth
        name="fullName"
        value={clientData.fullName}
        onChange={handleChange}
        required
      />
      <TextField
        margin="dense"
        label="Contact"
        type="text"
        fullWidth
        name="contact"
        value={clientData.contact}
        onChange={handleChange}
        required
      />
      <TextField
        margin="dense"
        label="Notes"
        type="text"
        fullWidth
        name="notes"
        value={clientData.notes}
        onChange={handleChange}
      />
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button type="submit" color="primary">
          Book
        </Button>
      </DialogActions>
    </form>
  );
};

export default BookingForm;
