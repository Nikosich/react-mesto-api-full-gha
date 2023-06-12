import dev from "../images/dev.svg";
import { Link } from "react-router-dom";

function Header({loggedIn, onSignOut, email}) {

  return (
    <header className="header">
      <img className="header__logo" src={dev} alt="лого" />
      {window.location.pathname === "/signup" && (
        <Link to="/signin" className="header__link">
          Войти
        </Link>
      )}
      {window.location.pathname === "/signin" && (
        <Link to="/signup" className="header__link">
          Регистрация
        </Link>
      )}
      {loggedIn && (
        <nav className="header__nav">
          <p className="user-mail">{email}</p>
          <button className="header__sign-out" onClick={() => onSignOut()}>
            Выйти
          </button>
        </nav>
      )}
    </header>
  );
}

export default Header;
