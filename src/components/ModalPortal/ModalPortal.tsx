import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import css from "./ModalPortal.module.css";

interface ModalPortalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalPortal = ({ isOpen, onClose, children }: ModalPortalProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={css.overlay} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.modalClose} onClick={onClose} aria-label="Close">
          <svg width={32} height={32}>
            <use href="/sprite.svg#icon-close-modal"></use>
          </svg>
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
};

export default ModalPortal;
