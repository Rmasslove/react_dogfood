import { useState } from 'react' // Импорт компонента
import { useDispatch } from 'react-redux' // Импорт компонента
import { useNavigate } from 'react-router-dom' // Импорт компонента
import { toast } from 'react-toastify'
import { newAboutTokenRedux, newAboutUserRedux } from '../../redux/slices/aboutUserSlice' // Импорт компонента
import styleslogin from './login.module.scss' // Импорт стилей
import 'react-toastify/dist/ReactToastify.css'

export function Login({
  setAuth, api, setModalActive, setToken,
}) { // Компонент (Login) с {props}
  const [inp1, setInp1] = useState('') // Хук для поля (email)
  const [inp2, setInp2] = useState('') // Хук для поля (password)
  const navigate = useNavigate() // Хук для навигации из (react-router-dom)
  const dispatch = useDispatch() // Хук из (Redux)

  const logIn = (body) => { // Функция (logIn)
    api.signIn(body) // Вызов метода логина
      .then((res) => res.json()) // Ответ в json
      .then((data) => { // Ответ в объекте
        if (!data.error && !data.err) { // Проверка на ошибку (если нет - то)
          localStorage.setItem('userSM8', data.data.name) // Запись в (localStorage) имени
          localStorage.setItem('tokenSM8', data.token) // Запись в (localStorage) токена
          setToken(data.token) // Запись в Хук (token)
          dispatch(newAboutUserRedux(data.data.name)) // Делаем запись о (user) в (redux)
          dispatch(newAboutTokenRedux(data.token)) // Делаем запись о (token) в (redux)
          setInp1('') // Запись в Хук (inp1) для очистки поля воода
          setInp2('') // Запись в Хук (inp2) для очистки поля воода
          setModalActive(false) // Запись в Хку (modalActive) для скрытия модального окна
          navigate('/catalog') // Переход на страницу каталога
        } else {
          toast.error(data.message) // Вывод информации об ошибке
        }
      })
  }

  const sendForm = (e) => { // Функция отправки формы для авторизации
    e.preventDefault() // Отмена действия формы по умолчанию
    const body = { // Объект с данными из формы
      email: inp1, // Емейл
      password: inp2, // Пароль
    }
    logIn(body) // Вызов функции (logIn)
  }

  return ( // jsx разметка
    <div>
      <form className={styleslogin.form} onSubmit={sendForm /* Событие вызывающие функцию */}>
        <h2 className={styleslogin.h}>Войти</h2>
        <input
          type="email"
          placeholder="Введите вашу почту"
          value={inp1}
          required
          onChange={(e) => { setInp1(e.target.value) }/* Поле приема данных, запись их в Хук */}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={inp2}
          onChange={(e) => { setInp2(e.target.value) }/* Поле приема данных, запись их в Хук */}
        />
        <button className={styleslogin.btn} type="submit">Войти</button>
        <button
          className={styleslogin.link}
          type="submit"
          onClick={() => { setAuth((prev) => !prev) }/* Кнопка меняющая формы (Регистрация/Вход) */}
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  )
}
