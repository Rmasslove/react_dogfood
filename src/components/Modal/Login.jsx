import { useState } from 'react' // Импорт компонента
import styleslogin from './login.module.scss' // Импорт стилей

export function Login({ setAuth }) { // Компонент (Login) с {props}
  const [inp1, setInp1] = useState('') // Хук для поля (email)
  const [inp2, setInp2] = useState('') // Хук для поля (password)

  const sendForm = (e) => { // Функция отправки формы для авторизации
    e.preventDefault() // Отмена действия формы по умолчанию
    const body = { // Объект с данными из формы
      email: inp1, // Емейл
      password: inp2, // Пароль
    }
    console.log(body) // Временный консоль для отладки
  }

  return ( // jsx разметка
    <form className={styleslogin.form} onSubmit={sendForm /* Событие вызывающие функцию */}>
      <h2 className={styleslogin.h}>Войти</h2>
      <input
        type="email"
        placeholder="Введите вашу почту"
        value={inp1}
        required
        onChange={(e) => { setInp1(e.target.value) }/* Поле принимающие данные, запись их в Хук */}
      />
      <input
        type="password"
        placeholder="Пароль"
        value={inp2}
        onChange={(e) => { setInp2(e.target.value) }/* Поле принимающие данные, запись их в Хук */}
      />
      <button className={styleslogin.btn} type="submit">
        Войти
      </button>
      <button
        className={styleslogin.link}
        type="submit"
        onClick={() => { setAuth((prev) => !prev) }/* Кнопка меняющая формы (Регистрация/Вход) */}
      >
        Зарегистрироваться
      </button>
    </form>
  )
}
