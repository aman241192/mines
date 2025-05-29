import React, { useState } from "react";
import { Button, Modal } from "antd";

const CustomModal = ({
  closable,
  onCancel,
  open,
  setOpen,
  children,
  width = "300px",
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const modalStyles = {
    header: {
      borderLeft: `5px solid red`,
      borderRadius: 0,
      paddingInlineStart: 5,
    },
    mask: {
      backdropFilter: "blur(10px)",
    },

    content: {
      background: "#3A4142",
      border: "4px solid #4A5354",
      padding: "20px",
    },
  };

  return (
    <div>
      <Modal
        width={width}
        styles={modalStyles}
        open={open}
        onCancel={onCancel}
        closable={closable ?? true}
        footer={(_, { OkBtn, CancelBtn }) => <></>}
      >
        {children}
      </Modal>
    </div>
  );
};

export default CustomModal;
