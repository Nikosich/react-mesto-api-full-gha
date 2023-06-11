import { useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";
import useForm from "../hooks/useForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, setValues } = useForm();

  useEffect(() => {
    setValues({ name: currentUser.name, job: currentUser.about });
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: values.name,
      about: values.job,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      submitBtn="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup-form__field">
        <input
          className="popup-form__input popup-form__input_text_name "
          type="text"
          placeholder="Имя"
          required
          minLength="2"
          maxLength="40"
          id="name-input"
          name="name"
          onChange={handleChange}
          value={values.name || ""}
        />
        <span className="popup-form__input-error name-input-error"></span>
      </fieldset>
      <fieldset className="popup-form__field">
        <input
          className="popup-form__input popup-form__input_text_job"
          type="text"
          placeholder="О себе"
          required
          minLength="2"
          maxLength="200"
          id="about-input"
          name="job"
          onChange={handleChange}
          value={values.job || ""}
        />
        <span className="popup-form__input-error about-input-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
