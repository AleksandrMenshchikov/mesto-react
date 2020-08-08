import React from "react";

function Card({ onCardClick, card, link, name, likes }) {
  function handleClick() {
    onCardClick(card);
  }

  return (
    <li className="elements__item">
      <button
        type="button"
        className="elements__remove"
        aria-label="Удалить карточку"
      />
      <div
        className="elements__image"
        role="img"
        style={{ backgroundImage: `url(${link})` }}
        onClick={handleClick}
      />
      <article className="elements__item-bottom">
        <h4 className="elements__item-title">{name}</h4>
        <div className="elements__like-container">
          <button
            type="button"
            className="elements__like"
            aria-label="Поставить лайк в виде сердечка"
          />
          <div className="elements__like-message">Нравится</div>
          <div className="elements__like-counter">{likes}</div>
        </div>
      </article>
    </li>
  );
}

export default Card;
