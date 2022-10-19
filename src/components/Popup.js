import React, {useEffect} from 'react';

export default function Popup(props)  {
    const { name, isOpen, onClose, children } = props;
    
    function handleEscClose(e) {
        if (e.key === 'Escape') {
            onClose();
        }
    }

    function handleBlackAreaClosePopup(e) {
        if (e.target === e.currentTarget) { 
            onClose(); 
        };
    }

    useEffect(() => {
        if (isOpen === true) {
            document.addEventListener("keydown", handleEscClose);
            return () => document.removeEventListener("keydown", handleEscClose);
        };
    }, [isOpen, handleEscClose]);

    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} onClick={handleBlackAreaClosePopup}>
            <div className="popup__container">
                    {children}
            </div>
        </div>
    );
}