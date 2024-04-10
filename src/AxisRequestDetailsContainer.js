import React from "react";
import AxisRequestData from "./pages/kotak/kotakRequests";

import "./styles/kotakrawcontainer.css";
import Grid from '@mui/material/Grid';

const AxisRequestDataContainer = () => {
  return (
    <div>
      <Grid container sx={{background:'white'}}>
        <Grid item sm={12}>
          
          <AxisRequestData />
        </Grid>
      </Grid>
      
    </div>
  );
};

export default AxisRequestDataContainer;
