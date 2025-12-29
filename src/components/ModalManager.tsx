import React from "react";
import ModalPortal from "../components/ModalPortal/ModalPortal";
import { useModal } from "../context/modal/useModal";
import { ModalType } from "../types/modal";
import LoginForm from "./LoginForm/LoginForm";
// import RegisterForm from "./RegisterForm";
// import AppointmentForm from "./AppointmentForm";

const ModalManager: React.FC = () => {
  const { modalType, closeModal } = useModal();

  const renderContent = () => {
    switch (modalType) {
      case ModalType.LOGIN:
        return <LoginForm />;
      //   case ModalType.REGISTER:
      //     return <RegisterForm onClose={closeModal} />;
      //   case ModalType.APPOINTMENT:
      //     return <AppointmentForm onClose={closeModal} />;
      default:
        return null;
    }
  };

  return (
    <ModalPortal isOpen={modalType !== null} onClose={closeModal}>
      {renderContent()}
    </ModalPortal>
  );
};

export default ModalManager;
