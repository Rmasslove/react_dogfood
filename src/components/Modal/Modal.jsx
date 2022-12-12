import { useState } from 'react' // Импорт компонента
import stylesModule from './modal.module.scss' // Импорт стилей
import { ReactComponent as Xmark } from '../Search/img/circle-xmark-regular.svg' // Импорт файла (svg) преобразованного в компонент
import { Signup } from './Signup' // Импорт компонента
import { Login } from './Login' // Импорт компонента

export function Modal({
  modalActive, setModalActive, api, setToken,
}) { // Компонент (Modal) с {props}
  const [auth, setAuth] = useState(true) // Хук для форм регистрайии (Signup) и авторизации (Login)
  const style = { // Стиль для скрытия и отображения модального окна
    display: modalActive ? 'flex' : 'none',
  }
  const closeModal = () => { // функция для закрытия модального окна по кнопке
    setModalActive(false) // Метод передающий значения (false) в Хук
  }

  const changeModal = () => (auth
    ? <Login setAuth={setAuth} api={api} setModalActive={setModalActive} setToken={setToken} />
    : <Signup setAuth={setAuth} api={api} setModalActive={setModalActive} setToken={setToken} />)
  // Выбор компонента для отображения форм регистрайии (Signup) и авторизации (Login)

  return ( // jsx разметка
    <div className={stylesModule.modalContainer} style={style}>
      <div className={stylesModule.modal}>
        <Xmark type="button" className={stylesModule.modalClose} onClick={closeModal} /* Установка иконки через компонент (Xmark) *//>
        {changeModal()/* Запуск функции выбора компонента */}
      </div>
    </div>
  )
}
