import { Routes, Route } from 'react-router-dom' // Импорт компонента
import { AddingProduct } from '../AddingProduct/AddingProduct' // Импорт компонента
import { AddProductDone } from '../AddingProduct/AddProductDone' // Импорт компонента
import { ChangeProdukt } from '../AddingProduct/ChangeProdukt' // Импорт компонента
import { DelProductDone } from '../AddingProduct/DelProductDone' // Импорт компонента
import { BasketRoute } from '../Basket/BasketRoute' // Импорт компонента
import { Card } from '../Card/Card' // Импорт компонента
import { LikesRoute } from '../Likes/LikesRoute' // Импорт компонента
import { Catalog } from '../Pages/catalog' // Импорт компонента
import { Home } from '../Pages/home' // Импорт компонента
import { NotFoundPage } from './NotFoudPage' // Импорт компонента

function Main({ // Копонент основного тела сайта
  dataProducts, user, api, userDetails, setReload, searchData,
  searchText, isLoadingProducts, searchEmptyFlag,
  setUpdateSearchText, setSearchEmptyFlag, isLoadingSearchProducts,
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
              dataProducts={searchText ? searchData : dataProducts}
              searchEmptyFlag={searchEmptyFlag}
              userDetails={userDetails}
              api={api}
              setReload={setReload}
              searchText={searchText}
              isLoadingProducts={isLoadingProducts}
              setUpdateSearchText={setUpdateSearchText}
              setSearchEmptyFlag={setSearchEmptyFlag}
              isLoadingSearchProducts={isLoadingSearchProducts}
            />
          ))
            || <Home user={user} /* При отсутствии юзера выбор копонента (Home) */ />}
        />
        <Route path="/card/:id" element={<Card api={api} dataProducts={dataProducts} userDetails={userDetails} setReload={setReload} />} />
        <Route path="/basket" element={<BasketRoute />} />
        <Route path="/likes" element={<LikesRoute dataProducts={dataProducts} userDetails={userDetails} api={api} setReload={setReload} />} />
        <Route path="/changeprodukt/:id" element={<ChangeProdukt api={api} setReload={setReload} />} />
        <Route path="/addingproduct" element={<AddingProduct api={api} setReload={setReload} />} />
        <Route path="/addproductdone" element={<AddProductDone />} />
        <Route path="/delproductdone" element={<DelProductDone />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
  )
}

export { // экспорт компонента
  Main,
}
