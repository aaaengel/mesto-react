import React from 'react';
import delBtn from "../images/Group.svg";
import likeIcon from "../images/Vector.svg";
export function Card({card, onCardClick}) {
    function handleClick() {
        onCardClick(card);
      }  
return (
		
	        <div class="card">
                <img class="card__image" src={card.src} alt={card.name} onClick={handleClick} />
                <div class="card__description">
                    <h3 class="card__text">{card.name}</h3>
                    <div class="card__like-button_and_caption">
                        <button class="card__like-button" type="button">
                            <img class="card__like-image" src={likeIcon} alt="сердечко" />
                        </button>
                        <p class="card__like-caption">{card.likes.length}</p>
                    </div>
                    <button class="card__delete-button">
                        <img src={delBtn} />
                    </button>
                </div>
            </div>
		
	);
}

export default Card;