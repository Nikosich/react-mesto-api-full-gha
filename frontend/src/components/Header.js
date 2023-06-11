import dev from "../images/dev.svg";
import { Link } from "react-router-dom";

function Header({loggedIn, onSignOut, email}) {

  return (
    <header className="header">
      <img className="header__logo" src={dev} alt="лого" />
      {window.location.pathname === "/sign-up" && (
        <Link to="/sign-in" className="header__link">
          Войти
        </Link>
      )}
      {window.location.pathname === "/sign-in" && (
        <Link to="/sign-up" className="header__link">
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
