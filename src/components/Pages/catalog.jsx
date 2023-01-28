import { Cards } from '../Card/Cards' // Импорт компонента
import { Loader } from '../Loader/Loader'
import stylesPages from './pages.module.scss' // Импорт компонента стилей

export function Catalog({
  dataProducts, userDetails, api, setReload, searchText, isLoadingProducts,
}) { // Компонент отрисовки карточик с {props}
  return (
    <>
      <p className={stylesPages.link}>
        Каталог товаров
        {' '}
        {searchText && /* Поле вывода результата поиска */ (
        <span className={stylesPages.searchResult}>
          --&gt; По запросу&nbsp;
          <b>{searchText}</b>
        &nbsp;
          {dataProducts.length > 0 && `найдено ${dataProducts.length} товаров`}
          {/* Если значение списка продуктов больше нуля => Количество найденых продуктов */}
        </span>
        )}
      </p>
      {isLoadingProducts ? <Loader /> : (
        <div className={stylesPages.cards}>
          {dataProducts.map((el) => (/* Метод мап для отображения нужного количества карточек */
            <Cards /* Компонента Card */
              key={crypto.randomUUID() /* Вызов функции для получения (key) */}
              {...el /* Информация (содержимое) для карточек ввиде props */}
              userDetails={userDetails}
              dataProducts={dataProducts}
              api={api}
              setReload={setReload}
            />
          ))}
        </div>
      )}

    </>
  )
}
