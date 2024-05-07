import React from 'react';
import { Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const LogoHeader: React.FC = () => {
  return (
    <Container maxWidth="lg">
        <Typography variant="h4"   style={{ flexGrow: 1,  textAlign: 'center' }}>
          <Link to="/" style={{textDecoration: 'none' }}>
            PERMANENT & AESTHETIC MAKE UP <br/>from <br/>ALTYNAI KASYMALIEVA
          </Link>
        </Typography>
    </Container>
  );
};

export default LogoHeader;
