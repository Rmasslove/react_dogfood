import { useEffect, useState } from 'react' // Импорт компонента
import { useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import { Footer } from './components/Footer/Footer' // Импорт компонента
import { Header } from './components/Header/Header' // Импорт компонента
import { Main } from './components/Main/Main' // Импорт компонента
import { Modal } from './components/Modal/Modal' // Импорт компонента
import { Api } from './Api' // Импорт компонента
import { newArrDataProductsRedux } from './redux/slices/dataProductsSlise'
import './App.css' // Импорт компонента стилей
import 'react-toastify/dist/ReactToastify.css'

function App() { // Компотент App
  const [user, setUser] = useState(localStorage.getItem('userSM8')) // Хук (useState) принимающий данные из (localStorage) о пользователе
  const [token, setToken] = useState(localStorage.getItem('tokenSM8')) // Хук (useState) принимающий (token) из (localStorage)
  const [modalActive, setModalActive] = useState(false) // Хук для модального окна, скрыто (false)
  const [api, setApi] = useState(new Api(token)) // Хук для состояния (Api)
  const [dataProducts, setGoods] = useState([]) // Хук для получения инф. о продуктах с сервера
  const [userDetails, setUserDetails] = useState([]) // Хук для получения инф. пользователе
  const [searchData, setSearchData] = useState(dataProducts) // Хук список количества товаров поиска
  const [searchText, setUpdateSearchText] = useState('') // Хук для поля поиска принимающий пустую строку
  const [reload, setReload] = useState(0) // Хук для массива зависимостей вызывающий перезапуск
  const dispatch = useDispatch() // Хук из (Redux)

  useEffect(() => { // Хук с запросом информации о пользователе
    if (token) { // Если токен есть
      api.getUserDetails() // Метод запроса на получение информации о пользователе
        .then((res) => res.json()) // ответ в json
        .then((data) => { // ответ в объекте
          if (!data.error && !data.err) { // Проверка на ошибку (если нет - то)
            setUserDetails(data) // Запись результата в Хук (userDetails)
          } else {
            toast.error(data.message) // Вывод информации об ошибке
          }
        })
    }
  }, [dataProducts]) // Срабатывает на изменения (dataProducts)

  useEffect(() => { // Хук для проверки загрузки страницы и перезагрузки, при наличии (token)
    if (token) { // Если токен есть
      api.getProducts() // Метод запроса на получение продуктов
        .then((res) => res.json()) // ответ в json
        .then((data) => { // ответ в объекте
          if (!data.error && !data.err) { // Проверка на ошибку (если нет - то)
            setGoods(data.products) // Запись результата в Хук (dataProducts)
            dispatch(newArrDataProductsRedux(data.products)) // Запись информации в срез (redux)
          } else {
            toast.error(data.message) // Вывод информации об ошибке
          }
        })
    }
  }, [])

  useEffect(() => { // Хук для проверки изменения (token)
    if (!token) { // если токена нет
      localStorage.removeItem('userSM8') // Очистка юзера из (localStorage)
      setUser(null) // Очистка хука с юзером
      localStorage.removeItem('localProducts') // Очистка записи о продуктах из (localStorage)
    } else {
      setApi(new Api(token)) // Запись в Хук (api) новый токен
      setUser(localStorage.getItem('userSM8')) // Обновление в Хук (user) из (localStorage)
    }
  }, [token]) // Срабатывает при изменении (token)

  useEffect(() => { // Хук удаляющий информацию о токене если изменился (user)
    if (!user) { // Если (user) нет
      localStorage.removeItem('tokenSM8') // Очистка токена из (localStorage)
      setToken(null) // Очистка информации о токене в (token)
      localStorage.removeItem('localProducts') // Очистка записи о продуктах из (localStorage)
    }
  }, [user]) // Срабатывает при изменении (user)

  useEffect(() => { // Хук загрузка товаров в 1 раз, при изменении в (api)
    if (token && user) { // Если токен есть
      api.getProducts() // Метод запроса на получение продуктов
        .then((res) => res.json()) // ответ в json
        .then((data) => { // ответ в объекте
          if (!data.error && !data.err) { // Проверка на ошибку (если нет - то)
            setGoods(data.products) // Запись результата в Хук (dataProducts)
            dispatch(newArrDataProductsRedux(data.products)) // Запись информации в срез (redux)
            const strData = JSON.stringify(data.products)
            // Сущность для с товарами для записи в (localStorage)
            localStorage.setItem('localProducts', strData) // Запись в (localStorage)
          } else {
            toast.error(data.message) // Вывод информации об ошибке
          }
        })
    }
  }, [api, reload]) // Срабатывает при изменении (api) и (reload)

  return ( // jsx разметка
    <>
      <div className="containerApp">
        <Header /* Компонент (Header) с пропсами */
          user={user}
          setUser={setUser}
          dataProducts={dataProducts}
          setModalActive={setModalActive}
          setUserDetails={setUserDetails}
          api={api}
          token={token}
          setSearchData={setSearchData}
          searchText={searchText}
          setUpdateSearchText={setUpdateSearchText}
          userDetails={userDetails}
        />
        <Main
          user={user}
          dataProducts={dataProducts}
          api={api}
          setGoods={setGoods}
          setUpdateSearchText={setUpdateSearchText}
          userDetails={userDetails}
          setReload={setReload}
          searchData={searchData}
          searchText={searchText}
        />
        <Footer /* компонент Footer *//>
      </div>
      <Modal /* компонент Modal с пропсами */
        modalActive={modalActive}
        setModalActive={setModalActive}
        api={api}
        setToken={setToken}
        user={user}
        userDetails={userDetails}
      />
      <ToastContainer />
    </>
  )
}

export default App // Экспорт компонента App методом (default)
