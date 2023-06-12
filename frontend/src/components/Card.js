import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardDelete, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const likeButtonClassName = `like-button ${isLiked && "like-button_active"}`;

  const handleCardClick = () => {
    onCardClick(card);
  };

  function handleDeleteClick() {
    onCardDelete(card);
  }

  const handleLikeClick = () => {
    onCardLike(card);
  };

  return (
    <li className="places__item">
      {isOwn && (
        <button
          type="button"
          className="delete-button"
          arial-label="удалить"
          onClick={handleDeleteClick}
        ></button>
      )}
      <img
        className="places__image"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      <div className="places__item-name">
        <h2 className="places__name">{card.name}</h2>
        <div className="places__like-container">
          <button
            type="button"
            className={likeButtonClassName}
            aria-label="нравится"
            aria-pressed="false"
            onClick={handleLikeClick}
          ></button>
          <span className="like-button__count">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
