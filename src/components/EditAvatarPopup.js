import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const inputLinkAvatar = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: inputLinkAvatar.current.value,
    });
  }

  React.useEffect(() => {
    setTimeout(() => {
      inputLinkAvatar.current.value = "";
    }, 200);
  }, [onClose]);

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name="pop-up_avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="form__input-container">
        <input
          ref={inputLinkAvatar}
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
      <button type="submit" className="form__input-button">
        Сохранить
      </button>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
