import avatar from "../images/image.jpg";
import avIcon from "../images/avatar_icon.svg";
import editButton from "../images/EditButton.svg";
import plus from "../images/Vector2.svg";
import React from "react";
import api from "../utils/api"
import Card from "./Card.js"
function Main(props){
    const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, addCards] = React.useState([]);
  React.useEffect(()=>{
    Promise.all([api.getAny("users/me"), api.getAny("cards")])
    .then((res) => {
        setUserName(res[0].name);
        setUserDescription(res[0].about);
        setUserAvatar(res[0].avatar);
        addCards(res[1].map(item => ({
          id: item._id,
          likes: item.likes,
          name: item.name,
          src: item.link
        })));
      }).catch(err => console.log(err))
  }, [])
    return(
            <main>
                <section className="profile">
                    <div className="profile__content">
                        <img className="profile__avatar" src={avatar} style={{ backgroundImage: `url(${userAvatar})` } }  alt="аватар" onClick={props.onEditAvatar} />
                        <img className="profile__avatar__edit-icon" src = {avIcon} alt={'edit avatar'} />
                        <div className="profile__text">
                            <div className="profile__name-and-edit-button">
                                <h1 className="profile__name">{userName}</h1>
                                <button type="button" className="profile__edit-button" onClick={props.onEditProfile}>
                                    <img src={editButton} alt="кнопка редактирования" className="profile__edit-button__image" />
                                </button>
                            </div>
                            <p className="profile__hobby">{userDescription}</p>
                        </div>
                    </div>
                    <button type="button" className="profile__add-button" onClick={props.onAddPlace}>
                        <img src={plus} alt="плюсик" className="profile__add-button__image" />
                    </button>
                </section>
                <section className="cards">
                    {cards.map(item => (
                        <Card key={item._id} card={item} onCardClick={props.onCardClick} />
                    )
                    )}
                </section>
            </main>
);
}
export default Main;