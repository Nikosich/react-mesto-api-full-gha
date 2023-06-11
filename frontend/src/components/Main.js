import { useContext } from "react";
import Card from "./Card";
import Footer from "./Footer";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <main className="content">
        <section className="profile">
          <div className="profile__container">
            <button
              className="profile__edit-button"
              onClick={onEditAvatar}
            ></button>
            <img
              className="profile__image"
              src={currentUser.avatar}
              alt="Кусто"
            />
            <div className="profile__info">
              <div className="profile__item">
                <h1 className="profile__name">{currentUser.name}</h1>
                <button
                  type="button"
                  className="edit-button button"
                  aria-label="редактировать профиль"
                  onClick={onEditProfile}
                ></button>
              </div>
              <p className="profile__profession">{currentUser.about}</p>
            </div>
          </div>
          <button
            className="add-button button"
            type="button"
            aria-label="добавить новое фото"
            onClick={onAddPlace}
          ></button>
        </section>
        <ul className="places__container" id="places__container">
          {cards.map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            );
          })}
        </ul>
      </main>
      <Footer />
    </>
  );
}

export default Main;
