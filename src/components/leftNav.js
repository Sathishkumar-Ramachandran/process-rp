import React, { useState } from "react";

import { useNavigate } from 'react-router-dom';
import '../styles/leftnav.css';
import Icon from "../assets/razorpay-icon.png";

import GridViewIcon from '@mui/icons-material/GridView';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import StorefrontIcon from '@mui/icons-material/Storefront';

export const LeftNavList = [
    {
        id: 1,
        compName: 'Dashboard',
        componentIcon: <GridViewIcon />,
        path: '/dashboard',
        role: ['admin', 'user']
    },
    {
        id: 2,
        compName: "Raise Request",
        componentIcon: <AccountBalanceIcon />,
        path: '/request/raise/new',
        role: 'admin'
    },
    {
        id: 3,
        compName: "Bank Requests",
        componentIcon: <AccountBalanceIcon />,
        path: '/requests',
        role: 'admin'
    },
    {
        id: 4,
        compName: "Merchant List",
        componentIcon: <StorefrontIcon />,
        path: '/merchants',
        role: 'admin'
    },
    {
        id: 5,
        compName: "Admin",
        componentIcon: <AccountBalanceIcon />,
        path: '/admin',
        role: 'admin'
    },

    

]



const LeftNav = () => {
    const [selectedItem, setSelectedItem] = useState(1);

    const navigate = useNavigate();

    const handleItemClick = (item) => {
        setSelectedItem(item.id);
        navigate(item.path);
    };

    return(
        <div className="left-nav">
            <div className="razorpay-icon">
                <img src={Icon} alt="Razorpay-Icon" />
            </div>
            <div className="leftnav-menu">
                {
                    LeftNavList.map((item) => (
                        <div
                            key={item.id}
                            className={selectedItem === item.id ? "leftnav-menu-item selected" : "leftnav-menu-item"}
                            onClick={() => handleItemClick(item)}
                        >
                            <div className="icon-wrapper">
                                {item.componentIcon}
                            </div>
                            <span>{item.compName}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
};

export default LeftNav;