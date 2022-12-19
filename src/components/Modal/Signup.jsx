import { useState } from 'react' // Импорт компонента
import stylesSignup from './signup.module.scss' // Импорт стилей

export function Signup({ setAuth, api }) { // Компонент (Signup) с {props}
  const [inp1, setInp1] = useState('') // Хук для поля (email)
  const [inp2, setInp2] = useState('') // Хук для поля (password-1)
  const [inp3, setInp3] = useState('') // Хук для поля (password-2)
  const [testPwd, setTestPwd] = useState(true)
  // Хук для проверки правильности ввода 2 паролей разрешающий кнопку (Зарегистрироваться)

  const checkPwd = (val, type = 'main') => { // Функция проверки заполнения полей и правильности паролей
    // eslint-disable-next-line no-unused-expressions
    type === 'main' ? setInp2(val) : setInp3(val) // Определение "активного" поля и запись данных в Хук поля

    if (val) { // Если есть данные в поле
      if (type === 'main') { // Если тип поля (main)
        setTestPwd(val !== inp3) // Сравниваем данные с 2 полем для пароля
      } else { // Иначе
        setTestPwd(val !== inp2) // Сравниваем данные с 1 полем для пароля
      }
    }
  }

  const sendForm = (e) => { // Функция отправки формы для регистрации
    e.preventDefault() // Отмена действия формы по умолчанию
    const body = { // Объект с данными из формы
      email: inp1, // Емейл
      password: inp2, // Пароль
    }
    api.signUp(body) // Вызов метода регистрации
      .then((res) => res.json()) // Ответ в json
      .then((data) => { // Ответ в объекте
        if (!data.error && !data.err) { // Проверка на ошибку (если нет - то)
          setInp1('') // Запись в Хук (inp1) для очистки поля воода
          setInp2('') // Запись в Хук (inp2) для очистки поля воода
          setInp3('') // Запись в Хук (inp3) для очистки поля воода
          setAuth((prev) => !prev) // Запись в Хук (auth) для смены страницы с (Signup) на (Login)
        } else {
          // eslint-disable-next-line no-alert
          alert(data.message) // Вывод информации об ошибке
        }
      })
  }

  return ( // jsx разметка

    <form className={stylesSignup.form} onSubmit={sendForm /* Событие вызывающие функцию */}>
      <h2 className={stylesSignup.h}>Зарегистрироваться</h2>
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
        onChange={(e) => { checkPwd(e.target.value) }/* Поле принимающие данные, запись их в Хук */}
      />
      <input
        type="password"
        placeholder="Повторите пароль"
        value={inp3}
        onChange={(e) => { checkPwd(e.target.value, 'secondary') }/* Поле принимающие данные, запись их в Хук */}
      />
      <button className={stylesSignup.btn} type="submit" disabled={testPwd /* Кнопка (Регистрации) проверка отображения */}>
        Зарегистрироваться
      </button>
      <button
        className={stylesSignup.link}
        type="submit"
        onClick={() => { setAuth((prev) => !prev) }/* Кнопка меняющая формы (Регистрация/Вход) */}
      >
        Войти
      </button>
    </form>
  )
}
