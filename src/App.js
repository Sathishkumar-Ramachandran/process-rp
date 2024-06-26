


import React from "react";
  import { BrowserRouter, Route,  Routes,Outlet } from "react-router-dom";
  import TopNav from "./components/topNav";
  import LeftNav from "./components/leftNav";
  import Dashboard from "./pages/dashboard";
  import Raiserequest from "./pages/rawData";
  import NotFound from "./pages/pageNotFound";
  import Bankrequests from "./pages/bankRequests";
  import Admin from "./pages/admin";
  import Merchants from "./pages/merchants";
  import { Breadcrumbs } from "@mui/material";
  import Breadcrumbscomp from "./components/breadcrumbs";
  import Auth from "./pages/auth";
  import PrivateRoute from "./redux/privateRoute";
import KotakRawData from "./pages/kotak/kotakRawdata";
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Users from "./components/users";
import Grid from '@mui/material/Grid';
import KotakRawDataContainer from "./pages/kotakRawDataContainer";
import { Padding } from "@mui/icons-material";
import AxisRawDataContainer from "./pages/axisRawDataContainer";
import RawData from "./pages/rawData";
import KotakRequestDataContainer from "./RequestDetailsContainer";
import AxisRequestDataContainer from "./AxisRequestDetailsContainer";

  function App() {
    function WithNavs () {
      return(
        <>
          {/* <div
            style={{
              display: "grid",
              gridTemplateRows: "auto 1fr",
              height: "100vh"
            }}
          >
            <div style={{ display: "flex", flexDirection: "column",  width: "100%", position:"fixed"}}>
              <TopNav />
            </div> 
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <LeftNav />
              </div>
              <div style={{ flex: 1, marginLeft: "250px", marginTop: "60px"}}>
               
                <Outlet />
              </div>
            </div>
          </div> */}


          
              <Grid container sx={{minHeight:"100vh"}}>
                <Grid item sm={2} sx={{background:"black",width:'100%'}}>
                  <LeftNav />
                </Grid>
                <Grid item sm={10}>
                  <Stack>
                    <TopNav />
                  </Stack>
                  <Stack sx={{overflow:"auto",margin:"1%",borderRadius: 3,border:'5px solid #f5f5f5'}}>
                  
                    <Outlet />
                  </Stack>
                </Grid>
                
              </Grid>
          

        </>
      )
    }
    return (
      <>
      <BrowserRouter>
    
        <Routes>
          <Route path="/login" element={<Auth />} />
          <Route element={<WithNavs />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />

              <Route path='/rawdata/kotakbank' element={<KotakRawDataContainer />} />
              <Route path="/requests/kotakbank/" element={<KotakRequestDataContainer />} />
              <Route path="/admin/users" element={<Users />} />

            <Route path="/rawdata" element={<RawData />} />
            <Route path="/rawdata/axisbank" element={<AxisRawDataContainer />} />
            <Route path="/requests/axisbank" element={<AxisRequestDataContainer />}  />
            
            <Route path="/requests" element={<Bankrequests />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/merchants" element={<Merchants />} />
            <Route path="*" element={<NotFound />} />
            
              
              {/* <Route path="/" element={<PrivateRoute> <Dashboard /> </PrivateRoute> } />
              <Route path="/dashboard" element={<PrivateRoute component={<Dashboard />} />} />
              <Route path="/request/raise/new" element={<PrivateRoute component={<Raiserequest />} />} />
              <Route path="/requests" element={<PrivateRoute component={<Bankrequests />} />} />
              <Route path="/admin" element={<PrivateRoute component={<Admin />} />} />
              <Route path="/merchants" element={<PrivateRoute component={<Merchants />} />} />
              <Route path="*" element={<NotFound />} /> */}
            
          </Route>
        </Routes>
      </BrowserRouter></>
    );
  }

  export default App;

