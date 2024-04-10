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

const AxisRawData = () => {
  const todayDate = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/rawdata/axisbank?date=${date}`
        );
        const jsonData = await response.json();
        console.log(jsonData);
        if (
          jsonData.rawdata &&
          jsonData.rawdata.length > 0
        ) {
          setData(jsonData.rawdata);
          setFilteredData(jsonData.rawdata);
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
    if (data.length > 0 && data[0].data && data[0].data[0]) {
      return Object.keys(data[0].data[0]);
    } else {
      return [];
    }
  };

  const handleFilterChange = (filterValue) => {
    const filtered = data.filter((item) => {
      const innerFiltered = item.data.filter((row) => {
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
      return innerFiltered.length > 0;
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
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      const allRows = filteredData.flatMap(item => item.data);
      setSelectedRows(allRows);
    }
    setSelectAll(!selectAll);
  };

  const handleSendMail = () => {
    const selectedRowsJSON = JSON.stringify(selectedRows);
    console.log(selectedRowsJSON);

    fetch('http://localhost:5000/sendmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: selectedRowsJSON,
    })
    .then(response => response.json())
    .then(data => {
      console.log('Mail sent successfully:', data);
      fetch('http://localhost:5000/data/axis/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: selectedRowsJSON,
    })
    .then(response => response.json())
    .then(data => {
      console.log('Mail sent successfully:', data);
      setSelectedRows([]);
      
    })
    .catch(error => {
      console.error('Error sending mail:', error);
    });
      setSelectedRows([]);
      
    })
    .catch(error => {
      console.error('Error sending mail:', error);
    });
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
            onClick={handleSendMail}
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
                      <Checkbox
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Slot Number</TableCell>
                    {/* Dynamic table headers */}
                    {getTableHeaders().map((header) => (
                      <TableCell key={header}>{header}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Map through filtered data */}
                  {filteredData.map((item, index) => (
                    <React.Fragment key={index}>
                      {/* Map through the 'data' array in each item */}
                      {item.data.map((row, rowIndex) => (
                        <TableRow key={`${index}-${rowIndex}`}>
                          {/* Checkbox */}
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={selectedRows.indexOf(row) !== -1}
                              onChange={() => handleRowSelect(row)}
                            />
                          </TableCell>
                          {/* Status */}
                          <TableCell>{item.status}</TableCell>
                          {/* Slot Number */}
                          <TableCell>{item.slot_number}</TableCell>
                          {/* Dynamic cell values */}
                          {getTableHeaders().map((header) => (
                            <TableCell key={header}>{row[header]}</TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </React.Fragment>
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

export default AxisRawData;
