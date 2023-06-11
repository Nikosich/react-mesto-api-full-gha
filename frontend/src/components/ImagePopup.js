function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`photo-popup popup ${card.link ? "popup_open" : ""}`}
      id="photo-popup"
    >
      <div className="photo-popup__open pic-fullscrean">
        <img
          className="photo-popup__image pic-fullscrean__image"
          src={card.link}
          alt={card.name}
        />
        <button
          type="button"
          className="photo-popup__close popup__close-button button"
          onClick={onClose}
        ></button>
        <h3 className="photo-popup__name pic-fullscrean__name">{card.name}</h3>
      </div>
    </div>
  );
}
export default ImagePopup;
