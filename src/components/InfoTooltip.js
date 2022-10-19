import React from 'react';
import Popup from './Popup';

export default function InfoTooltip (props) {
    const { isOpen, onClose, iconPath, infoText } = props;
    
    return (
        <>
            <Popup name="info-tool-tip" isOpen={isOpen} onClose={onClose} children={
                <>
                    <form className="form info-tool-tip">
                        <img className="info-tool-tip__icon"
                            src={iconPath}
                            alt="test"></img>
                        <h3 className="info-tool-tip__message">{infoText}</h3>
                        <button className="popup__close-button" type="button" onClick={onClose}></button>
                    </form>
                    
                </>
            } />
        </>
    );
}