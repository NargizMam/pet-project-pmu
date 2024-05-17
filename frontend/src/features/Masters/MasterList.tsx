import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import ErrorIcon from '@mui/icons-material/Error';
import { useNavigate } from 'react-router-dom';
import { fetchMasters } from './mastersThunk';
import {
  Grid,
  CircularProgress,
  Box,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { selectMastersError, selectMastersList, selectMastersLoading } from './mastersSlice';
import { MasterApi } from '../../types';
import MasterCard from './components/MasterCard';
import FullCalendarComponent from '../BookCalendar/FullCalendarComponent.tsx';

interface MasterListProps {
  onSelectMaster: (masterId: string) => void;
}

const MasterList: React.FC<MasterListProps> = ({ onSelectMaster }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const masters = useAppSelector(selectMastersList);
  const loading = useAppSelector(selectMastersLoading);
  const error = useAppSelector(selectMastersError);
  const [open, setOpen] = useState(false);
  const [selectedMasterId, setSelectedMasterId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchMasters());
  }, [dispatch]);

  const handleViewDetails = (masterId: string) => {
    navigate(`/masters/${masterId}`);
  };

  const handleBook = (masterId: string) => {
    setSelectedMasterId(masterId);
    setOpen(true);
    onSelectMaster(masterId); // Notify parent component about selected master
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMasterId(null);
  };

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

  return (
    <Box mt={2}>
      <Typography variant="h4" gutterBottom>
        Мастера
      </Typography>
      <Grid container spacing={2}>
        {masters.map((master: MasterApi) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={master._id}>
            <MasterCard
              fullName={master.fullName}
              specialization={master.specialization}
              phone={master.phone}
              profileImage={master.profileImage}
              onViewDetails={() => handleViewDetails(master._id)}
              onBook={() => handleBook(master._id)}
            />
          </Grid>
        ))}
      </Grid>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Календарь бронирования</DialogTitle>
        <DialogContent>
          {selectedMasterId && <FullCalendarComponent selectedMasterId={selectedMasterId} />}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default MasterList;
