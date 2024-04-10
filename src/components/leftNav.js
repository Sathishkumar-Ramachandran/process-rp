import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/leftnav.css';
import Icon from "../assets/razorpay-icon.png";

import GridViewIcon from '@mui/icons-material/GridView';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import StorefrontIcon from '@mui/icons-material/Storefront';
import TableChartIcon from '@mui/icons-material/TableChart';
import RequestPageIcon from '@mui/icons-material/RequestPage';

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
        compName: "Raw Data",
        componentIcon: <TableChartIcon />,
        path: '/rawdata',
        role: 'admin'
    },
    {
        id: 3,
        compName: "Axis Bank",
        componentIcon: <AccountBalanceIcon />,
        path: '/axisbank/requests',
        role: 'admin',
        subcomponents: [{
            compName: "Raw Data",
            componentIcon: <TableChartIcon />,
            path: '/rawdata/axisbank'
        },
        {
            compName: "Bank Requests",
            componentIcon: <RequestPageIcon />,
            path: '/requests/axisbank'
        }]
    
    },
    {
        id: 4,
        compName: "Kotak Bank",
        componentIcon: <AccountBalanceIcon />,
        path: '/requests/kotakbank',
        role: 'admin',
        subcomponents: [{
            compName: "Raw Data",
            componentIcon: <TableChartIcon />,
            path: '/rawdata/kotakbank'
        },
        {
            compName: "Bank Requests",
            componentIcon: <RequestPageIcon />,
            path: '/requests/kotakbank/'
        }]
    
    },
    {
        id: 5,
        compName: "Merchant List",
        componentIcon: <StorefrontIcon />,
        path: '/merchants',
        role: 'admin'
    },
    {
        id: 6,
        compName: "Admin",
        componentIcon: <AccountBalanceIcon />,
        path: '/admin',
        role: 'admin'
    },
];

const LeftNav = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const navigate = useNavigate();

    const handleItemClick = (item) => {
        setSelectedItem(selectedItem === item.id ? null : item.id);
        if (!item.subcomponents) {
            navigate(item.path);
        }
    };

    return (
        <div className="left-nav">
            <div className="razorpay-icon">
                <img src={Icon} alt="Razorpay-Icon" />
            </div>
            <div className="leftnav-menu">
                {LeftNavList.map((item) => (
                    <div key={item.id}>
                        <div
                            className={(selectedItem === item.id) ? "leftnav-menu-item selected" : "leftnav-menu-item"}
                            onClick={() => handleItemClick(item)}
                        >
                            <div className="icon-wrapper">
                                {item.componentIcon}
                            </div>
                            <span>{item.compName}</span>
                        </div>
                        {item.subcomponents && selectedItem === item.id && (
                            <div className="subcomponents">
                                {item.subcomponents.map((subcomp, index) => (
                                    <div
                                        key={index}
                                        className="subcomponent"
                                        onClick={() => navigate(subcomp.path)}
                                    >
                                        <div className="icon-wrapper">
                                            {subcomp.componentIcon}
                                        </div>
                                        <span>{subcomp.compName}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LeftNav;
