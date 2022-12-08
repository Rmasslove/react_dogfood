import stylesHeader from './header.module.scss' // Импорт компонента стилей

function Header() { // Компонент Header с {props}
  const user = localStorage.getItem('user') // Данные о (user) из (localStorage)

  const logIn = (e) => { // функция для Логина
    e.preventDefault() // Отмена действий по умолчанию
    // eslint-disable-next-line no-alert
    const name = prompt('Как вас зовут?') // вызов окна с запросом на ввод пользователя
    if (name) { // проверка на то что пользователь ввёл имя
      localStorage.setItem('user', name) // запись (localStorage) имени
    }
  }
  const logOut = (e) => { // функция для Выхода
    e.preventDefault() // Отмена действий по умолчанию
    localStorage.removeItem('user') // Удаления записи о пользователе из (localStorage)
  }

  return ( // jsx разметка
    <header className={stylesHeader.header}>
      <a className={stylesHeader.logo} href="http://localhost:3000/"/* Поле логотипа */>DogFood</a>
      <input type="search" placeholder="Поиск..." className={stylesHeader.search} /* поле поиска *//>
      <nav className={stylesHeader.nav}>
        {user && <a href="http://localhost:3000/">{user}</a>/* Поле отображающие имя пользователя */}
        {!user && <a href="http://localhost:3000/" onClick={logIn}>Войти</a>/* Поле кнопки войти */}
        {user && <a href="http://localhost:3000/" onClick={logOut}>Выйти</a>/* Поле кнопки выйти */}
      </nav>
    </header>
  )
}

export { // экспорт компонента
  Header,
}
