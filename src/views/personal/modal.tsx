import React, { useState } from 'react';
import { Modal, Button } from 'antd';

interface ModalProps {
  title: string;
  content: string;
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
}

const ModalComponent: React.FC<ModalProps> = ({ title, content, visible, onOk, onCancel }) => {
  const [modalVisible, setModalVisible] = useState(visible);

  const handleOk = () => {
    onOk();
    setModalVisible(false);
  };

  const handleCancel = () => {
    onCancel();
    setModalVisible(false);
  };

  return (
    <Modal
      title={title}
      visible={modalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>{content}</p>
    </Modal>
  );
};

export default ModalComponent;