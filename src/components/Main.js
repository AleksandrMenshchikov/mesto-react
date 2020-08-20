import React from "react";
import loadingGif from "../images/loading-gif1.gif";
import ImagePopup from "./ImagePopup";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  isImageCardPopupOpen,
  onClose,
  selectedCard,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <section className="profile page__profile">
        <div className="profile__avatar-container" onClick={onEditAvatar}>
          <img
            src={currentUser.avatar || loadingGif}
            alt="Фотография"
            className="profile__avatar"
          />
        </div>
        <div className="profile__info">
          <div className="profile__info-top">
            <h2 className="profile__title">
              {currentUser.name || "Loading..."}
            </h2>
            <button
              type="button"
              className="profile__edit-button"
              title="Редактировать профиль"
              onClick={onEditProfile}
            />
          </div>
          <p className="profile__subtitle">
            {currentUser.about || "Loading..."}
          </p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          title="Добавить карточку"
          onClick={onAddPlace}
        />
      </section>

      <section className="elements page__elements">
        <ul className="elements__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              onCardClick={onCardClick}
              card={card}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>

      <ImagePopup
        isOpen={isImageCardPopupOpen}
        onClose={onClose}
        selectedCard={selectedCard}
      />
    </>
  );
}

export default Main;
