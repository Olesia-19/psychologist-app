export const ModalType = {
  LOGIN: "login",
  REGISTER: "register",
  APPOINTMENT: "appointment",
} as const;

export type ModalType = (typeof ModalType)[keyof typeof ModalType];
