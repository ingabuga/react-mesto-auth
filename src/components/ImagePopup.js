import React from 'react';

function ImagePopup({ isOpen, onClose, card }) {
    return(
        <section 
            className={`popup popup_photo popup_shadow ${isOpen && "popup_opened"}`}>
            <div className="popup__preview">
                <div className="popup__image">
                    <img className="popup__image" 
                        src={isOpen ? card.link : ''} 
                        alt={card.name} 
                    />
                    <p className="popup__description">
                        {card.name}
                    </p>
                </div>
                <button 
                    className="popup__close-btn"
                    type="button" 
                    onClick={onClose} />
            </div>
        </section>
    )
}

export default ImagePopup;