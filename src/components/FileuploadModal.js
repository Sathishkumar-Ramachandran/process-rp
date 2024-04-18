import React, { useState } from 'react';
import { Button, Modal, Box, TextField } from '@mui/material';

const FileUploadModal = ({ isOpen, onClose, onFileUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    // Pass the selected file to the parent component
    onFileUpload(selectedFile);
    // Close the modal
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={{ width: 300, bgcolor: 'background.paper', p: 2 }}>
        <input type="file" onChange={handleFileChange} />
        <Button onClick={handleUpload}>Upload</Button>
      </Box>
    </Modal>
  );
};

export default FileUploadModal;
