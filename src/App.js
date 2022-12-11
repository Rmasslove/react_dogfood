import { useState } from 'react' // Импорт компонента
import { Footer } from './components/Footer/Footer' // Импорт компонента
import { Header } from './components/Header/Header' // Импорт компонента
import { Main } from './components/Main/Main' // Импорт компонента
import dataProducts from './assets/data.json' // Импорт файла с данными
import './App.css' // Импорт компонента стилей
import { Modal } from './components/Modal/Modal' // Импорт компонента

function App() { // Компотент App
  const [user, setUser] = useState(localStorage.getItem('userLs')) // Хук (useState) принимающий данные из (localStorage) о пользователе

  const [modalActive, setModalActive] = useState(false) // Хук для модального окна, скрыто (false)

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
      />
    </>
  )
}

export default App // Экспорт компонента App методом (default)
