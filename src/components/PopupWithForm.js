import React from 'react';
import Popup from './Popup';

export default function PopupWithForm(props)  {
    const { title, name, isOpen, onClose, children, onSubmit } = props;

    return (
        <Popup name={name} isOpen={isOpen} onClose={onClose} children={
            <form className="form" name={name} onSubmit={onSubmit}>
                    <h3 className="form__header">{title}</h3>
                    {children}
                    <button className="popup__close-button" type="button" onClick={onClose}></button>
                </form>
        } />
    );
}