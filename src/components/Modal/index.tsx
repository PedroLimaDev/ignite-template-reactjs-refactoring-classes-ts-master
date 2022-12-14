import React from 'react';
import ReactModal from 'react-modal';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: any;
}

const Modal = ({ isOpen, setIsOpen, children }: ModalProps) => {
  // const [modalStatus, setModalStatus] = React.useState(false);

  // React.useEffect(() => {
  //   if (modalStatus !== isOpen) setModalStatus(isOpen);
  // }, []);

  const closeModal = () => {
    setIsOpen(false);
  }

  return (
    <ReactModal
      shouldCloseOnOverlayClick={!false}
      onRequestClose={closeModal}
      isOpen={isOpen}
      ariaHideApp={false}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          background: '#F0F0F5',
          color: '#000000',
          borderRadius: '8px',
          width: '736px',
          border: 'none',
        },
        overlay: {
          backgroundColor: '#121214e6',
        },
      }}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
