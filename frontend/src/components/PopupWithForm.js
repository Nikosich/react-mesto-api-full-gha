function PopupWithForm({name,isOpen,onClose,onSubmit,title,children,submitBtn}) {
  return (
    <div
      className={`popup popup-${name} ${
        isOpen ? "popup_open" : ""
      }`}
      id={`popup-${name}`}
    >
      <div className="popup__modal-window">
        <button
          type="button"
          className="popup__close-button button"
          onClick={onClose}
        />
        <form
          className={`popup-form popup-form_${name}`}
          name={`${name}Form`}
          action="#"
          onSubmit={onSubmit}
        >
          <h2 className="popup-form__header">{title}</h2>
          {children}
          <button className="popup-form__save-button" type="submit">
            {submitBtn}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
