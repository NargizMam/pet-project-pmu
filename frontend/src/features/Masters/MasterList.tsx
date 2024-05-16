import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchMasters } from './mastersThunk';
import { MasterApi } from '../../types';
import { List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography, CircularProgress, Box } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import { selectMastersError, selectMastersList, selectMastersLoading } from './mastersSlice.ts';

interface MasterListProps {
  onSelectMaster: (masterId: string) => void;
}

const MasterList: React.FC<MasterListProps> = ({ onSelectMaster }) => {
  const dispatch = useAppDispatch();
  const masters = useAppSelector(selectMastersList);
  const loading = useAppSelector(selectMastersLoading);
  const error = useAppSelector(selectMastersError);

  useEffect(() => {
    dispatch(fetchMasters());
  }, [dispatch]);

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
      <List>
        {masters.map((master: MasterApi) => (
          <ListItem key={master._id} button onClick={() => onSelectMaster(master._id)}>
            <ListItemAvatar>
              <Avatar src={master.profileImage} alt={master.fullName} />
            </ListItemAvatar>
            <ListItemText
              primary={master.fullName}
              secondary={
                <>
                  <Typography component="span" variant="body2" color="textPrimary">
                    {master.specialization}
                  </Typography>
                  {" — "}
                  {master.phone}
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default MasterList;
