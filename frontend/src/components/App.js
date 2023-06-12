import { useState, useEffect, useCallback } from "react";

import { Route, Routes, useNavigate } from "react-router-dom";

import "../index.css";

import { api } from "../utils/Api";

import Main from "./Main";

import Header from "./Header";

import ImagePopup from "./ImagePopup";

import CurrentUserContext from "../contexts/CurrentUserContext";

import EditProfilePopup from "./EditProfilePopup";

import EditAvatarPopupfrom from "./EditAvatarPopup";

import AddPlacePopup from "./AddPlacePopup";

import Login from "./Login";

import Register from "./Register";

import InfoTooltipPopup from "./InfoTooltipPopup";

import ProtectedRoute from "./ProtectedRoute";

import auth from "../utils/Auth";

function App() {
  const navigate = useNavigate();

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});

  const [currentUser, setCurrentUser] = useState({ 
   _id: '',
   email: '',
   name: '',
   about: '',
   avatar: ''
});

  const [cards, setCard] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [infoMessage, setInfoMessage] = useState(null);

  const [email, setEmail] = useState("");

  useEffect(() => {
    Promise.all([api.getInitialCards(), api.getProfile()])

      .then(([cards, userData]) => {
        setCard(cards);

        setCurrentUser(userData);
      })

      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }, []);

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api

      .like(card._id, !isLiked)

      .then((newCard) => {
        setCard((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })

      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }

  function handleCardDelete(card) {
    const cardId = card._id;

    api

      .deleteCard(cardId)

      .then(() => {
        setCard((state) => state.filter((card) => card._id !== cardId));

        closeAllPopups();
      })

      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }

  function handleUpdateUser(userInfo) {
    api

      .editProfile(userInfo)

      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);

        closeAllPopups();
      })

      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }

  function handleUpdateAvatar(userInfo) {
    api

      .changeAvatar(userInfo)

      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);

        closeAllPopups();
      })

      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }

  function handleAddPlaceSubmit(data) {
    api

      .addCard(data)

      .then((newCard) => {
        setCard((state) => [newCard, ...state]);

        closeAllPopups();
      })

      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }

  const openEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const openEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const openAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);

    setIsEditProfilePopupOpen(false);

    setIsAddPlacePopupOpen(false);

    setSelectedCard({});

    setInfoMessage(null);
  };

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard.link;

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);

      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  function handleShowInfoMessage(message) {
    setInfoMessage(message);
  }

 const handleCheckToken = useCallback(() => {
    const token = localStorage.getItem("token");

    if (token) {
      auth

        .checkToken(token)

        .then((data) => {
          setEmail(data.email);

          setCurrentUser(data)

          setIsLoggedIn(true);

          navigate("/");
        })

        .catch(console.error);
    }
  }, [])

  useEffect(() => {
    handleCheckToken();
  }, [handleCheckToken]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  function handleRegistration(data) {
    return auth

      .register(data)

      .then((data) => {
        handleShowInfoMessage({
          text: "Вы успешно зарегистрировались!",

          isSuccess: true,
        });

        navigate("/signin");
      })

      .catch((err) => {
        handleShowInfoMessage({
          text: "Что-то пошло не так! Попробуйте еще раз.",

          isSuccess: false,
        });
      });
  }

  function handleAuthorization(data) {
    return auth

      .authorize(data)

      .then((data) => {
        setIsLoggedIn(true);

        localStorage.setItem("token", data.token);

        handleCheckToken();

        navigate("/");
      })

      .catch((err) => {
        const text = err.message || "Что-то пошло не так! Попробуйте еще раз.";

        handleShowInfoMessage({
          text: text,

          isSuccess: false,
        });
      });
  }

  function handleLogout() {
    localStorage.removeItem("token");

    setIsLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header loggedIn={isLoggedIn} email={email} onSignOut={handleLogout} />

        <Routes>
          <Route
            path="/signup"
            element={<Register onRegister={handleRegistration} />}
          ></Route>

          <Route
            path="/signin"
            element={<Login onLogin={handleAuthorization} />}
          ></Route>

          <Route
            path="/"
            element={
              <ProtectedRoute isLoggiedIn={isLoggedIn}>
                <Main
                  onEditAvatar={openEditAvatarClick}
                  onEditProfile={openEditProfileClick}
                  onAddPlace={openAddPlaceClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              </ProtectedRoute>
            }
          />
        </Routes>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopupfrom
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <InfoTooltipPopup info={infoMessage} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
