import { Routes, Route } from 'react-router-dom'
import { Catalog } from '../Pages/catalog' // Импорт компонента
import { Home } from '../Pages/home' // Импорт компонента

function Main({ dataProducts, user }) { // Компонент Main с {props}
  return ( // jsx разметка
    <main>
      <Routes>
        <Route path="/" element={<Home user={user}/* При отсутствии юзера выбор копонента (Home) */ />} />
        <Route
          path="/catalog"
          element={(user && <Catalog dataProducts={dataProducts} /* Выбор страницы (Catalog) *//>)
        || <Home user={user} /* При отсутствии юзера выбор копонента (Home) */ />}
        />
      </Routes>
    </main>
  )
}

export { // экспорт компонента
  Main,
}
