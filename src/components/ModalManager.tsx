import React from "react";
import ModalPortal from "../components/ModalPortal/ModalPortal";
import { useModal } from "../context/modal/useModal";
import { ModalType } from "../types/modal";
import LoginForm from "./LoginForm/LoginForm";
import RegistrationForm from "./RegistrationForm/RegistrationForm";
import AppointmentForm from "./AppointmentForm/AppointmentForm";
import MobileMenu from "./MobileMenu/MobileMenu";

const ModalManager: React.FC = () => {
  const { modalType, modalData, closeModal } = useModal();

  const renderContent = () => {
    switch (modalType) {
      case ModalType.LOGIN:
        return <LoginForm />;
      case ModalType.REGISTER:
        return <RegistrationForm />;
      case ModalType.APPOINTMENT:
        if (modalData && modalData.psychologist) {
          return (
            <AppointmentForm
              psychologist={
                modalData.psychologist as {
                  id: string;
                  name: string;
                  avatar_url: string;
                }
              }
            />
          );
        } else {
          return null;
        }
      case ModalType.MOBILE_MENU:
        return <MobileMenu />;
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
