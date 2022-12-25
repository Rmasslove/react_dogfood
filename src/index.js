import React from 'react' // Импорт компонента
import ReactDOM from 'react-dom/client' // Импорт компонента
import './index.css' // Импорт компонента стилей
import { BrowserRouter } from 'react-router-dom'
import App from './App' // Импорт компонента

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App /* компонент App *//>
    </BrowserRouter>
  </React.StrictMode>,
)
