import css from "./Footer.module.css";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <p className={css.wrapper}>
          © {new Date().getFullYear()}{" "}
          <span className={css.logoSpan}>psychologists.</span>services
        </p>
      </div>
    </footer>
  );
}
