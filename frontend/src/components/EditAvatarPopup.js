import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useForm from "../hooks/useForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const { values, handleChange, setValues } = useForm();

  useEffect(() => {
    setValues({});
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: values.avatar,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitBtn="Сохранить"
    >
      <fieldset className="popup-form__field">
        <input
          className="popup-form__input popup-form__input_link_avatar "
          placeholder="Ссылка на фото"
          type="url"
          required
          id="link-avatar"
          name="avatar"
          onChange={handleChange}
          value={values.avatar || ""}
        />
        <span className="popup-form__input-error link-avatar-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
