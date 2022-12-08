import { Footer } from './components/Footer/Footer' // Импорт компонента
import { Header } from './components/Header/Header' // Импорт компонента
import { Main } from './components/Main/Main' // Импорт компонента
import './App.css' // Импорт компонента стилей

function App() { // Компотент App
  return ( // jsx разметка
    <div className="containerApp">
      <Header /* компонент Header *//>
      <Main /* компонент Main *//>
      <Footer /* компонент Footer *//>
    </div>
  )
}

export default App // Экспорт компонента App методом (default)
