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
  Checkbox,
  MenuItem,
} from "@mui/material";
import "../../styles/kotakRawData.css";

const AxisRawData = () => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    fetchData();
  }, [date]);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/rawdata/axisbank?date=${date}`);
      const jsonData = await response.json();
      console.log(jsonData);

      if (jsonData.rawdata && jsonData.rawdata.length > 0) {
        console.log(data)
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

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleCellChange = (event, itemIndex, key) => {
    const newValue = event.target.value;
    setData(prevData => {
      const newData = [...prevData];
      newData[itemIndex].data[key] = newValue;
      return newData;
    });
  };

  const handleFilterChange = (filterValue) => {
    setFilterValue(filterValue);
    const filtered = data.filter((item) => {
      if (Array.isArray(item.data)) {
        return item.data.some((row) =>
          Object.values(row).some((value) =>
            value.toString().toLowerCase().includes(filterValue.toLowerCase())
          )
        );
      } else {
        return Object.values(item.data).some((value) =>
          value.toString().toLowerCase().includes(filterValue.toLowerCase())
        );
      }
    });
    setFilteredData(filtered);
  };
  

  const handleRowSelect = (row) => {
    const selectedIndex = selectedRows.indexOf(row);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [...selectedRows, row];
    } else if (selectedIndex === 0) {
      newSelected = selectedRows.slice(1);
    } else if (selectedIndex === selectedRows.length - 1) {
      newSelected = selectedRows.slice(0, -1);
    } else if (selectedIndex > 0) {
      newSelected = [
        ...selectedRows.slice(0, selectedIndex),
        ...selectedRows.slice(selectedIndex + 1),
      ];
    }

    setSelectedRows(newSelected);
    setSelectAll(filteredData.flatMap((item) => item.data).length === newSelected.length);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredData.flatMap((item) => item.data));
    }
    setSelectAll(!selectAll);
  };

  const handleUpdate = async () => {
    try {
      const senddata = data.map(item => item.data);
      const response = await fetch(`http://localhost:5000/rawdata/axis/update?date=${date}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(senddata),
      });
      const responseData = await response.json(); 
      console.log('API Response:', responseData);
      
      // Assuming the API returns updated data, update the state
      if (responseData && responseData.updatedData) {
        setData(responseData.updatedData);
        setFilteredData(responseData.updatedData);
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };
  
  const getTableHeaders = () => {
    if (filteredData.length > 0 && filteredData[0].data) {
      // Extract all keys from the first data object
      const keys = Object.keys(filteredData[0].data);
      // Filter out any keys that are not suitable for headers
      const suitableKeys = keys.filter(key => !['state', 'status'].includes(key));
      return suitableKeys;
    } else {
      return [];
    }
  };

  return (
    <div>
      <Stack spacing={2} sx={{ padding: "2%" }}>
        <div>
          <TextField
            className="calendar-option"
            type="date"
            value={date}
            onChange={(event) => handleDateChange(event.target.value)}
          />
        </div>
      </Stack>
      <Stack spacing={2} direction="row" sx={{ padding: "2%", justifyContent: 'flex-end' }}>
      <TextField
        label="Filter"
        value={filterValue}
        onChange={(event) => handleFilterChange(event.target.value)}
      />
        <Button variant="contained" onClick={handleUpdate}>Update</Button>
        <Button variant="contained">Send Mail</Button>
      </Stack>
      <Stack>
        <TableContainer component={Paper} sx={{ maxHeight: "67vh", minHeight: "67vh" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox checked={selectAll} onChange={handleSelectAll} />
                </TableCell>
                <TableCell>Slot Number</TableCell>
                <TableCell>Status</TableCell>
                {getTableHeaders().map((header, index) => (
                  <TableCell key={index}>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedRows.includes(item)}
                      onChange={() => handleRowSelect(item)}
                    />
                  </TableCell>
                  <TableCell>{item.slot_number}</TableCell>
                  <TableCell>
                    <TextField
                      value={item.data.status}
                      select
                      fullWidth
                      onChange={(event) => handleCellChange(event, index, 'status')}
                    >
                      {['Qualified', 'Pending', 'Terminal Received', 'Terminals Rejected', 'Clarification Required', 'Bank Updated'].map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </TableCell>
                  {getTableHeaders().map((header, headerIndex) => (
                    <TableCell key={headerIndex}>
                      <TextField
                        value={item.data[header] || ''}
                        onChange={(event) => handleCellChange(event, index, header)}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </div>
  );
};

export default AxisRawData;
