import React from "react";

import "../styles/kotakrawcontainer.css";
import Grid from '@mui/material/Grid';
import AxisRawData from "./axis/axisRawData";

const AxisRawDataContainer = () => {
  return (
    <div>
      <Grid container sx={{background:'white'}}>
        <Grid item sm={12}>
          
          <AxisRawData />
        </Grid>
      </Grid>
      
    </div>
  );
};

export default AxisRawDataContainer;
