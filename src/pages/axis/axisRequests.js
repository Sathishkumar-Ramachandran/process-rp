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
  Modal,
  Box,
  ButtonGroup,
  Checkbox,
  Alert
} from "@mui/material";
import { saveAs } from 'file-saver';
import * as xlsx from 'xlsx';


const AxisRequestData = () => {
  const todayDate = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(todayDate);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [successMail, setSuccessMail] = useState(false);
  const [successUpdate, setSuccessUpdate] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false); // State for edit mode
  const [selectedFile, setSelectedFile] = useState(null); // State for selected file

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/requests/data/axis?date=${date}`
        );
        const jsonData = await response.json();
        console.log(jsonData);
        if (jsonData.rawdata && jsonData.rawdata.length > 0) {
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

  const handleRowSelect = (row) => {
    if (!row) {
      console.error("Row is undefined");
      return;
    }
  
    // Check if the row is already selected
    const isSelected = selectedRows.some((selectedRow) => selectedRow === row);
  
    // Create a new array to hold the updated selectedRows
    let newSelected = [];
  
    if (!isSelected) {
      // If the row is not selected, add it to selectedRows
      newSelected = [...selectedRows, row];
    } else {
      // If the row is already selected, remove it from selectedRows
      newSelected = selectedRows.filter((selectedRow) => selectedRow !== row);
    }
  
    // Update selectedRows state with the newSelected array
    setSelectedRows(newSelected);
  
    // Log the updated selectedRows
    console.log(newSelected);
  };
  
  
  
  

  const handleSelectAll = () => {
    const newSelected = selectAll? [] : [...data]; // Clone data instead of filteredData
    setSelectAll(!selectAll);
    setSelectedRows(newSelected);
  };


  const handleDownload = () => {
    const downloadData = selectedRows.length > 0 ? selectedRows : data;
    const ws = xlsx.utils.json_to_sheet(downloadData);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
    const excelBuffer = xlsx.write(wb, { type: 'array', bookType: 'xlsx' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, 'data.xlsx');
  };

  const handleFilterChange = (filterValue) => {
    setFilterValue(filterValue);
    const filtered = data.filter((row) =>
      Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(filterValue.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  const handleUpload = async () => {
    try {
      // Check if a file is selected
      if (!selectedFile) {
        console.error("No file selected for upload.");
        return;
      }
  
      // Check if any rows are selected
      if (selectedRows.length === 0) {
        console.error("No rows selected to send.");
        return;
      }
  
      // Prepare selected rows data
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("selectedRows", JSON.stringify(selectedRows.map(row => ({ ...row }))));
  
      // Send both file and selected rows data to the server
      const response = await fetch("http://localhost:5000/sendmail", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        console.log("File uploaded successfully.");
        setSuccessMail(true); // Indicate success
      } else {
        console.error("Failed to upload file.");
        setSuccessMail(false); // Indicate failure
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      // Optionally, you can handle error feedback here
      setSuccessMail(false); // Indicate failure
    }
  };
  
  
  
  


  const handleSendMail = () => {
    const hasLendingData = selectedRows.some(row => row.category === 'lending');

    if (hasLendingData) {
      setIsModalOpen(true);
    } else {
      sendMailWithoutAttachment();
    }
  };

  

  const sendMailWithoutAttachment = () => {
    const selectedRowsData = selectedRows.map(row => {
      // Adjust this according to your data structure
      return {
        row
      };
    });
  
    // Check if there's any data to send
    if (selectedRowsData.length === 0) {
      console.error("No data selected to send.");
      return;
    }
  
    const selectedRowsJSON = JSON.stringify(selectedRowsData);
    console.log(selectedRowsJSON)
    // const selectedRowsData = selectedRows.map(row => row.data);
    // console.log(selectedRowsData)
    // const selectedRowsJSON = JSON.stringify(selectedRowsData);
    fetch(`http://localhost:5000/updatestatus?date=${date}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: selectedRowsJSON,
    })

      .then(response => response.json())
      .then(data => {
        console.log('Status Updated successfully:', data);
        setSuccessMail(true);
        //setSelectedRows([]);
      })
      .catch(error => {
        console.error('Error sending mail:', error);
      });

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
        setSuccessMail(true);
        //setSelectedRows([]);
      })
      .catch(error => {
        console.error('Error sending mail:', error);
      });
  };
    

  const handleUpdate = async () => {
    try {
      
      const senddata = data.map(item => item.data);
      const response = await fetch(`http://localhost:5000/requests/data/axis/update?date=${date}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(senddata),
      });
      const responseData = await response.json();
      console.log('API Response:', responseData);

      if (responseData && responseData.updatedData) {
        setData(responseData.updatedData);
        setFilteredData(responseData.updatedData);
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
    setSuccessUpdate(true);
    setTimeout(() => {
      setSuccessUpdate(false);
    }, 3000);
  };

  const handleEdit = () => {
    setEditMode(!editMode); // Toggle edit mode
  };

  const handleCellChange = (value, rowIndex, columnName) => {
    const newData = [...filteredData];
    newData[rowIndex][columnName] = value;
    setFilteredData(newData);
  };

  const tableHeaders = data.length > 0 ? Object.keys(data[0]) : [];

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
        <ButtonGroup variant="contained" aria-label="Basic button group">
          <Button variant="contained" onClick={handleEdit}>Edit</Button>
          <Button variant="contained" onClick={handleUpdate}>Update</Button>
        </ButtonGroup>

        <ButtonGroup variant="contained" aria-label="Basic button group">
          <Button variant="contained" onClick={handleDownload}>Download</Button>
          <Button variant="contained" onClick={handleSendMail}>Send Mail</Button>
        </ButtonGroup>

        <Modal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box sx={{ width: 400, bgcolor: 'background.paper', p: 2, textAlign: 'center' }}>
            <h2>Upload File</h2>
            <input type="file" style={{ marginBottom: '16px' }} onChange={(e) => setSelectedFile(e.target.files[0])} />
            <Button variant="contained" style={{ marginRight: '8px' }} onClick={handleUpload}>Upload Attachment</Button>
            <Button variant="contained" onClick={() => setIsModalOpen(false)}>Close</Button>
          </Box>
        </Modal>
      </Stack>
      <Stack>
        <TableContainer component={Paper} sx={{ maxHeight: "67vh", minHeight: "67vh" }}>
          <Table>
            <TableHead>
              <TableRow className="table-header">
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                {tableHeaders.map(header => (
                  <TableCell key={header}>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {(filterValue ? filteredData : data).map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedRows.includes(row)}
                      onChange={() => handleRowSelect(row)}
                    />
                  </TableCell>
                  {tableHeaders.map((header, colIndex) => (
                    <TableCell key={colIndex}>
                      {editMode ? (
                        <TextField
                          value={row[header]}
                          onChange={(e) => handleCellChange(e.target.value, rowIndex, header)}
                        />
                      ) : (
                        row[header]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
      {successMail && (
        <Alert severity="success" sx={{ position: 'fixed', top: 20, right: 20 }}>
          Mail & Bot Triggered Successfully
        </Alert>
      )}
      {successUpdate && (
        <Alert severity="success" sx={{ position: 'fixed', top: 20, right: 20 }}>
          The data updated successfully
        </Alert>
      )}
    </div>
  );
};

export default AxisRequestData;
