import React from 'react' // Импорт компонента
import ReactDOM from 'react-dom/client' // Импорт компонента
import './index.css' // Импорт компонента стилей
import { BrowserRouter } from 'react-router-dom' // Импорт компонента
import { Provider } from 'react-redux'
import { store } from './redux/store'
import App from './App' // Импорт компонента

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App /* компонент App *//>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
