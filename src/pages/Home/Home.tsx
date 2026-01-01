import { Link } from "react-router-dom";
import css from "./Home.module.css";

const Home = () => {
  return (
    <div className="container">
      <div className={css.homePage}>
        <div className={css.infoWrapper}>
          <div className={css.text}>
            <h1 className={css.title}>
              The road to the <span className={css.span}>depths</span> of the
              human soul
            </h1>
            <p className={css.subtitle}>
              We help you to reveal your potential, overcome challenges and find
              a guide in your own life with the help of our experienced
              psychologists.
            </p>
          </div>

          <Link to="/psychologists" className={css.button}>
            Get started
            <svg width={24} height={24} className={css.logOutIcon}>
              <use href="/sprite.svg#icon-arrow"></use>
            </svg>
          </Link>
        </div>

        <div className={css.imagesWrapper}>
          <img
            src="/homeImg.webp"
            srcSet="/homeImg@2x.webp 2x, /homeImg@3x.webp 3x"
            alt="Psychologist"
            width="464"
            loading="lazy"
            decoding="async"
            className={css.mainImage}
          />

          <div className={css.iconQuestion}>
            <svg className={css.icon} width={10} height={17}>
              <use href="/sprite.svg#icon-question" />
            </svg>
          </div>

          <div className={css.iconUsers}>
            <svg className={css.icon} width={20} height={20}>
              <use href="/sprite.svg#icon-users" />
            </svg>
          </div>

          <div className={css.badge}>
            <div className={css.iconCheckWrapper}>
              <svg className={css.iconCheck} width={30} height={30}>
                <use href="/sprite.svg#icon-check" />
              </svg>
            </div>
            <div className={css.badgeInfo}>
              <p className={css.badgeText}>Experienced psychologists</p>
              <p className={css.badgeNumber}>15,000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
