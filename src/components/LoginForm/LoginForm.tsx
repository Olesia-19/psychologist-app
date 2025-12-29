import { useState } from "react";
import { useModal } from "../../context/modal/useModal";
import { loginUser } from "../../firebase/auth";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./LoginForm.module.css";

interface FormValues {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [firebaseError, setFirebaseError] = useState<string | null>(null);
  const { closeModal } = useModal();

  const initialValues: FormValues = { email: "", password: "" };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Password too short").required("Required"),
  });

  const handleSubmit = async (values: FormValues) => {
    setFirebaseError(null);
    try {
      const user = await loginUser(values.email, values.password);
      console.log("Logged in:", user);
      closeModal();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setFirebaseError(err.message);
      } else {
        setFirebaseError("Failed to log in");
      }
    }
  };

  return (
    <div className={css.wrapper}>
      <div className={css.header}>
        <h1 className={css.title}>Log In</h1>
        <p className={css.subTitle}>
          Welcome back! Please enter your credentials to access your account and
          continue your search for a psychologist.
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

            {firebaseError && <p className={css.error}>{firebaseError}</p>}

            <button type="submit" className={css.btn}>
              Log In
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
