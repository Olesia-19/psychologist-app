import { createContext } from "react";
import type { ModalType } from "../../types/modal";

interface ModalContextProps {
  modalType: ModalType | null;
  modalData?: Record<string, unknown>;
  openModal: (type: ModalType, data?: Record<string, unknown>) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextProps | undefined>(
  undefined
);
