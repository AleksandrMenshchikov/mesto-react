import React from "react";

function PopupWithForm(props) {
  return (
    <div className={`pop-up ${props.name} ${props.isOpen ? 'pop-up-opened' : ''}`}>
      <form
        noValidate
        action="#"
        className="form"
        method="POST"
        name={`${props.name}`}
      >
        <button
          type="button"
          className="pop-up__close-icon"
          aria-label="Закрыть форму"
          onClick={props.onClose}
        ></button>
        <h3 className="form__title">{props.title}</h3>
        {props.children}
      </form>
    </div>
  );
}

export default PopupWithForm;
