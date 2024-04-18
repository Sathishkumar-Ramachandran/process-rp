import React from "react";
import "./styles/kotakrawcontainer.css";
import Grid from '@mui/material/Grid';
import AxisRawData from "./pages/axis/axisRawData";
import AxisRequestData from "./pages/axis/axisRequests";

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
