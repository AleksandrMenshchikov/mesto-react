import React from "react";

function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <li className="elements__item">
      <button
        type="button"
        className="elements__remove"
        aria-label="Удалить карточку"
      ></button>
      <div
        className="elements__image"
        role="img"
        style={{ backgroundImage: `url(${props.link})` }}
        onClick={handleClick}
      ></div>
      <article className="elements__item-bottom">
        <h4 className="elements__item-title">{props.name}</h4>
        <div className="elements__like-container">
          <button
            type="button"
            className="elements__like"
            aria-label="Поставить лайк в виде сердечка"
          ></button>
          <div className="elements__like-message">Нравится</div>
          <div className="elements__like-counter">{props.likes}</div>
        </div>
      </article>
    </li>
  );
}

export default Card;
