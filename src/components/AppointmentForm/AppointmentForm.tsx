import { useState } from "react";
import { useModal } from "../../context/modal/useModal";
import { ModalType } from "../../types/modal";
import { createAppointment } from "../../firebase/appointments";
import { useAuth } from "../../context/auth/useAuth";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./AppointmentForm.module.css";

interface FormValues {
  name: string;
  phone: string;
  time: string;
  email: string;
  comment: string;
}

interface Props {
  psychologist: {
    id: string;
    name: string;
    avatar_url: string;
  };
}

export default function AppointmentForm({ psychologist }: Props) {
  const { user } = useAuth();
  const { openModal, closeModal } = useModal();
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const [firebaseError, setFirebaseError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues: FormValues = {
    name: "",
    phone: "",
    time: "",
    email: user?.email ?? "",
    comment: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().min(2, "Too short").required("Required"),

    phone: Yup.string()
      .matches(/^\+?\d{10,15}$/, "Invalid phone number")
      .required("Required"),

    time: Yup.string().required("Required"),

    email: Yup.string().trim().email("Invalid email").required("Required"),

    comment: Yup.string().min(5, "Comment is too short").required("Required"),
  });

  const handleSubmit = async (values: FormValues) => {
    if (!user) {
      openModal(ModalType.LOGIN);
      return;
    }

    setFirebaseError(null);
    setIsSubmitting(true);
    try {
      await createAppointment({
        userId: user.uid,
        psychologistId: psychologist.id,
        ...values,
        createdAt: Date.now(),
      });

      closeModal();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setFirebaseError("Something went wrong. Please try again later.");
      } else {
        setFirebaseError("Failed to create appointment");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={css.wrapper}>
      <div className={css.header}>
        <h1 className={css.title}>Make an appointment with a psychologists</h1>
        <p className={css.subTitle}>
          You are on the verge of changing your life for the better. Fill out
          the short form below to book your personal appointment with a
          professional psychologist. We guarantee confidentiality and respect
          for your privacy.
        </p>
      </div>

      <div className={css.psychologist}>
        <img
          src={psychologist.avatar_url}
          alt={psychologist.name}
          className={css.psychologistAvatar}
        />

        <div>
          <p className={css.psychologistLabel}>Your psychologist</p>
          <p className={css.psychologistName}>{psychologist.name}</p>
        </div>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className={css.form}>
            <Field
              name="name"
              type="text"
              placeholder="Name"
              className={css.input}
            />
            <ErrorMessage name="name" component="p" className={css.error} />

            <div className={css.row}>
              <div className={css.half}>
                <Field name="phone" placeholder="+353" className={css.input} />
                <ErrorMessage
                  name="phone"
                  component="p"
                  className={css.error}
                />
              </div>

              <div className={css.half}>
                <div className={css.timeWrapper}>
                  <Field
                    name="time"
                    placeholder="00:00"
                    className={css.input}
                    readOnly
                    onClick={() => setIsTimeOpen((prev) => !prev)}
                  />
                  <ErrorMessage
                    name="time"
                    component="p"
                    className={css.error}
                  />

                  <span className={css.clockIcon}>
                    <svg width="16" height="16">
                      <use href="/sprite.svg#icon-clock"></use>
                    </svg>
                  </span>

                  {isTimeOpen && (
                    <div className={css.timeDropdown}>
                      <p className={css.timeTitle}>Meeting time</p>
                      <ul>
                        {["09 : 00", "09 : 30", "10 : 00", "10 : 30"].map(
                          (time) => (
                            <li
                              key={time}
                              onClick={() => {
                                setFieldValue("time", time);
                                setIsTimeOpen(false);
                              }}
                            >
                              {time}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Field
              name="email"
              type="email"
              placeholder="Email"
              className={css.input}
            />
            <ErrorMessage name="email" component="p" className={css.error} />

            <Field
              as="textarea"
              name="comment"
              placeholder="Comment"
              className={css.textarea}
            />
            <ErrorMessage name="comment" component="p" className={css.error} />

            {firebaseError && <p className={css.error}>{firebaseError}</p>}

            <button type="submit" className={css.btn} disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
