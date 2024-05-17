import React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActions, Button } from '@mui/material';
import { apiURL } from '../../../constants.ts';

interface MasterCardProps {
  fullName: string;
  specialization: string;
  phone: string;
  profileImage?: string;
  onViewDetails: () => void;
  onBook: () => void;
}

const MasterCard: React.FC<MasterCardProps> = ({ fullName, specialization, phone, profileImage, onViewDetails, onBook }) => {
  const avatar = profileImage ? `${apiURL}/${profileImage}` : `${apiURL}/default-avatar.png`;

  return (
    <Card>
      <Button size="small" color="primary" onClick={onBook}>
        Записаться
      </Button>
      <CardMedia
        component="img"
        height="140"
        image={avatar}
        alt={fullName}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {fullName}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {specialization}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {phone}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={onViewDetails}>
          Подробнее
        </Button>

      </CardActions>
    </Card>
  );
};

export default MasterCard;
