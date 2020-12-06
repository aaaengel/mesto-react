import closeBtn from "../images/CloseIcon.svg";
import "../index.css"
import React from 'react';
class popupWithForm extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
    return(
<div className={`popup popup_${this.props.name} ${this.props.isOpen ? "popup_opened" : ""}`}>
            <div className={`popup__overlay popup__overlay-${this.props.name}`}>
            <form className={`popup__window popup__window-${this.props.name}`}>
                <fieldset className="form__set">
                    <h2 className="popup__text">{this.props.title}</h2>
                    {this.props.children}
                    <button type="submit" className={`popup__save-button popup__save-button__${this.props}`}>Сохранить</button>
                    <img className="popup__close-button" src={closeBtn} alt="кнопка выхода" onClick={this.props.onClose} />
                </fieldset>
            </form>
            </div>
        </div>
    );}
}
export default popupWithForm;