import { useState } from 'react' // Импорт компонента
import stylesModule from './modal.module.scss' // Импорт стилей
import { ReactComponent as Xmark } from '../Search/img/circle-xmark-regular.svg' // Импорт файла (svg) преобразованного в компонент
import { Signup } from './Signup' // Импорт компонента
import { Login } from './Login' // Импорт компонента
import { UserDetails } from './UserDetails' // Импорт компонента

export function Modal({
  modalActive, setModalActive, api, setToken, user, userDetails,
}) { // Компонент (Modal) с {props}
  const [auth, setAuth] = useState(true) // Хук для форм регистрайии (Signup) и авторизации (Login)
  const style = { // Стиль для скрытия и отображения модального окна
    display: modalActive ? 'flex' : 'none',
  }
  const closeModal = () => { // функция для закрытия модального окна по кнопке
    setModalActive(false) // Метод передающий значения (false) в Хук
  }

  const changeModal = () => {
    // Выбор компонента для отображения Модал-окна (UserDetails), (Signup) и авторизации (Login)
    if (user) { // Если юзер уже залогинен то модал с (UserDetails)
      return <UserDetails userDetails={userDetails} />
    }
    if (auth) { // Иначе если модал (Login) или (Signup)
      // eslint-disable-next-line max-len
      return <Login setAuth={setAuth} api={api} setModalActive={setModalActive} setToken={setToken} />
    }
    // eslint-disable-next-line max-len
    return <Signup setAuth={setAuth} api={api} setModalActive={setModalActive} setToken={setToken} />
  }

  return ( // jsx разметка
    <div className={stylesModule.modalContainer} style={style}>
      <div className={stylesModule.modal}>
        <Xmark type="button" className={stylesModule.modalClose} onClick={closeModal} /* Установка иконки через компонент (Xmark) *//>
        {changeModal()/* Запуск функции выбора компонента */}
      </div>
    </div>
  )
}
