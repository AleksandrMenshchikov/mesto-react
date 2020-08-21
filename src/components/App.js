import React from "react";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeleteCardPopup from "./ConfirmDeleteCardPopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/api";
import { Route, useHistory, useLocation } from "react-router-dom";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState();
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState();
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState();
  const [isImageCardPopupOpen, setIsImageCardPopupOpen] = React.useState();
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState();
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [card, setCard] = React.useState({});
  const [isLoading, setLoading] = React.useState();

  const history = useHistory();
  const location = useLocation();

  // if (location.pathname.length > 5) {
  //   setIsImageCardPopupOpen(true);
  // }

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards([...data]);
        const hasSomeСoincidence = data.find(
          (card) => card._id === location.pathname.slice(1)
        );
        if (hasSomeСoincidence) {
          setIsImageCardPopupOpen(true);
          setSelectedCard({ ...hasSomeСoincidence });
        }
      })
      .catch((err) => console.error(err));
  }, [location]);

  React.useEffect(() => {
    api
      .getUserData()
      .then((res) => {
        setCurrentUser({ ...res });
      })
      .catch((err) => console.error(err));
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((item) => item._id === currentUser._id);
    if (!isLiked) {
      api
        .putLike(card._id)
        .then((newCard) => {
          const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
          setCards(newCards);
        })
        .catch((err) => console.log(err));
    } else if (isLiked) {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
          setCards(newCards);
        })
        .catch((err) => console.log(err));
    }
  }

  function handleCardDelete(card) {
    setIsConfirmPopupOpen(true);
    setCard({ ...card });
  }

  function handleCardClick(card) {
    setIsImageCardPopupOpen(true);
    setSelectedCard({ ...card });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleUpdateUser({ name, about }) {
    setLoading(true);
    api
      .patchUserData(name, about)
      .then((res) => {
        setCurrentUser({ ...res });
        closeAllPopups();
        setTimeout(() => setLoading(false), 200);
      })
      .catch((err) => console.error(err));
  }

  function handleUpdateAvatar({ avatar }) {
    setLoading(true);
    api
      .patchAvatar(avatar)
      .then((res) => {
        setCurrentUser({ ...res });
        closeAllPopups();
        setTimeout(() => setLoading(false), 200);
      })
      .catch((err) => console.error(err));
  }

  function handleAddPlace({ name, link }) {
    setLoading(true);
    api
      .postCard(name, link)
      .then((newCard) => {
        setCards([...cards, newCard]);
        closeAllPopups();
        setTimeout(() => setLoading(false), 200);
      })
      .catch((err) => console.error(err));
  }

  function handleConfirmButtonClick() {
    setLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
        closeAllPopups();
        setTimeout(() => setLoading(false), 200);
      })
      .catch((err) => console.log(err));
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImageCardPopupOpen(false);
    setIsConfirmPopupOpen(false);
    setTimeout(() => setSelectedCard({}), 200);
    setTimeout(() => history.push("/"), 200);
  }

  React.useEffect(() => {
    const closePopupsByOverlay = (e) => {
      if (e.target.classList.contains("pop-up-opened")) {
        closeAllPopups();
        setTimeout(() => history.push("/"), 200);
      }
    };

    document.addEventListener("click", closePopupsByOverlay);
    return () => document.removeEventListener("click", closePopupsByOverlay);
  });

  React.useEffect(() => {
    const closePopupsByEsc = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
        setTimeout(() => history.push("/"), 200);
      }
    };
    document.addEventListener("keydown", closePopupsByEsc);
    return () => document.removeEventListener("keydown", closePopupsByEsc);
  });

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onClose={closeAllPopups}
          onCardClick={handleCardClick}
          selectedCard={selectedCard}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
          isLoading={isLoading}
        />
        <ConfirmDeleteCardPopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onButtonClick={handleConfirmButtonClick}
          isLoading={isLoading}
        />
        <Footer />
        <Route path={`/${selectedCard._id || location.pathname.slice(1)}`}>
          <ImagePopup
            isOpen={isImageCardPopupOpen}
            onClose={closeAllPopups}
            selectedCard={selectedCard}
          />
        </Route>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
