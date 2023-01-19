import { Routes, Route } from 'react-router-dom' // Импорт компонента
import { BasketRoute } from '../Basket/BasketRoute' // Импорт компонента
import { Card } from '../Card/Card' // Импорт компонента
import { Catalog } from '../Pages/catalog' // Импорт компонента
import { Home } from '../Pages/home' // Импорт компонента
import { SearchEmpty } from '../Search/SearchNotFound'
import { NotFoundPage } from './NotFoudPage' // Импорт компонента

function Main({ // Копонент основного тела сайта
  dataProducts, user, api, setGoods, setUpdateSearchText,
}) { // Компонент Main с {props}
  return ( // jsx разметка
    <main>
      <Routes>
        {/* (Роуты) маршруты для перехода по страницам */}
        <Route path="*" element={<NotFoundPage />} />
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
        <Route path="/card/:id" element={<Card api={api} />} />
        <Route path="/basket" element={<BasketRoute />} />
        <Route path="/catalog/searchempty" element={<SearchEmpty setGoods={setGoods} setUpdateSearchText={setUpdateSearchText} />} />
      </Routes>
    </main>
  )
}

export { // экспорт компонента
  Main,
}
