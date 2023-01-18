import { useNavigate, Link } from 'react-router-dom' // Импорт компонента
import { useSelector } from 'react-redux' // Импорт компонента
import { Search } from '../Search/Search' // Импорт компонента
import { getBasketSliceSelector } from '../../redux/slices/basketSlice' // Импорт компонента
import stylesHeader from './header.module.scss' // Импорт компонента стилей
import { REDUX_LS_KEY } from '../../redux/initState' // Импорт значения из компонента

function Header({
  user, setUser, dataProducts, setModalActive, setGoods,
  setUserDetails, api, token, searchData,
  setSearchData, searchText, setUpdateSearchText,
}) { // Компонент Header с {props}
  const navigate = useNavigate() // назначение Хук (useNavigate)
  const basketRedux = useSelector(getBasketSliceSelector) //  Хук из (Redux) с массивом корзины

  const UserDetails = (e) => { // функция запроса детальной информации о пользователе
    e.preventDefault() // Отмена действий по умолчанию
    api.getUserDetails() // Метод запроса на получение информации о пользователе
      .then((res) => res.json()) // ответ в json
      .then((data) => { // ответ в объекте
        if (!data.error && !data.err) { // Проверка на ошибку (если нет - то)
          setUserDetails(data)
          // Запись результата в Хук (userDetails)
          setModalActive((prev) => !prev) // Смена режима модального окна (откр/закр)
        } else {
          // eslint-disable-next-line no-alert
          alert(data.message) // Вывод информации об ошибке
        }
      })
  }

  const logIn = (e) => { // функция для Логина
    e.preventDefault() // Отмена действий по умолчанию
    setModalActive((prev) => !prev) // Смена режима модального окна (откр/закр)
  }

  const logOut = (e) => { // функция для Выхода
    e.preventDefault() // Отмена действий по умолчанию
    localStorage.removeItem('userSM8') // Удаления записи о пользователе из (localStorage)
    localStorage.removeItem('stock') // Удаления записи о количестве товара из (localStorage)
    localStorage.removeItem(REDUX_LS_KEY) // Удаления записи о корзине из (localStorage)
    setUser('') // Удаление записи о пользователе в Хук (useState)
    navigate('/') // Переход на корневую страницу
  }

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
        <Link to="/" className={stylesHeader.heart}>
          <i className="fa-solid fa-heart" /* иконка с сердцем *//>
          <span className={stylesHeader.basketQuantity}>0</span>
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
