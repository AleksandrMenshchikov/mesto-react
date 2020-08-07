import React from "react";
import loadingGif from "../images/loading-gif1.gif";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import Card from "./Card";
import { api } from "../utils/api.js";

function Main(props) {
  const [userName, setUserName] = React.useState();
  const [userDescription, setUserDescription] = React.useState();
  const [userAvatar, setUserAvatar] = React.useState();
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getUserData()
      .then((data) => {
        setUserName(data.name);
        setUserDescription(data.about);
        setUserAvatar(data.avatar);
      })
      .catch((err) => console.error(err));
  }, []);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards([...data]);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <section className="profile page__profile">
        <div className="profile__avatar-container" onClick={props.onEditAvatar}>
          <img
            src={userAvatar ? userAvatar : loadingGif}
            alt="Фотография"
            className="profile__avatar"
          />
        </div>
        <div className="profile__info">
          <div className="profile__info-top">
            <h2 className="profile__title">
              {userName ? userName : "Loading..."}
            </h2>
            <button
              type="button"
              className="profile__edit-button"
              title="Редактировать профиль"
              onClick={props.onEditProfile}
            ></button>
          </div>
          <p className="profile__subtitle">
            {userDescription ? userDescription : "Loading..."}
          </p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          title="Добавить карточку"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="elements page__elements">
        <ul className="elements__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              link={card.link}
              name={card.name}
              likes={card.likes.length}
              onCardClick={props.onCardClick}
              card={{ link: card.link, name: card.name }}
            />
          ))}
        </ul>
      </section>

      <ImagePopup
        isOpen={props.isImageCardPopupOpen}
        onClose={props.onClose}
        link={props.selectedCard.link}
        description={props.selectedCard.name}
      />

      <PopupWithForm
        name="pop-up_profile"
        title="Редактировать профиль"
        isOpen={props.isEditProfilePopupOpen}
        onClose={props.onClose}
      >
        <div className="form__input-container">
          <input
            name="input-name"
            type="text"
            className="form__input form__input_name"
            placeholder="Имя Фамилия"
            required
            minLength="2"
            maxLength="40"
            pattern="[A-Za-zА-Яа-яЁё\s\-]+"
          />
          <span id="input-name-error" className="form__input-error">
            Ошибка
          </span>
        </div>
        <div className="form__input-container">
          <input
            name="input-profession"
            type="text"
            className="form__input form__input_profession"
            placeholder="Профессиональная деятельность"
            required
            minLength="2"
            maxLength="200"
          />
          <span id="input-profession-error" className="form__input-error">
            Ошибка
          </span>
        </div>
        <button type="submit" className="form__input-button" disabled>
          Сохранить
        </button>
      </PopupWithForm>

      <PopupWithForm
        name="pop-up_card"
        title="Новое место"
        isOpen={props.isAddPlacePopupOpen}
        onClose={props.onClose}
      >
        <div className="form__input-container">
          <input
            name="input-name-card"
            type="text"
            className="form__input form__input_name-card"
            placeholder="Название"
            required
            minLength="1"
            maxLength="30"
            pattern="[A-Za-zА-Яа-яЁё\s\-]+"
          />
          <span id="input-name-card-error" className="form__input-error">
            Ошибка
          </span>
        </div>
        <div className="form__input-container">
          <input
            name="input-link-card"
            type="url"
            className="form__input form__input_link-card"
            placeholder="Ссылка на картинку"
            required
          />
          <span id="input-link-card-error" className="form__input-error">
            Ошибка
          </span>
        </div>
        <button type="submit" className="form__input-button" disabled>
          Создать
        </button>
      </PopupWithForm>

      <PopupWithForm name="pop-up_confirm" title="Вы уверены?">
        <button
          type="button"
          className="form__input-button form__input-button_comfirm"
        >
          Да
        </button>
      </PopupWithForm>

      <PopupWithForm
        name="pop-up_avatar"
        title="Обновить аватар"
        isOpen={props.isEditAvatarPopupOpen}
        onClose={props.onClose}
      >
        <div className="form__input-container">
          <input
            name="input-link-avatar"
            type="url"
            className="form__input form__input_link-avatar"
            placeholder="Ссылка на картинку"
            required
          />
          <span id="input-link-avatar-error" className="form__input-error">
            Ошибка
          </span>
        </div>
        <button type="submit" className="form__input-button" disabled>
          Сохранить
        </button>
      </PopupWithForm>
    </>
  );
}

export default Main;
