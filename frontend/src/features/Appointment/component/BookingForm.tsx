import React, { useState } from 'react';
import axios from 'axios';

interface BookingFormProps {
  masterId: string;
  date: string;
  availableSlots: string[];
}

const BookingForm: React.FC<BookingFormProps> = ({ masterId, date, availableSlots }) => {
  const [client, setClient] = useState('');
  const [time, setTime] = useState('');
  const [service, setService] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post('/api/appointments', {
      master: masterId,
      client,
      date,
      time,
      service,
      notes,
    }).then(response => {
      // Handle success
    }).catch(error => {
      // Handle error
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Клиент:
        <input type="text" value={client} onChange={e => setClient(e.target.value)} required />
      </label>
      <label>
        Время:
        <select value={time} onChange={e => setTime(e.target.value)} required>
          {availableSlots.map(slot => (
            <option key={slot} value={slot}>{slot}</option>
          ))}
        </select>
      </label>
      <label>
        Услуга:
        <input type="text" value={service} onChange={e => setService(e.target.value)} required />
      </label>
      <label>
        Заметки:
        <textarea value={notes} onChange={e => setNotes(e.target.value)} />
      </label>
      <button type="submit">Забронировать</button>
    </form>
  );
};

export default BookingForm;
