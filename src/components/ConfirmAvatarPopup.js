import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmAvatarPopup({ isOpen, onClose }) {
  return (
    <PopupWithForm
      name="pop-up_confirm"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
    >
      <button
        type="button"
        className="form__input-button form__input-button_comfirm"
      >
        Да
      </button>
    </PopupWithForm>
  );
}

export default ConfirmAvatarPopup;
