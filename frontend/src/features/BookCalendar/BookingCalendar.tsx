import React, { useState } from 'react';
import FullCalendarComponent from './FullCalendarComponent';
import MasterList from '../Masters/MasterList';

const BookingCalendar: React.FC = () => {
  const [selectedMasterId, setSelectedMasterId] = useState<string | null>(null);

  const handleSelectMaster = (masterId: string) => {
    setSelectedMasterId(masterId);
  };

  return (
    <div>
      <h1>Booking Calendar</h1>
      <MasterList onSelectMaster={handleSelectMaster} />
      {selectedMasterId ? (<FullCalendarComponent selectedMasterId={selectedMasterId} />)
        : (<FullCalendarComponent/>)
      }
    </div>
  );
};

export default BookingCalendar;
