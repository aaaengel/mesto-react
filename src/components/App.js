import '../index.css';
import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from "./ImagePopup";
function App() {
    const [selectedCard, setSelectedCard] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    function handleEditAvatarClick(){
        setIsEditAvatarPopupOpen(true)
     }
     function handleEditProfileClick(){
        setIsEditProfilePopupOpen(true) 
     }
     function handleAddPlaceClick(){
        setIsAddPlacePopupOpen(true)
     }
     function closeAllPopups(){
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard(false);
     }
     function handleCardClick(){
        setSelectedCard(true);
     }
    return (
    <>
     <div className="page">
        <Header />
            <Main onEditProfile={handleEditProfileClick} onEditAvatar={handleEditAvatarClick} onAddPlace={handleAddPlaceClick}  onCardClick={handleCardClick}/>
            <Footer />
            <PopupWithForm name="edit" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
                    <div className="form__container">
                        <input type='text' className='form__input form__input_name popup__form_edit' name='name' maxLength="40" minLength="2" required /> 
                        <span className='form__input-error' id='name-error'></span>
                        <input className="form__input form__input_hobby popup__form_edit" type="text" id = "hobby" name="hobby" maxLength="200" minLength="2" required />
                        <span className='form__input-error' id='hobby-error'></span>
                    </div>
     </PopupWithForm>
    <PopupWithForm name="mesto" title="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
                <div className="form-container">
                    <input type='text' className='form__input form__input_mesto popup__form_mesto' name='title' placeholder="Название" required />
                    <span className='form__input-error' id='name-error'></span>
                    <input className="form__input form__input_link popup__form_mesto"  id="link-avatar" name="link" placeholder="ссылка" type="url" required />
                    <span className='form__input-error' id='link-avatar-error'></span>
                </div>
    </PopupWithForm>
    <PopupWithForm name="avatar" title="Новый аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
                <div className="form-container">
                    <input className="form__input form__input_link popup__form_avatar"  id="link" name="link_avatar" placeholder="ссылка" type="url" required />
                    <span className='form__input-error' id='link-error'></span>
                </div>
    </PopupWithForm>
    <PopupWithForm name="confirm" title="Вы уверены?" />
    <ImagePopup     card={selectedCard} onClose={closeAllPopups} />
        </div>
   </>
  );
}

export default App;
