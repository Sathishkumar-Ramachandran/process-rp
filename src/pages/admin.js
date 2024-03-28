import React from "react";
import { useNavigate } from "react-router-dom";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import "../styles/admin.css"; // Import custom CSS file

const adminOptions = [
    {
        name: 'Users',
        icon: <PersonOutlineIcon />,
        path: '/admin/users'
    },
    {
        name: "Create User",
        icon: <PersonAddAltIcon />,
        path: "/admin/users/create"
    },
    {
        name: "Manage Roles",
        path: "/admin/roles"
    },
    {
        name: "Settings",
        path: "/admin/settings"
    }
];

const Admin = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div>
            <h1>Admin</h1>
            <ul>
                {adminOptions.map((option, index) => (
                    <li key={index} onClick={() => handleNavigation(option.path)} className="admin-option">
                        {option.icon} {option.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Admin;
