import { Search } from '../Search/search' // Импорт компонента
import stylesHeader from './header.module.scss' // Импорт компонента стилей

function Header({
  user, setUser, dataProducts, setModalActive, setGoods,
}) { // Компонент Header с {props}
  const UserDetails = (e) => {
    e.preventDefault() // Отмена действий по умолчанию
    setModalActive((prev) => !prev)
  }

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
      <Search /* Компонент (Search) и передача пропсов */
        setGoods={setGoods}
        dataProducts={dataProducts}
      />
      <nav className={stylesHeader.nav}>
        {user && <a className={stylesHeader.user} href="_" onClick={UserDetails}>{user}</a>/* Поле отображающие имя пользователя */}
        {!user && <a className={stylesHeader.btn} href="_" onClick={logIn}>Войти</a>/* Поле кнопки войти */}
        {user && <a className={stylesHeader.btn} href="_" onClick={logOut}>Выйти</a>/* Поле кнопки выйти */}
      </nav>
    </header>
  )
}

export { // экспорт компонента
  Header,
}
