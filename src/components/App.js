import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
function App() {
    const [currentUser, setCurrentUser] = React.useState({})  
    const [selectedCard, setSelectedCard] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    React.useEffect(() => {
        api
          .getAny("users/me")
          .then((res) => {
            setCurrentUser(res);
          })
          .catch((err) =>
            console.log(`Ошибка при загрузке информации о пользователе: ${err}`)
          );
      }, []);
      function handleUpdateUser(userData){
        api.patch("users/me", userData)
        .then((newUser) => setCurrentUser(newUser))
      .catch((err) => `Ошибка при обновлении информации о пользователе: ${err}`)
      closeAllPopups();
      }
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
     function handleUpdateAvatar(userData){
      api.patchAvatar("users/me/avatar", userData).then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => `Ошибка при обновлении Аватара: ${err}`)
      closeAllPopups();
     }
    return (
    <CurrentUserContext.Provider value={currentUser}>
     <div className="page">
        <Header />
            <Main onEditProfile={handleEditProfileClick} onEditAvatar={handleEditAvatarClick} onAddPlace={handleAddPlaceClick}  onCardClick={handleCardClick}/>
            <Footer />
            <EditProfilePopup onClose={closeAllPopups} isOpen={isEditProfilePopupOpen} onUpdateUser={handleUpdateUser} />
    <PopupWithForm name="mesto" title="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
                <div className="form-container">
                    <input type='text' className='form__input form__input_mesto popup__form_mesto' name='title' placeholder="Название" required />
                    <span className='form__input-error' id='name-error'></span>
                    <input className="form__input form__input_link popup__form_mesto"  id="link-avatar" name="link" placeholder="ссылка" type="url" required />
                    <span className='form__input-error' id='link-avatar-error'></span>
                </div>
    </PopupWithForm>
      <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
    <PopupWithForm name="confirm" title="Вы уверены?" />
    <ImagePopup     card={selectedCard} onClose={closeAllPopups} />
        </div>
   </CurrentUserContext.Provider>
  );
}

export default App;
