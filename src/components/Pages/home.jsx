// import { Card } from '../Card/Card' // Импорт компонента
import stylesPages from './pages.module.scss' // Импорт компонента стилей

export function Home() { // Компонент (Catalog) с {props}
  return (
    <div className={stylesPages.home}>
      <h1>Каталог товаров</h1>
      <h2>Пожалуйста зарегистрируйтесь!</h2>
    </div>

  )
}
