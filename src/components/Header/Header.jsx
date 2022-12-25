import { useNavigate, Link } from 'react-router-dom' // Импорт компонента
import { Search } from '../Search/Search' // Импорт компонента
import stylesHeader from './header.module.scss' // Импорт компонента стилей

function Header({
  user, setUser, dataProducts, setModalActive, setGoods, setUserDetails, api, token,
}) { // Компонент Header с {props}
  const navigate = useNavigate()
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
      />
      )}
      <nav className={stylesHeader.nav}>
        {(user && token) && <a className={stylesHeader.user} href="_" onClick={UserDetails}>{user}</a>/* Поле отображающие имя пользователя */}
        {(!user || !token) && <a className={stylesHeader.btn} href="_" onClick={logIn}>Войти</a>/* Поле кнопки войти */}
        {(user && token) && <a className={stylesHeader.btn} href="_" onClick={logOut}>Выйти</a>/* Поле кнопки выйти */}
      </nav>
    </header>
  )
}

export { // экспорт компонента
  Header,
}
