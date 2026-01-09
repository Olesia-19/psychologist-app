import { useAuth } from "../../context/auth/useAuth";
import { useModal } from "../../context/modal/useModal";
import { logoutUser } from "../../firebase/auth";
import { ModalType } from "../../types/modal";
import css from "./MobileMenu.module.css";

export default function MobileMenu() {
  const { user } = useAuth();
  const { closeModal, openModal } = useModal();

  return (
    <div className={css.menu}>
      <nav className={css.nav}>
        <a href="/" onClick={closeModal}>
          Home
        </a>
        <a href="/psychologists" onClick={closeModal}>
          Psychologists
        </a>
        {user && (
          <a href="/favorites" onClick={closeModal}>
            Favorites
          </a>
        )}
      </nav>

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
          <div className={css.authUser}>
            <div className={css.userInfo}>
              <div className={css.userIconWrapper}>
                <svg width={16} height={16} className={css.userIcon}>
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
    </div>
  );
}
