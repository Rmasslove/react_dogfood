import React from 'react' // Импорт компонента
import ReactDOM from 'react-dom/client' // Импорт компонента
import './index.css' // Импорт компонента стилей
import App from './App' // Импорт компонента

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App /* компонент App *//>
  </React.StrictMode>,
)
