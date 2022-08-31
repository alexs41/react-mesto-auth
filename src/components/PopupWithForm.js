import React, {useEffect, useState} from 'react';

export default function PopupWithForm(props)  {
    const [opened, setOpened] = useState(false);

    const popup = document.querySelector('.popup_element-image');
    
    // function open() {
    //     popup.classList.add('popup_opened');
    //     // document.addEventListener('keydown', _handleEscClose);
    // }
    function close() {
        popup.classList.remove('popup_opened');
        // document.removeEventListener('keydown', _handleEscClose);
    }

    function _handleEscClose(e) {
        if (e.key === 'Escape') {
            props.onClose();
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", _handleEscClose);
        return () => {
          document.removeEventListener("keydown", _handleEscClose);
        };
      }, []);

    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`} onClick={
            (evt) => { 
                if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-button')) { 
                    props.onClose(); 
                };
              }
        }>
            <div class="popup__container">
                <form class="form" name={props.name}>
                    <h3 class="form__header">{props.title}</h3>
                    {props.children}
                    <button className="form__submit-button" type="submit">Сохранить</button>
                    <button className="popup__close-button" type="button" onClick={props.onClose}></button>
                </form>
            </div>
        </div>
    );
}
// export default class Popup {

//     constructor( popupSelector ) {
//         this._popup = document.querySelector(popupSelector);
//     }
//     open() {
//         this._popup.classList.add('popup_opened');
//         document.addEventListener('keydown', this._handleEscClose);
//     }
//     close() {
//         this._popup.classList.remove('popup_opened');
//         document.removeEventListener('keydown', this._handleEscClose);
//     }
//     _handleEscClose = (e) => {
//         if (e.key === 'Escape') {
//             this.close();
//         }
//     }
    // setEventListeners() {
    //     this._popup.addEventListener('mousedown', (evt) => { 
    //         if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-button')) { 
    //             this.close(); 
    //         }; 
    //       }); // обработчик на кнопки закрытия поп-ап и темной области поп-ап
    // }
// }
// export default class PopupWithForm extends Popup {
//     constructor(popupSelector, submitCallback) {
//         super(popupSelector);
//         this._submitCallback = submitCallback;
//         this._form = this._popup.querySelector('.form');
//         // достаём все элементы полей
//         this._inputList = this._form.querySelectorAll('.form__input');
//         this._submitButton = this._form.querySelector('.form__submit-button');
//     }
//     getInputValues() {
//         // создаём пустой объект
//         this._formValues = {};
//         // добавляем в этот объект значения всех полей
//         this._inputList.forEach(input => {
//           this._formValues[input.name] = input.value;
//         });
//         // возвращаем объект значений
//         return this._formValues;
//     }
//     setInputValues(data) {
//         this._inputList.forEach((input) => {
//         // тут вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
//         input.value = data[input.name];
//         });
//     }
//     setEventListeners() {
//         // добавляем обрабочик клика на крестик и темную область
//         super.setEventListeners();
//         // добавляем обработчик на сабмит формы
//         this._form.addEventListener('submit', this._submitCallback);
//     }
//     close() {
//         super.close();
//         this._form.reset();
//     }
//     handleSaving() {
//         this._submitButton.textContent = 'Сохранение...';
//     }
//     handleSavingComplete() {
//         this._submitButton.textContent = 'Сохранить';
//     }
//   }