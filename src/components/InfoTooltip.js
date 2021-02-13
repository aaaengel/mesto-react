import React from "react";
import union from "../images/Union.svg"
import unionErr from "../images/UnionError.svg"
import closeBtn from "../images/CloseIcon.svg";
export default function InfoToolTip({isRegistred, onClose, isOpen}){
if(isRegistred){
    return(
    <div className={`popup  ${isOpen ? "popup_opened" : ""}`}>
        <div className="popup__window">
            <img src={union} alt="success" className="tooltip__logo" />
            <p className="tooltip__text">Вы успешно зарегистрировались!</p>
            <img className="popup__close-button" src={closeBtn} alt="кнопка выхода" onClick={onClose} />
        </div>
    </div>
    )
}else if(!isRegistred){
    return(
        <div>
            <div className="popup__window">
            <img src={unionErr} alt="success" className="tooltip__logo" />
            <p className="tooltip__text">Что-то пошло не так! Попробуйте еще раз</p>
            <img className="popup__close-button" src={closeBtn} alt="кнопка выхода" onClick={onClose} />
        </div>
        </div>
        )
}
}

