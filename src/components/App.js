import {useState, useEffect} from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { LoadingContext } from '../contexts/LoadingContext.js';
import { LoginContext } from '../contexts/LoginContext.js';
import Header from './Header.js';
import Main from './Main.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/Api.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import DeleteCardPopup from './DeleteCardPopup.js';
import { Route, Switch, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.js';
import Login from './Login.js';
import Register from './Register.js';
import * as auth from '../utils/Auth.js';
import InfoTooltip  from './InfoTooltip.js';


function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarState] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfileState] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlaceState] = useState(false);
  const [selectedCard, setSelectedCard] = useState({data: {}, isOpen: false});
  const [deletedCard, setDeletedCard] = useState({data: {}, isOpen: false});

  const [registerStatus, setRegisterStatus] = useState({isOpen: false, status: false});

  const [currentUser, setCurrentUser] =useState({});
  const [cardsData, setCardsData] = useState([]);

  const [isLoggedIn, setLoginStatus] = useState(false);

  const history = useHistory();

  useEffect(() => {
      Promise.all([api.getInitialCards(), api.getUserData()])
        .then(([cardsData, userData]) => {
            setCurrentUser(userData);
            setCardsData(cardsData);
        })
        .catch(err => console.log(`Не удалось загрузить данные. Ошибка: ${err}`));      
  }, []);
  

  function onEditAvatar() {
      setIsEditAvatarState(true)
  }

  function onEditProfile() {
      setIsEditProfileState(true)
  }

  function onAddPlace() {
      setIsAddPlaceState(true)
  }

  function closeAllPopups() {
      setIsEditAvatarState(false);
      setIsEditProfileState(false);
      setIsAddPlaceState(false);
      setSelectedCard({data: {}, isOpen: false})
      setDeletedCard({data: {}, isOpen: false});
      setRegisterStatus({isOpen: false, status: false});
  }

  function handleCardClick(card) {
      setSelectedCard({data: card, isOpen: true});
    }

    function handleDeleteClick(card) {
      setDeletedCard({data: card, isOpen: true});
  }
    
  //Обработчик нажатия Escape
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard.isOpen || deletedCard.isOpen

  useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) { 
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])


 function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id) ? true : false;

    (isLiked ? api.removeLike(card._id) : api.addLike(card._id))
      .then(newCard => {
        setCardsData((cardsData) => cardsData.map(currentCard => currentCard._id === card._id ? newCard : currentCard));
      })
       .catch(err => console.log(`Не удалость загрузить данные. Ошибка: ${err}`));
  }


  function handleCardDelete(card) { 
    api.removeCard(card._id)
      .then(() => {
        setCardsData(cardsData => cardsData.filter((item) => item._id !== card._id));
      })
      .then(() => closeAllPopups())
      .catch(err => console.log(`Не удалость удалить карточку. Ошибка: ${err}`))
  }

  const [isLoading, setIsLoading] = useState(false);


  function handleUpdateUser(data) {
    setIsLoading(true);
    api.patchUserData(data)
      .then(newUserData => setCurrentUser(newUserData))
      .then(() => closeAllPopups())
      .catch(err => console.log(`Не удалость обновить данные пользователя. Ошибка: ${err}`))
      .finally(() => setIsLoading(false));
  }


  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api.patchAvatar(data)
      .then(newUserData => setCurrentUser(newUserData))
      .then(() => closeAllPopups())
      .catch(err => console.log(`Не удалость обновить аватар. Ошибка: ${err}`))
      .finally(() => setIsLoading(false));
  }


  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api.addNewCard(data)
      .then(newCard => setCardsData([newCard, ...cardsData]))
      .then(() => closeAllPopups())
      .catch(err => console.log(`Не удалость отправить карточку. Ошибка: ${err}`))
      .finally(() => setIsLoading(false));
  }


  function handleRegisterInfo(isSuccess) {
    if(isSuccess) {
      setRegisterStatus({
        isOpen: true,
        status: true
      })
    } else {
      setRegisterStatus({
        isOpen: true,
        status: false
      })
    }
  }

  function signOut(){
    localStorage.removeItem('token');
    setLoginStatus(false);
    history.push('/sign-in');
  }

  function handleRegister(password, email) {
    auth.register(password, email)
      .then(() => handleRegisterInfo(true))
      .catch(err => {
        handleRegisterInfo(false);
        console.log(`Не удалось зарегистрировать пользователя. ${err}`);
      });
  }

  function handleLogin(password, email) {
    auth.login(password, email)
      .then(() => {
        setLoginStatus(true);
        history.push('/');
      })
      .catch(err => {
        handleRegisterInfo(false);
        console.log(`Не удалось войти. ${err}`);
      });
  }



  return (
    <div className="root">
      <div className="page">
      <LoginContext.Provider value={isLoggedIn} >
        <CurrentUserContext.Provider value={currentUser} >
          <Header 
          signOut={signOut}
          />
          <Switch>
            <ProtectedRoute 
                path="/"
                component={Main}
                onEditProfile={onEditProfile} 
                cardsData={cardsData} 
                onAddPlace={onAddPlace} 
                onEditAvatar={onEditAvatar} 
                onCardClick={handleCardClick} 
                onCardLike={handleCardLike}
                onCardDelete={handleDeleteClick} 
                exact
              />
            <Route path='/sign-in'>
              <Login
                handleLogin={handleLogin} 
              />
            </Route>
            <Route path='/sign-up'>
              <Register 
                handleRegister={handleRegister} 
              />
            </Route>
          </Switch>

          <LoadingContext.Provider value={isLoading} >
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

            <DeleteCardPopup 
              isOpen={deletedCard.isOpen} 
              onClose={closeAllPopups} 
              card={deletedCard.data} 
              onDeleteCard={handleCardDelete} 
            />
          </LoadingContext.Provider>

          <ImagePopup 
            isOpen={selectedCard.isOpen} 
            onClose={closeAllPopups} 
            card={selectedCard.data} 
            isLoading={isLoading}
          />
          <InfoTooltip 
            isOpen={registerStatus.isOpen} 
            isSuccess={registerStatus.status} 
            onClose={closeAllPopups} 
          />
        </CurrentUserContext.Provider>
        </LoginContext.Provider>
      </div>
    
    </div>

  );
}

export default App;
