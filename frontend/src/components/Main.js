import {useContext} from "react";
import Card from "./Card";
import Header from "./Header";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {NavLink} from "react-router-dom";

const Main = ({
                  onEditProfileClick,
                  onAddPlaceClick,
                  onEditAvatarClick,
                  onCardClick,
                  onDeleteClick,
                  cards,
                  onCardLike,
                  onCardDelete,
                  email,
                  onSignOut
              }) => {
    const currentUser = useContext(CurrentUserContext);

    return (
        <>
            <Header>
                <NavLink exact to="/" activeClassName="menu__link_active"
                         className="menu__link">{email}</NavLink>
                <NavLink onClick={onSignOut} to="/sign-in"
                         className="menu__link">Выйти</NavLink>
            </Header>
            <main>
                <section className="profile">
                    <div>
                        <div
                            className="profile__avatar-overlay"
                            onClick={onEditAvatarClick}
                        />
                        <img
                            src={currentUser.avatar}
                            alt="Аватар пользователя"
                            className="profile__avatar"
                        />
                    </div>
                    <div className="profile__info">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button
                            className="profile__edit-button"
                            aria-label="edit button"
                            type="button"
                            onClick={onEditProfileClick}
                        />
                        <p className="profile__job">{currentUser.about}</p>
                    </div>
                    <button
                        className="profile__add-button"
                        aria-label="Add button"
                        type="button"
                        onClick={onAddPlaceClick}
                    />
                </section>

                <section className="elements">
                    <ul className="elements__list">
                        {cards.map((card) => (
                            <Card
                                key={card._id}
                                card={card}
                                onCardClick={onCardClick}
                                onDeleteClick={onDeleteClick}
                                onCardLike={onCardLike}
                                onCardDelete={onCardDelete}
                            />
                        ))}
                    </ul>
                </section>
            </main>
        </>
    );
};

export default Main;