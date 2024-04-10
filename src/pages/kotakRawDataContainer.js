import React from "react";
import KotakRawData from "./kotak/kotakRawdata";
import "../styles/kotakrawcontainer.css";
import Grid from '@mui/material/Grid';

const KotakRawDataContainer = () => {
  return (
    <div>
      <Grid container sx={{background:'white'}}>
        <Grid item sm={12}>
          
          <KotakRawData />
        </Grid>
      </Grid>
      
    </div>
  );
};

export default KotakRawDataContainer;
