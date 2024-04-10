import React from "react";
import KotakRequestData from "./pages/kotak/kotakRequests";

import "./styles/kotakrawcontainer.css";
import Grid from '@mui/material/Grid';

const KotakRequestDataContainer = () => {
  return (
    <div>
      <Grid container sx={{background:'white'}}>
        <Grid item sm={12}>
          
          <KotakRequestData />
        </Grid>
      </Grid>
      
    </div>
  );
};

export default KotakRequestDataContainer;
