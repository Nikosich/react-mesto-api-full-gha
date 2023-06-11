import { useEffect } from "react";
import useForm from "../hooks/useForm";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const { values, handleChange, setValues } = useForm();

  useEffect(() => {
    setValues({});
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: values.place,
      link: values.placeLink,
    });
  }

  return (
    <PopupWithForm
      name="place"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitBtn="Создать"
    >
      <fieldset className="popup-form__field">
        <input
          className="popup-form__input popup-form__input_place_name"
          type="text"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
          id="place-input"
          name="place"
          onChange={handleChange}
          value={values.place || ""}
        />
        <span className="popup-form__input-error place-input-error"></span>
      </fieldset>
      <fieldset className="popup-form__field">
        <input
          className="popup-form__input popup-form__input_link_photo "
          placeholder="Ссылка на картинку"
          type="url"
          required
          id="link-input"
          name="placeLink"
          onChange={handleChange}
          value={values.placeLink || ""}
        />
        <span className="popup-form__input-error link-input-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
