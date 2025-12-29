import { createContext } from "react";
import type { ModalType } from "../../types/modal";

interface ModalContextProps {
  modalType: ModalType | null;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextProps | undefined>(
  undefined
);
