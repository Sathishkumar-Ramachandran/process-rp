import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  // Get users on component mount
  useEffect(() => {
    fetch("http://localhost:5000/users/all")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  // Function to handle user selection
  const handleUserSelect = (userId) => {
    // Fetch user details based on userId
    fetch(`http://localhost:5000/userinfo?userid=${userId}`)
      .then((res) => res.json())
      .then((data) => setUserDetails(data));
    setSelectedUser(userId);
  };

  // Render user details
  const renderUserDetails = () => {
    if (userDetails) {
      return (
        <div>
          <h2>User Details</h2>
          <p>Bank Name: {userDetails[0].bankname ? userDetails[0].bankname : 'N/A'}</p>
          <p>Last Updated: {userDetails[0].lastUpdated}</p>
          <p>Role: {userDetails[0].role}</p>
        </div>
      );
    } else {
      return <div>Please select a user to view details</div>;
    }
  };

  return (
    <div>
      <h2>User List</h2>
      <TableContainer component={Paper} style={{ maxWidth: '600px', margin: 15,background: 'linear-gradient(135deg, #007bff, #0056b3)' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.userid} onClick={() => handleUserSelect(user.userid)} style={{ cursor: "pointer", background: selectedUser === user.userid ? "#eee" : "transparent" }}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {renderUserDetails()}
    </div>
  );
};

export default Users;
