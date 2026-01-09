export const ModalType = {
  LOGIN: "login",
  REGISTER: "register",
  APPOINTMENT: "appointment",
  MOBILE_MENU: "mobile_menu",
} as const;

export type ModalType = (typeof ModalType)[keyof typeof ModalType];
