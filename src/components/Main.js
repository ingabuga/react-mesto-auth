import { useContext } from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import Footer from './Footer.js';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cardsData, onCardLike, onCardDelete }) {
    const currentUser = useContext(CurrentUserContext);

    return(
        <>
        <main>
            <section className="profile">
                <div className="profile__info">
                    <div className="profile__avatar-frame">
                        <div className="profile__avatar-hover" onClick={onEditAvatar}></div>
                        <img className="profile__avatar" 
                        src={currentUser.data.avatar} 
                        name="avatar" 
                        alt={currentUser.data.name} />
                     </div>  
                    <div className="profile__text">
                        <h1 className="profile__title">
                            {/* Жак Ив Кусто */}
                            {currentUser.data.name}
                            </h1>
                        <button aria-label="Редактирование профиля" className="profile__edit-button" type="button" onClick={onEditProfile}></button>
                        <p className="profile__title-job">
                            {/* Исследователь океана */}
                            {currentUser.data.about}
                            </p>
                    </div>  
                </div>
                <button aria-label="Добавление карточки" className="profile__add-button" type="button" onClick={onAddPlace}></button>
            </section>
            <section className="elements">
                <ul className="elements__element">
                    {cardsData.map(currentCard => {
                        return (
                            <Card card={currentCard} key={currentCard._id} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} 
                            />
                        )
                    })}
                </ul>
            </section>
        </main>
        <Footer />
        </>
    )
}

export default Main;