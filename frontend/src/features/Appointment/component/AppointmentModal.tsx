import React from 'react';
import { Modal } from '@mui/material';
import AppointmentInfo from './AppointmentInfo';

interface Props {
  open: boolean;
  onClose: () => void;
}

const AppointmentModal: React.FC<Props> = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div>
        <AppointmentInfo/>
        <button onClick={onClose}>Закрыть</button>
      </div>
    </Modal>
  );
};

export default AppointmentModal;
