import React from 'react';
import { useNavigate } from 'react-router';
import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

export default function Error() {

    const navigate = useNavigate();

    const goHome = () => {
        navigate('/');
    };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Typography variant="h1">
              404
            </Typography>
            <Typography variant="h6">
              The page you’re looking for doesn’t exist.
            </Typography>
            <Button variant="contained" onClick={goHome}>Back Home</Button>
          </Grid>
          <Grid xs={6}>
            <img
              src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
              alt=""
              width={500} height={250}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// import React from 'react';
// import '../styles/pageNotFound.css';

// const NotFound = () => {
//   return (
//     <div>
//       <h1>404 - Page Not Found</h1>
//       <p>Sorry, the page you are looking for does not exist.</p>
//     </div>
//   );
// };

// export default NotFound;