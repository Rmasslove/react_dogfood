import { Routes, Route } from 'react-router-dom' // Импорт компонента
import { BasketRoute } from '../Basket/BasketRoute' // Импорт компонента
import { Card } from '../Card/Card' // Импорт компонента
import { Catalog } from '../Pages/catalog' // Импорт компонента
import { Home } from '../Pages/home' // Импорт компонента
import { NotFoundPage } from './NotFoudPage' // Импорт компонента

function Main({ // Копонент основного тела сайта
  dataProducts, user, api, basket, setBasket,
}) { // Компонент Main с {props}
  return ( // jsx разметка
    <main>
      <Routes>
        {/* (Роуты) маршруты для перехода по страницам */}
        <Route path="/" element={<Home user={user}/* При отсутствии юзера выбор копонента (Home) */ />} />
        <Route
          path="/catalog"
          element={(user && (
          <Catalog
            api={api}
            dataProducts={dataProducts}
          />
          ))
        || <Home user={user} /* При отсутствии юзера выбор копонента (Home) */ />}
        />
        <Route path="/card/:id" element={<Card api={api} basket={basket} setBasket={setBasket} />} />
        <Route path="/basket" element={<BasketRoute basket={basket} setBasket={setBasket} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
  )
}

export { // экспорт компонента
  Main,
}
