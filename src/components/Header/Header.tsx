import { useAuth } from "../../context/auth/useAuth";
import { useModal } from "../../context/modal/useModal";
import { ModalType } from "../../types/modal";
import { logoutUser } from "../../firebase/auth";
import css from "./Header.module.css";
import { Link } from "react-router-dom";

export default function Header() {
  const { user, loading } = useAuth();
  const { openModal } = useModal();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <header>
      <div className="container">
        <nav>
          <Link to="/" className={css.logo}>
            <span className={css.logoSpan}>psychologists.</span>services
          </Link>
          <ul className={css.navMenu}>
            <li>
              <Link to="/" className={css.navMenuLink}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/psychologists" className={css.navMenuLink}>
                Psychologists
              </Link>
            </li>
            {user && (
              <li>
                <Link to="/favorites" className={css.navMenuLink}>
                  Favorites
                </Link>
              </li>
            )}
          </ul>

          <div className={css.auth}>
            {!user ? (
              <>
                <button
                  type="button"
                  onClick={() => openModal(ModalType.LOGIN)}
                  className={css.loginBtn}
                >
                  Log in
                </button>
                <button
                  type="button"
                  onClick={() => openModal(ModalType.REGISTER)}
                  className={css.registerBtn}
                >
                  Registration
                </button>
              </>
            ) : (
              <div className={css.desktopRight}>
                <div className={css.userInfo}>
                  <div className={css.userIconWrapper}>
                    <svg width={24} height={24} className={css.userIcon}>
                      <use href="/sprite.svg#icon-user"></use>
                    </svg>
                  </div>
                  <span className={css.userName}>
                    {user.displayName || user.email}
                  </span>
                </div>
                <button
                  type="button"
                  className={css.logoutBtn}
                  onClick={logoutUser}
                >
                  Log out
                </button>
              </div>
            )}
          </div>

          <div className={css.rightControls}>
            {user && (
              <div className={css.userInfo}>
                <div className={css.userIconWrapper}>
                  <svg width={20} height={20} className={css.userIcon}>
                    <use href="/sprite.svg#icon-user"></use>
                  </svg>
                </div>
                <span className={css.userName}>
                  {user.displayName || user.email}
                </span>
              </div>
            )}

            <button
              type="button"
              className={css.burgerBtn}
              onClick={() => openModal(ModalType.MOBILE_MENU)}
            >
              <svg width={24} height={24} className={css.burgerIcon}>
                <use href="/sprite.svg#icon-burger-menu"></use>
              </svg>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
