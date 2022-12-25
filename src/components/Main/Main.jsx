import { Routes, Route } from 'react-router-dom' // Импорт компонента
import { Card } from '../Card/Card' // Импорт компонента
import { Catalog } from '../Pages/catalog' // Импорт компонента
import { Home } from '../Pages/home' // Импорт компонента

function Main({ dataProducts, user }) { // Компонент Main с {props}
  return ( // jsx разметка
    <main>
      <Routes>
        {/* (Роуты) маршруты для перехода по страницам */}
        <Route path="/" element={<Home user={user}/* При отсутствии юзера выбор копонента (Home) */ />} />
        <Route
          path="/catalog"
          element={(user && <Catalog dataProducts={dataProducts} /* Выбор страницы (Catalog) *//>)
        || <Home user={user} /* При отсутствии юзера выбор копонента (Home) */ />}
        />
        <Route path="/card/:id" element={<Card />} />
      </Routes>
    </main>
  )
}

export { // экспорт компонента
  Main,
}
