import {useContext} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

const Card = ({
                  card,
                  onCardClick,
                  onDeleteClick,
                  onCardLike,
                  onCardDelete,
              }) => {
    const currentUser = useContext(CurrentUserContext);

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner === currentUser._id;
    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i === currentUser._id);

    const handleDeleteSubmit = (e) => {
        e.preventDefault();
        onCardDelete(card);
    }

    return (
        <li className="element">
            <button
                className={`element__delete-button ${
                    isOwn
                        ? "element__delete-button"
                        : "element__delete-button_type_hidden"
                }`}
                aria-label="Delete button"
                type="button"
                onClick={handleDeleteSubmit}
            />
            <div
                className="element__image"
                style={{backgroundImage: `url(${card.link})`}}
                onClick={() => onCardClick(card)}
            />
            <div className="element__flex">
                <h2 className="element__text">{card.name}</h2>
                <div className="element__like-wrapper">
                    <button
                        type="button"
                        className={`element__like-button ${
                            isLiked
                                ? "element__like-button_active"
                                : "element__like-button"
                        }`}
                        onClick={() => onCardLike(card)}
                    />
                    <p className="element__like-count">{card.likes.length}</p>
                </div>
            </div>
        </li>
    );
};

export default Card;