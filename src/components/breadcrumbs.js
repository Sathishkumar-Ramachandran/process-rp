import React from "react";
import { Link, useLocation} from "react-router-dom";
import Breadcrumbs from '@mui/material/Breadcrumbs';

import { LeftNavList } from "./leftNav";

const Breadcrumbscomp = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    
    return(
        <Breadcrumbs separator="/">
        {LeftNavList.map((crumb) => (
  <Link underline="hover" color="inherit" key={crumb.compName} to={crumb.path}>
    {currentPath === crumb.path ? (
      // Render active breadcrumb style
      <b>{crumb.compName}</b>
    ) : (
      crumb.compName
    )}
  </Link>
))}
</Breadcrumbs>
    )
};

export default Breadcrumbscomp;