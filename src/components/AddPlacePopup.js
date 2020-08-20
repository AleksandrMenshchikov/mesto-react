import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");
  const formElement = React.useRef();

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleAddPlaceSubmit(e) {
    e.preventDefault();
    onAddPlace({ name, link });
  }

  React.useEffect(() => {
    setTimeout(() => {
      setName("");
      setLink("");
    }, 200);
  }, [isOpen]);

  return (
    <PopupWithForm
      ref={formElement}
      onSubmit={handleAddPlaceSubmit}
      name="pop-up_card"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
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
          onChange={handleNameChange}
          value={name}
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
          onChange={handleLinkChange}
          value={link}
        />
        <span id="input-link-card-error" className="form__input-error">
          Ошибка
        </span>
      </div>
      <button type="submit" className="form__input-button">
        {isLoading ? "Загрузка..." : "Создать"}
      </button>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
