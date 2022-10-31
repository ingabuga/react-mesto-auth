import React from 'react';
import { useHistory } from 'react-router-dom';

function InfoTooltip({ isOpen, isSuccess, onClose }) {
    const history = useHistory();

    function handleClose() {
        if(isSuccess) {
            onClose();
            history.push('/sign-in');
        } else {
            onClose();
        }
    }

    return(
        <section className={`popup ${isOpen && "popup_opened"}`}>
            <div className="popup__tooltip popup__tooltip_type_result" >
                <div className={`popup__result
                ${isSuccess ? "popup__result_type_correct" : "popup__result_type_incorrect"}`} 
                />
                <p className="popup__result-caption">
                    {isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."
                    }
                </p>
                <button 
                    type="reset" 
                    className="popup__close-btn" 
                    onClick={handleClose}
                />
            </div>
        </section>
    )
}

export default InfoTooltip;