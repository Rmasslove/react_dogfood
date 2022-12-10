import { useState } from 'react' // Импорт компонента
import { Footer } from './components/Footer/Footer' // Импорт компонента
import { Header } from './components/Header/Header' // Импорт компонента
import { Main } from './components/Main/Main' // Импорт компонента
import dataProducts from './assets/data.json' // Импорт файла с данными
import './App.css' // Импорт компонента стилей

function App() { // Компотент App
  const [user, setUser] = useState(localStorage.getItem('userLs')) // Хук (useState) принимающий данные из (localStorage) о пользователе
  return ( // jsx разметка
    <div className="containerApp">
      <Header user={user} setUser={setUser} dataProducts={dataProducts}/* компонент Header */ />
      <Main user={user} dataProducts={dataProducts}/* компонент Main */ />
      <Footer /* компонент Footer *//>
    </div>
  )
}

export default App // Экспорт компонента App методом (default)
