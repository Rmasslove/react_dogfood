import { useNavigate, Link } from 'react-router-dom' // Импорт компонента
import { useDispatch, useSelector } from 'react-redux' // Импорт компонента
import { Search } from '../Search/Search' // Импорт компонента
import { getBasketSliceSelector, newArrBasketRedux } from '../../redux/slices/basketSlice' // Импорт компонента
import stylesHeader from './header.module.scss' // Импорт компонента стилей
import { REDUX_LS_KEY1, REDUX_LS_KEY2, REDUX_LS_KEY3 } from '../../redux/initState' // Импорт значения из компонента

function Header({
  user, setUser, dataProducts, setModalActive, setGoods,
  token, searchData,
  setSearchData, searchText, setUpdateSearchText, userDetails, likeProducts,
}) { // Компонент Header с {props}
  const navigate = useNavigate() // назначение Хук (useNavigate)
  const basketRedux = useSelector(getBasketSliceSelector) //  Хук из (Redux) с массивом корзины
  const dispatch = useDispatch() // Хук из (Redux)

  const UserDetails = (e) => { // функция открытия модал окна с детальной информации о пользователе
    e.preventDefault() // Отмена действий по умолчанию
    setModalActive((prev) => !prev) // Смена режима модального окна (откр/закр)
  }

  const logIn = (e) => { // функция для Логина
    e.preventDefault() // Отмена действий по умолчанию
    setModalActive((prev) => !prev) // Смена режима модального окна (откр/закр)
  }

  const logOut = (e) => { // функция для Выхода
    e.preventDefault() // Отмена действий по умолчанию
    localStorage.removeItem('userSM8') // Удаления записи о пользователе из (localStorage)
    localStorage.removeItem('stock') // Удаления записи о количестве товара из (localStorage)
    dispatch(newArrBasketRedux([])) // Делаем запись в корзину в (redux)
    localStorage.removeItem(REDUX_LS_KEY1) // Удаления записи о корзине из (localStorage)
    localStorage.removeItem(REDUX_LS_KEY2) // Удаления записи о корзине из (localStorage)
    localStorage.removeItem(REDUX_LS_KEY3) // Удаления записи о корзине из (localStorage)
    setUser('') // Удаление записи о пользователе в Хук (useState)
    navigate('/') // Переход на корневую страницу
  }

  const isLikeArr = likeProducts.filter(
    // eslint-disable-next-line no-underscore-dangle
    (el) => el.likes.includes(userDetails._id),
  ) // Выбор товаров с лайками запись в массив

  return ( // jsx разметка
    <header className={stylesHeader.header}>
      <Link to="/" className={stylesHeader.logo}>DogFood</Link>
      {user && (
      <Search /* Компонент (Search) и передача пропсов */
        setGoods={setGoods}
        dataProducts={dataProducts}
        searchData={searchData}
        setSearchData={setSearchData}
        searchText={searchText}
        setUpdateSearchText={setUpdateSearchText}
      />
      )}
      <nav className={stylesHeader.nav}>
        {(user && token) && (
        <Link to="/likes" className={stylesHeader.heart}>
          <i className="fa-solid fa-heart" /* иконка с сердцем *//>
          <span className={stylesHeader.basketQuantity}>{isLikeArr.length}</span>
        </Link>
        )/* Поле отображающие корзины заказа */}
        {(user && token) && (
        <Link to="/basket" className={stylesHeader.basket}>
          <i className="fa-solid fa-basket-shopping" />
          <span className={stylesHeader.basketQuantity}>
            {basketRedux.length}
          </span>
        </Link>
        )/* Поле отображающие корзины заказа */}
        {(user && token) && (
        <a className={stylesHeader.user} href="_" onClick={UserDetails}>
          <i className="fa-solid fa-user" />
          {' '}
        </a>
        )/* Поле отображающие имя пользователя */}
        {(!user || !token) && (
        <a className={stylesHeader.btn} href="_" onClick={logIn}>
          <i className="fa-solid fa-right-to-bracket" />
          {' '}
        </a>
        )/* Поле кнопки войти */}
        {(user && token) && (
        <a className={stylesHeader.btn} href="_" onClick={logOut}>
          <i className="fa-solid fa-right-from-bracket" />
          {' '}
        </a>
        )/* Поле кнопки выйти */}
      </nav>
    </header>
  )
}

export { // экспорт компонента
  Header,
}
