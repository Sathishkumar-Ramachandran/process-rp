
import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';
import "../../styles/kotakRawData.css";

const KotakRawData = () => {
  const todayDate = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(todayDate);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/rawdata?date=${date}`);
        const jsonData = await response.json();
        console.log(jsonData);
        if (jsonData.result && jsonData.result.rawDate && jsonData.result.rawDate.length > 0) {
          setData(jsonData.result.rawDate);
        } else {
          setData([]);
          console.log("No data found.");
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [date]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const getTableHeaders = () => {
    if (data.length > 0 && data[0]) {
      return Object.keys(data[0]);
    } else {
      return [];
    }
  };

  return (
    <div className="kotak-raw-data">
      <div className="content">
        <TextField
          className="calendar-option"
          label="Select Date"
          type="date"
          value={date}
          onChange={(event) => handleDateChange(event.target.value)}
        />
      </div>
      <TableContainer component={Paper} className="table-container custom-table-container">
        <Table>
          {isLoading ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={4} align="center">
                  Loading data...
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <>
              <TableHead>
                <TableRow className="table-header">
                  {getTableHeaders().map((header) => (                    
                  <TableCell key={header}>{header}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, index) => (
                  <TableRow key={index}>
                    {getTableHeaders().map((header) => (
                      <TableCell key={header}>{row[header]}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </>
          )}
        </Table>
      </TableContainer>
    </div>
  );
};

export default KotakRawData;
