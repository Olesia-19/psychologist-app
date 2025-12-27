import { Link } from "react-router-dom";
import css from "./Home.module.css";

const Home = () => {
  return (
    <div className={css.home_page}>
      <div className={css.text}>
        <h1 className={css.title}>
          The road to the <span className={css.span}>depths</span> of the human
          soul
        </h1>
        <p className={css.subtitle}>
          We help you to reveal your potential, overcome challenges and find a
          guide in your own life with the help of our experienced psychologists.
        </p>
      </div>
      <Link to="/psychologists" className={css.button}>
        Get started
        <svg width={24} height={24} className={css.logOutIcon}>
          <use href="/sprite.svg#icon-arrow"></use>
        </svg>
      </Link>
    </div>
  );
};

export default Home;
