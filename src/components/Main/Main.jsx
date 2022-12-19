import { Catalog } from '../Pages/catalog' // Импорт компонента
import { Home } from '../Pages/home' // Импорт компонента

function Main({ user, dataProducts, token }) { // Компонент Main с {props}
  return ( // jsx разметка
    <main>
      {user && token/* В случае регистрации юзера */
        ? <Catalog dataProducts={dataProducts} /* Выбор страницы копонента (Catalog) *//>
        : <Home /* При отсутствии юзера выбор копонента (Home) *//>}
    </main>
  )
}

export { // экспорт компонента
  Main,
}
