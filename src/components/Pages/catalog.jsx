import { Cards } from '../Card/Cards' // Импорт компонента
import { Loader } from '../Loader/Loader' // Импорт компонента
import { SearchEmpty } from '../Search/SearchNotFound' // Импорт компонента
import stylesPages from './pages.module.scss' // Импорт компонента стилей

export function Catalog({
  dataProducts, userDetails, api, setReload, searchText, isLoadingProducts,
  searchEmptyFlag, setUpdateSearchText, setSearchEmptyFlag, isLoadingSearchProducts,
}) { // Компонент отрисовки карточик с {props}
  const searchEmptyFn = () => { // Функция для выбора компанентова
    if (searchEmptyFlag) { // Если флаг для страницы (ничего не найдено) поднят...
      return ( // Выводим компанент (ничего не найдено)
        <SearchEmpty
          setUpdateSearchText={setUpdateSearchText}
          setSearchEmptyFlag={setSearchEmptyFlag}
        />
      )
    }
    if (isLoadingProducts) { // Если флаг загрузки товаров (true)
      return (<Loader />) // Грузим лоудер
    }
    if (isLoadingSearchProducts) { // Если флаг поиска товаров (true)
      return (<Loader />) // Грузим лоудер
    }
    return ( // Иначе выводим список товаров
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
    )
  }

  return ( // jsx разметка
    <>
      <p className={stylesPages.link}>
        Каталог товаров
        {' '}
        {(searchText && !searchEmptyFlag) &&/* Поле вывода результата поиска */ (
        <span className={stylesPages.searchResult}>
          --&gt; По запросу&nbsp;
          <b>{searchText}</b>
        &nbsp;
          {`найдено товаров --> ${dataProducts.length}`}
        </span>
        )}
      </p>
      {searchEmptyFn()}
    </>
  )
}
