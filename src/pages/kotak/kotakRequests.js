import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Stack,
  Button,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

import "../../styles/kotakRawData.css";

const KotakRawData = () => {
  const todayDate = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/requests/kotakbank?date=${date}`
        );
        const jsonData = await response.json();
        console.log(jsonData);
        if (
          jsonData &&
          jsonData.rawDate &&
          jsonData.rawDate.length > 0
        ) {
          setData(jsonData.rawDate);
          setFilteredData(jsonData.rawDate);
        } else {
          setData([]);
          setFilteredData([]);
          console.log("No data found.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
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

  const handleFilterChange = (filterValue) => {
    const filtered = data.filter((row) => {
      for (let key in row) {
        if (
          row[key]
            .toString()
            .toLowerCase()
            .includes(filterValue.toLowerCase())
        ) {
          return true;
        }
      }
      return false;
    });
    setFilteredData(filtered);
  };

  const handleRowSelect = (row) => {
    const selectedIndex = selectedRows.indexOf(row);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedRows, row);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedRows.slice(1));
    } else if (selectedIndex === selectedRows.length - 1) {
      newSelected = newSelected.concat(selectedRows.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedRows.slice(0, selectedIndex),
        selectedRows.slice(selectedIndex + 1)
      );
    }

    setSelectedRows(newSelected);
    console.log(selectedIndex)
  };

  return (
    <div>
      <Stack spacing={2} sx={{ padding: "2%" }}>
        <div>
          <TextField
            className="calendar-option"
            label="Select Date"
            type="date"
            value={date}
            onChange={(event) => handleDateChange(event.target.value)}
          />
          <Button
            variant="contained"
            style={{ alignItems: "end", padding: 5, marginLeft: "70%" }}
          >
            Send Mail to Bank
          </Button>
        </div>
        <div>
          <TextField
            className="filter-option"
            label="Filter Data"
            onChange={(event) => handleFilterChange(event.target.value)}
          />
        </div>
      </Stack>
      <Stack>
        <TableContainer component={Paper} sx={{ maxHeight: "67vh", minHeight: "67vh" }}>
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
                    <TableCell padding="checkbox">
                      <Checkbox />
                    </TableCell>
                    {getTableHeaders().map((header) => (
                      <TableCell key={header}>{header}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedRows.indexOf(row) !== -1}
                          onChange={() => handleRowSelect(row)}
                        />
                      </TableCell>
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
      </Stack>
    </div>
  );
};

export default KotakRawData;