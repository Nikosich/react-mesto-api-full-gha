import useForm from "../hooks/useForm";

function Login({ onLogin }) {
  const { values, handleChange, setValues } = useForm();

  const defaultValues = {
    email: "",
    password: "",
  };

  function handleSubmit(event) {
    event.preventDefault();
    resetForm();
    if (!values.email || !values.password) {
      return;
    }
    onLogin(values);
  }

  function resetForm() {
    setValues({ ...defaultValues });
  }

  return (
    <main>
      <div className="auth">
        <h2 className="auth__title">Вход</h2>
        <form className="auth__form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="auth__input"
            name="email"
            id="email"
            autoComplete="email"
            value={values.email || ""}
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
            value={values.password || ""}
            onChange={handleChange}
            required
          />
          <button type="submit" className="auth__submit">
            Войти
          </button>
        </form>
      </div>
    </main>
  );
}

export default Login;
