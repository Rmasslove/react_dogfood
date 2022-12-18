// import { Card } from '../Card/Card' // Импорт компонента
import stylesPages from './pages.module.scss' // Импорт компонента стилей

export function Home() { // Компонент вывода страницы по умолчанию с {props}
  return ( // jsx разметка
    <div className={stylesPages.home}>
      <h1>Вас приветствует магазин продуктов для собак</h1>
      <h2>Пожалуйста зарегистрируйтесь!</h2>
    </div>
  )
}
