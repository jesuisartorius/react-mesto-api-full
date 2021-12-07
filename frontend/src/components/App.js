import {useEffect, useState} from "react";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import api from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {NavLink, Redirect, Route, Switch, useHistory} from "react-router-dom";
import * as auth from "../utils/auth"
import InfoTooltip from "./InfoTooltip";


function App() {
    // Context for current user
    const [currentUser, setCurrentUser] = useState({
        name: "",
        about: "",
        avatar: "",
    });

    const [cards, setCards] = useState([]);
    // Loader state


    // Popup States
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
    const [isPreviewImagePopupOpen, setIsPreviewImagePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState("");


    const history = useHistory();

    const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
    const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
    const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
    const handleDeleteClick = () => setIsConfirmDeletePopupOpen(true);

    const handleCardClick = (card) => {
        setSelectedCard(card);
        setIsPreviewImagePopupOpen(true);
    };

    const closeAllPopups = () => {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsConfirmDeletePopupOpen(false);
        setIsPreviewImagePopupOpen(false);
        setIsInfoTooltipOpen(false);
    };


    useEffect(() => {
        const closeByEscape = (e) => {
            if (e.key === "Escape") {
                closeAllPopups();
            }
        };
        document.addEventListener("keydown", closeByEscape);
        return () => {
            document.removeEventListener("keydown", closeByEscape);
        };
    }, []);

    useEffect(() => {

        api.getAppInfo().then(([userData, cards]) => {
            setCurrentUser(userData);
            setCards(cards);
        }).catch((err) => {
            console.log(err);
        })
    }, []);


    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => console.error(err));
    }

    const handleCardDelete = (card) => {
        api
            .deleteCard(card._id)
            .then(() => {
                setCards((state) => state.filter((c) => c._id !== card._id));
                closeAllPopups();
            })
            .catch((err) => console.error(err));
    };

    const handleUpdateUser = ({name, about}) => {
        api
            .setUserInfo({name, about})
            .then((userData) => {
                setCurrentUser({name, about, ...userData});
                closeAllPopups();
            })
            .catch((err) => console.error(err));
    };

    const handleUpdateAvatar = (avatar) => {
        api
            .setUserAvatar(avatar)
            .then((userData) => {
                setCurrentUser({avatar, ...userData});
                closeAllPopups();
            })
            .catch((err) => console.error(err));
    };

    const handleAddPlaceSubmit = ({name, link}) => {
        api
            .addCard({name, link})
            .then((card) => {
                setCards([card, ...cards]);
                closeAllPopups();
            })
            .catch((err) => console.error(err));
    };

    const onRegister = ({email, password}) => {
        auth.register(email, password)
            .then((res) => {
                setIsLoggedIn(true);
                history.push("/signin");
            })
            .catch(() => {
                setIsLoggedIn(false);
            })
            .finally(() => {
                setIsInfoTooltipOpen(true);
            })
    }

    const onLogin = ({email, password}) => {
        auth.login(email, password)
            .then((res) => {
                setIsLoggedIn(true);
                setEmail(email);
                history.push("/");
            })
            .catch(() => {
                setIsInfoTooltipOpen(true);
                setIsLoggedIn(false);
            })
    }

    function onSignOut() {
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
        history.push('/signin');
    }

    // Checking User Token
    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (token) {
            auth.checkToken(token)
                .then((res) => {
                    setEmail(res.data.email);
                    setIsLoggedIn(true);
                    history.push('/');
                }).catch((err) => console.error(err))
        }
    }, [history]);

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Switch>
                <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                    exact path="/"
                    component={Main}
                    onEditProfileClick={handleEditProfileClick}
                    onAddPlaceClick={handleAddPlaceClick}
                    onEditAvatarClick={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    onDeleteClick={handleDeleteClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    email={email}
                    onSignOut={onSignOut}
                />
                <Route path="/sign-up">
                    <Header>
                        <NavLink to="/sign-in"
                                 className="menu__link">
                            Войти
                        </NavLink>
                    </Header>
                    <Register onRegister={onRegister}/>
                </Route>

                <Route path="/sign-in">
                    <Header>
                        <NavLink to="/sign-up"
                                 className="menu__link">
                            Регистрация
                        </NavLink>
                    </Header>
                    <Login onLogin={onLogin}/>
                </Route>

                <Route path="*">
                    {isLoggedIn ? <Redirect to="/"/> :
                        <Redirect to="/sign-in"/>}
                </Route>
            </Switch>

            <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
            />

            <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
            />

            <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit}
            />

            <PopupWithForm
                name="confirm"
                isOpen={isConfirmDeletePopupOpen}
                onClose={closeAllPopups}
                title="Вы Уверены?"
                buttonText="Да"
            />

            <ImagePopup
                card={selectedCard}
                onClose={closeAllPopups}
                isOpen={isPreviewImagePopupOpen}
                name="preview"
            />

            <Footer/>

            <InfoTooltip
                isOpen={isInfoTooltipOpen}
                onClose={closeAllPopups}
                isLoggedIn={isLoggedIn}
            />


        </CurrentUserContext.Provider>
    );
}

export default App;