function InfoTooltipPopup({ info, onClose }) {
  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) onClose(event);
  }

  return (
    <div
      className={`popup popup_info ` + (info ? " popup_open" : "")}
      onClick={handleOverlayClick}
    >
      <button
        className="popup__close-button button"
        type="button"
        aria-label="Закрыть модальное окно"
        onClick={onClose}
      ></button>
      <div className="popup__modal-window">
        <p
          className={
            "popup__info-message" +
            (info
              ? info.isSuccess
                ? " popup__info-message_success"
                : " popup__info-message_fail"
              : "")
          }
        >
          {info ? info.text : " "}
        </p>
      </div>
    </div>
  );
}

export default InfoTooltipPopup;
