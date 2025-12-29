import { useAuth } from "../../context/auth/useAuth";
import { useModal } from "../../context/modal/useModal";
import { ModalType } from "../../types/modal";
import { logoutUser } from "../../firebase/auth";
import css from "./Header.module.css";

export default function Header() {
  const { user, loading } = useAuth();
  const { openModal } = useModal();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <header>
      <nav>
        <a href="/" className={css.logo}>
          <span className={css.logoSpan}>psychologists.</span>services
        </a>
        <ul className={css.navMenu}>
          <li className={css.navMenuItem}>
            <a href="/" className={css.navMenuLink}>
              Home
            </a>
          </li>
          <li className={css.listItem}>
            <a href="/psychologists" className={css.navMenuLink}>
              Psychologists
            </a>
          </li>
          {user && (
            <li className={css.listItem}>
              <a href="/favorites" className={css.navMenuLink}>
                Favorites
              </a>
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
              <button type="button" className={css.registerBtn}>
                Registration
              </button>
            </>
          ) : (
            <div className={css.headerRight}>
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
      </nav>
    </header>
  );
}
