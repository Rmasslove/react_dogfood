import { Search } from '../Search/search' // Импорт компонента
import stylesHeader from './header.module.scss' // Импорт компонента стилей

function Header({
  user, setUser, dataProducts, setModalActive,
}) { // Компонент Header с {props}
  const logIn = (e) => { // функция для Логина
    e.preventDefault() // Отмена действий по умолчанию
    // eslint-disable-next-line no-alert
    // const name = prompt('Как вас зовут?') // вызов окна с запросом на ввод пользователя
    // if (name) { // проверка на то что пользователь ввёл имя
    // localStorage.setItem('userSM8', name) // запись (localStorage) имени
    // setUser(name) // Запись о пользователе в Хук (useState)
    setModalActive((prev) => !prev)
    // }
  }
  const logOut = (e) => { // функция для Выхода
    e.preventDefault() // Отмена действий по умолчанию
    localStorage.removeItem('userSM8') // Удаления записи о пользователе из (localStorage)
    setUser('') // Удаление записи о пользователе в Хук (useState)
  }

  return ( // jsx разметка
    <header className={stylesHeader.header}>
      <a className={stylesHeader.logo} href="_"/* Поле логотипа */>DogFood</a>
      <Search dataProducts={dataProducts}/* Компонент (Search) и передача пропсов */ />
      <nav className={stylesHeader.nav}>
        {user && <a href="_">{user}</a>/* Поле отображающие имя пользователя */}
        {!user && <a href="_" onClick={logIn}>Войти</a>/* Поле кнопки войти */}
        {user && <a href="_" onClick={logOut}>Выйти</a>/* Поле кнопки выйти */}
      </nav>
    </header>
  )
}

export { // экспорт компонента
  Header,
}
