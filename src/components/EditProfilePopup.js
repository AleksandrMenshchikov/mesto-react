import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setTimeout(() => {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }, 200);
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name="pop-up_profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
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
          onChange={handleNameChange}
          value={name}
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
          onChange={handleDescriptionChange}
          value={description}
        />
        <span id="input-profession-error" className="form__input-error">
          Ошибка
        </span>
      </div>
      <button type="submit" className="form__input-button">
        {isLoading ? "Загрузка..." : "Сохранить"}
      </button>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
