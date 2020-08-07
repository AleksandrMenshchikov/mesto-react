import React from "react";

function ImagePopup(props) {
  return (
    <div className={`pop-up-image ${props.isOpen ? "pop-up-opened" : ""}`}>
      <figure className="pop-up-image__container">
        <button
          type="button"
          className="pop-up-image__close-icon"
          aria-label="Закрыть форму"
          onClick={props.onClose}
        ></button>
        <img alt="Изображение" className="pop-up-image__img" src={props.link} />
        <figcaption className="pop-up-image__description">
          {props.description}
        </figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
