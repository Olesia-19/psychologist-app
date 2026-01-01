import { ref, push } from "firebase/database";
import { db } from "./config";
import type { Appointment } from "../types/appointment";

export const createAppointment = async (data: Appointment) => {
  const appointmentsRef = ref(db, "appointments");
  const newRef = await push(appointmentsRef, {
    ...data,
    createdAt: Date.now(),
  });

  return newRef.key;
};
