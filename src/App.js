import { useEffect, useState } from 'react' // Импорт компонента
import { Footer } from './components/Footer/Footer' // Импорт компонента
import { Header } from './components/Header/Header' // Импорт компонента
import { Main } from './components/Main/Main' // Импорт компонента
// import fileProducts from './assets/data.json' // Импорт файла с данными
import './App.css' // Импорт компонента стилей
import { Modal } from './components/Modal/Modal' // Импорт компонента
import { Api } from './Api' // Импорт компонента

function App() { // Компотент App
  const [user, setUser] = useState(localStorage.getItem('userSM8')) // Хук (useState) принимающий данные из (localStorage) о пользователе
  const [token, setToken] = useState(localStorage.getItem('tokenSM8')) // Хук (useState) принимающий (token) из (localStorage)
  const [modalActive, setModalActive] = useState(false) // Хук для модального окна, скрыто (false)
  const [api, setApi] = useState(new Api(token)) // Хук для состояния (Api)
  const [dataProducts, setGoods] = useState([]) // Хук для получения инф. о продуктах с сервера

  useEffect(() => { // Хук для проверки загрузки страницы в первый раз на наличие (token)
    if (token) { // Если токен есть
      api.getProducts() // Метод запроса на получение продуктов
        .then((res) => res.json()) // ответ в json
        .then((data) => { // ответ в объекте
          setGoods(data.products) // Запись результата в Хук (dataProducts)
        })// Добавить проверку на ошибку и (Нужен ли этот Хук вообще)
    }
  }, [])

  useEffect(() => { // Хук для проверки изменения (token)
    console.log('token изменён') // Временный консоль для отладки
    setApi(new Api(token)) // Запись в Хук (api) новый токен
    setUser(localStorage.getItem('userSM8')) // Обновление в Хук (user) из (localStorage)
  }, [token]) // Срабатывает при изменении (token)

  useEffect(() => { // Хук удаляющий информацию о (user)
    if (!user) { // Если (user) нет
      localStorage.removeItem('tokenSM8') // Очистка (localStorage)
      setToken(null) // Очистка информации о токене в (token)
    }
  }, [user]) // Срабатывает при изменении (user)

  useEffect(() => { // Хук проверяющий изменения в (api)
    if (token) { // Если токен есть
      api.getProducts() // Метод запроса на получение продуктов
        .then((res) => res.json()) // ответ в json
        .then((data) => { // ответ в объекте
          setGoods(data.products) // Запись результата в Хук (dataProducts)
        }) // Добавить проверку на ошибку
    }
  }, [api]) // Срабатывает при изменении (api)

  return ( // jsx разметка
    <>
      <div className="containerApp">
        <Header /* Компонент (Header) с пропсами */
          user={user}
          setUser={setUser}
          dataProducts={dataProducts}
          setModalActive={setModalActive}
        />
        <Main user={user} dataProducts={dataProducts}/* компонент Main с пропсами */ />
        <Footer /* компонент Footer *//>
      </div>
      <Modal /* компонент Modal с пропсами */
        modalActive={modalActive}
        setModalActive={setModalActive}
        api={api}
        setToken={setToken}
      />
    </>
  )
}

export default App // Экспорт компонента App методом (default)
