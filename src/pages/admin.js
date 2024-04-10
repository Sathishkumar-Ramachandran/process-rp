import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
// import "../styles/admin.css"; // Commented out as MUI Card styling will be used

const adminOptions = [
  {
    name: "Users",
    icon: <PersonOutlineIcon sx={{ color: "blue" }} />,
    path: "/admin/users",
  },
  {
    name: "Create User",
    icon: <PersonAddAltIcon sx={{ color: "blue" }} />,
    path: "/admin/users/create",
  },
  {
    name: "Manage Roles",
    path: "/admin/roles",
  },
  {
    name: "Settings",
    path: "/admin/settings",
  },
];

const Admin = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="admin-container">
      <h1>Admin</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}> {/* Added styles for horizontal layout */}
        {adminOptions.map((option, index) => (
          <Card key={index} sx={{ width: 150, margin: 5 }} onClick={() => handleNavigation(option.path)}> {/* Set card width and margin */}
            <CardContent>
              <Typography variant="h6" component="div">
                {option.name}
              </Typography>
              {option.icon}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Admin;
