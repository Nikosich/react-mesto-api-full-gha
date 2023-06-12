import { Link } from "react-router-dom";
import { useState } from "react";

function Register({ onRegister }) {
  const defaultValues = {
    email: "",
    password: "",
  };

  const [inputValues, setInputValues] = useState(defaultValues);

  function handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    setInputValues((state) => ({ ...state, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onRegister(inputValues);
    resetForm();
  }

  function resetForm() {
    setInputValues({ ...defaultValues });
  }

  return (
    <main>
      <div className="auth">
        <h2 className="auth__title">Регистрация</h2>
        <form className="auth__form" onSubmit={handleSubmit} noValidate>
          <input
            type="email"
            placeholder="Email"
            className="auth__input"
            name="email"
            id="email"
            autoComplete="email"
            value={inputValues.email || ""}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Пароль"
            className="auth__input"
            autoComplete="password"
            value={inputValues.password || ""}
            onChange={handleChange}
            required
          />
          <button type="submit" className="auth__submit">
            Зарегестрироваться
          </button>
        </form>
        <p className="auth__clarification">
          Уже Зарегестрированы?{" "}
          <Link className="auth__link" to="/sign-in">
            Войти
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Register;
