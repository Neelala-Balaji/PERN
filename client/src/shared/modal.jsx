import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  minHeight: 200,
};

const BasicModal = ({ visible, children, onClose = () => {} }) => {
  const [open, setOpen] = useState(visible || false);
  const handleClose = () => {
    setOpen(false);
    onClose(false);
  };

  useEffect(() => {
    setOpen(visible);
  }, [visible]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  );
};

export default BasicModal;
