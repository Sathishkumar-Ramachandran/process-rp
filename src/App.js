


import React from "react";
  import { BrowserRouter, Route,  Routes,Outlet } from "react-router-dom";
  import TopNav from "./components/topNav";
  import LeftNav from "./components/leftNav";
  import Dashboard from "./pages/dashboard";
  import Raiserequest from "./pages/raiseRequestPage";
  import NotFound from "./pages/pageNotFound";
  import Bankrequests from "./pages/bankRequests";
  import Admin from "./pages/admin";
  import Merchants from "./pages/merchants";
  import { Breadcrumbs } from "@mui/material";
  import Breadcrumbscomp from "./components/breadcrumbs";
  import Auth from "./pages/auth";
  import PrivateRoute from "./redux/privateRoute";

  function App() {
    function WithNavs () {
      return(
        <>
          <div
            style={{
              display: "grid",
              gridTemplateRows: "auto 1fr", // Change gridTemplateRows instead of gridTemplateColumns
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
                {/* <Breadcrumbscomp /> */}
                <Outlet />
              </div>
            </div>
          </div>
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
            <Route path="/request/raise/new" element={<Raiserequest />} />
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

