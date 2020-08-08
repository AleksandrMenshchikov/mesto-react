import React from "react";

function ImagePopup({ isOpen, onClose, link, description }) {
  return (
    <div className={`pop-up-image ${isOpen ? "pop-up-opened" : ""}`}>
      <figure className="pop-up-image__container">
        <button
          type="button"
          className="pop-up-image__close-icon"
          aria-label="Закрыть форму"
          onClick={onClose}
        />
        <img alt="Изображение" className="pop-up-image__img" src={link} />
        <figcaption className="pop-up-image__description">
          {description}
        </figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
