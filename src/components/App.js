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
import AddPlacePopup from "./AddPlacePopup";
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

     const [cards, addCards] = React.useState([]);
  React.useEffect(()=>{
    api.getAny("cards")
    .then((res) => {
        addCards(res.map(item => ({
          _id: item._id,
          likes: item.likes,
          name: item.name,
          src: item.link,
          owner: item.owner
        }
        )));
      }).catch(err => console.log(err))
  },[])
function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked).then((item) => {
        const newCard = {
            _id: item._id,
            likes: item.likes,
            name: item.name,
            src: item.link,
            owner: item.owner
        }
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        addCards(newCards);
    });
} 
function handleCardDelete(card){
    api.delete(`cards/${card._id}`)
    .then(() => {
        const newCards = cards.filter(item => item._id !== card._id);
        addCards(newCards)
    }).catch(err => console.log(err))
}

function handleAddPlaceSubmit(userData){
        api.post("cards", userData)
        .then(newCard =>addCards([newCard, ...cards]))
        .catch(err => console.log(err))
        closeAllPopups();
}
    return (
    <CurrentUserContext.Provider value={currentUser}>
     <div className="page">
        <Header />
            <Main cards={cards} handleCardLike={handleCardLike} handleCardDelete={handleCardDelete} onEditProfile={handleEditProfileClick} onEditAvatar={handleEditAvatarClick} onAddPlace={handleAddPlaceClick}  onCardClick={handleCardClick}/>
            <Footer />
            <EditProfilePopup onClose={closeAllPopups} isOpen={isEditProfilePopupOpen} onUpdateUser={handleUpdateUser} />
            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
      <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
    <PopupWithForm name="confirm" title="Вы уверены?" />
    <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
   </CurrentUserContext.Provider>
  );
}

export default App;
