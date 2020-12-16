import React from 'react';
import delBtn from "../images/Group.svg";
import likeIcon from "../images/Vector.svg";
import CurrentUserContext from "../contexts/CurrentUserContext"
export function Card({card, onCardClick, onCardLike}) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `card__delete-button ${isOwn ? 'card__delete-button' : 'card__delete-button_type_isHidden'}`
      ); 
    const isLiked = card.likes.some(i => i._id = currentUser._id);
    const cardLikeButtonClassName = `card__like-image ${
        isLiked ? "card__like-image" : "card__like-icon_active"
      }`;
    function handleClick() {
        onCardClick(card);
      }  
    function handleLikeClick() {
        onCardLike(card)
      }
    return (
		
	        <div className="card">
                <img className="card__image" src={card.src} alt={card.name} onClick={handleClick} />
                <div className="card__description">
                    <h3 className="card__text">{card.name}</h3>
                    <div className="card__like-button_and_caption">
                        <button className="card__like-button" type="button">
                            <img className={cardLikeButtonClassName} src={likeIcon} onClick={handleLikeClick} alt="сердечко" />
                        </button>
                        <p className="card__like-caption">{card.likes.length}</p>
                    </div>
                    <button className="card__delete-button">
                        <img src={delBtn} alt="delete" className={cardDeleteButtonClassName} />
                    </button>
                </div>
            </div>
		
	);
}

export default Card;