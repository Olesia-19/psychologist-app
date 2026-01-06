import { useState } from "react";
import { useModal } from "../../context/modal/useModal";
import { registerUser } from "../../firebase/auth";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./RegistrationForm.module.css";
import { saveUserProfile } from "../../firebase/db";

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegistrationForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [firebaseError, setFirebaseError] = useState<string | null>(null);
  const { closeModal } = useModal();

  const initialValues: FormValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().trim().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Password too short").required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Required"),
  });

  const handleSubmit = async (values: FormValues) => {
    setFirebaseError(null);
    try {
      const user = await registerUser(
        values.email,
        values.password,
        values.name
      );

      await saveUserProfile(user.uid, {
        name: values.name,
        email: values.email,
        createdAt: Date.now(),
      });

      closeModal();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setFirebaseError(err.message);
      } else {
        setFirebaseError("Registration failed");
      }
    }
  };

  return (
    <div className={css.wrapper}>
      <div className={css.header}>
        <h1 className={css.title}>Registration</h1>
        <p className={css.subTitle}>
          Thank you for your interest in our platform! In order to register, we
          need some information. Please provide us with the following
          information.
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className={css.form}>
            <Field
              name="name"
              type="text"
              placeholder="Name"
              className={css.input}
            />
            <ErrorMessage name="name" component="p" className={css.error} />

            <Field
              name="email"
              type="email"
              placeholder="Email"
              className={css.input}
            />
            <ErrorMessage name="email" component="p" className={css.error} />

            <div className={css.passwordWrapper}>
              <Field
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={css.input}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className={css.eyeBtn}
              >
                <svg width="22" height="19" className={css.eyeIcon}>
                  <use
                    href={
                      showPassword
                        ? "/sprite.svg#icon-eye"
                        : "/sprite.svg#icon-eye-off"
                    }
                  ></use>
                </svg>
              </button>
            </div>
            <ErrorMessage name="password" component="p" className={css.error} />

            <div className={css.passwordWrapper}>
              <Field
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className={css.input}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className={css.eyeBtn}
              >
                <svg width="22" height="19" className={css.eyeIcon}>
                  <use
                    href={
                      showPassword
                        ? "/sprite.svg#icon-eye"
                        : "/sprite.svg#icon-eye-off"
                    }
                  ></use>
                </svg>
              </button>
            </div>

            <ErrorMessage
              name="confirmPassword"
              component="p"
              className={css.error}
            />

            {firebaseError && <p className={css.error}>{firebaseError}</p>}

            <button type="submit" className={css.btn}>
              Sign Up
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
