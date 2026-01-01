import { useState } from "react";
import type { ModalType } from "../../types/modal";
import { ModalContext } from "./modal-context";

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modalType, setModalType] = useState<ModalType | null>(null);
  const [modalData, setModalData] = useState<
    Record<string, unknown> | undefined
  >(undefined);

  const openModal = (type: ModalType, data?: Record<string, unknown>) => {
    setModalType(type);
    setModalData(data);
  };
  const closeModal = () => {
    setModalType(null);
    setModalData(undefined);
  };

  return (
    <ModalContext.Provider
      value={{ modalType, modalData, openModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};
