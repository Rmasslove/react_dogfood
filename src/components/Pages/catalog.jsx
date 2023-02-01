import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Cards } from '../Card/Cards' // Импорт компонента
import { Loader } from '../Loader/Loader' // Импорт компонента
import { SearchEmpty } from '../Search/SearchNotFound' // Импорт компонента
import stylesPages from './pages.module.scss' // Импорт компонента стилей

export function Catalog({
  dataProducts, userDetails, api, setReload, searchText, isLoadingProducts,
  searchEmptyFlag, setUpdateSearchText, setSearchEmptyFlag, isLoadingSearchProducts,
}) { // Компонент отрисовки карточик с {props}
  const [sortCancell, setSortCancell] = useState(true) // Флаг для кнопки (отмена)
  const [sortByPrice, setsortByPrice] = useState(false) // Флаг для кнопки (по цене)
  const [sortByPriceChevron, setsortByPriceChevron] = useState(false) // Флаг для стрелки (по цене)
  const [sortBypPomotion, setsortByPromotion] = useState(false) // Флаг для кнопки (по акции)
  const [sortBypPomotionChevron, setsortByPromotionChevron] = useState(false) // Ф. д стр (по акции)
  const [sortByDate, setsortByDate] = useState(false) // Флаг для кнопки (по дате)
  const [sortByDateChevron, setsortByDateChevron] = useState(false) // Флак для стрелки (по дате)
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams() // Для отображения поиска в URL
  const [sortDataProducts, setSortDataProducts] = useState([]) // Для приема сортирован. продуктов
  const navigate = useNavigate() // Хук для навигации из (react-router-dom)

  const setSortCancellFn = () => { // Функция сортировки кнопка (отмена)
    navigate('/catalog') // Переход на страницу каталога
    setSortCancell(true) // Меняем флаг отмены
    setsortByPrice(false) // Меняем флаг по цене
    setsortByPromotion(false) // Меняем флаг по акции
    setsortByDate(false) // Меняем флаг по дате
    setSortDataProducts(dataProducts)
  }

  const setsortByPriceFn = () => { // Функция сортировки кнопка (по цене)
    if (!sortByPrice) { // Если кнопка не нажата...
      setSearchParams({ sort: 'price' }) // Метод передачи в URL
      setsortByPrice(true) // Меняем флаг по цене
      setSortCancell(false) // Меняем флаг отмены
      setsortByPromotion(false) // Меняем флаг по акции
      setsortByDate(false) // Меняем флаг по дате
    } if (sortByPriceChevron) {
      setsortByPriceChevron(false) // Меняем флаг для стрелки
      const arr = [...dataProducts].sort((prev, next) => { // Сортируем
        const c = Math.round(prev.price - ((prev.price / 100) * prev.discount))
        const d = Math.round(next.price - ((next.price / 100) * next.discount))
        return c - d
      })
      setSortDataProducts(arr) // Записываем в Хук
    } else {
      setsortByPriceChevron(true) // Меняем флаг для стрелки
      const arr = [...dataProducts].sort((prev, next) => { // Сортируем
        const c = Math.round(next.price - ((next.price / 100) * next.discount))
        const d = Math.round(prev.price - ((prev.price / 100) * prev.discount))
        return c - d
      })
      setSortDataProducts(arr) // Записываем в Хук
    }
  }

  const setSearchSortByPriceFn = () => { // Функция сортировки При поиске, кнопка (по цене)
    if (!sortByPriceChevron) {
      const arr = [...dataProducts].sort((prev, next) => { // Сортируем
        const c = Math.round(prev.price - ((prev.price / 100) * prev.discount))
        const d = Math.round(next.price - ((next.price / 100) * next.discount))
        return c - d
      })
      setSortDataProducts(arr) // Записываем в Хук
    } else {
      const arr = [...dataProducts].sort((prev, next) => { // Сортируем
        const c = Math.round(next.price - ((next.price / 100) * next.discount))
        const d = Math.round(prev.price - ((prev.price / 100) * prev.discount))
        return c - d
      })
      setSortDataProducts(arr) // Записываем в Хук
    }
  }

  const setsortByPromotionFn = () => { // Функция сортировки кнопка (по акции)
    if (!sortBypPomotion) { // Если кнопка не нажата...
      setSearchParams({ sort: 'promotion' }) // Метод передачи в URL
      setsortByPromotion(true) // Меняем флаг по акции
      setSortCancell(false) // Меняем флаг отмены
      setsortByPrice(false) // Меняем флаг по цене
      setsortByDate(false) // Меняем флаг по дате
    } if (sortBypPomotionChevron) {
      setsortByPromotionChevron(false) // Меняем флаг для стрелки
      const arr = [...dataProducts].sort((prev, next) => prev.discount - next.discount) // Сортируем
      setSortDataProducts(arr) // Записываем в Хук
    } else {
      setsortByPromotionChevron(true) // Меняем флаг для стрелки
      const arr = [...dataProducts].sort((prev, next) => next.discount - prev.discount) // Сортируем
      setSortDataProducts(arr) // Записываем в Хук
    }
  }

  const setSearchSortByPromotionFn = () => { // Функция сортировки При поиске, кнопка (по акции)
    if (!sortBypPomotionChevron) {
      setsortByPromotionChevron(false) // Меняем флаг для стрелки
      const arr = [...dataProducts].sort((prev, next) => prev.discount - next.discount) // Сортируем
      setSortDataProducts(arr) // Записываем в Хук
    } else {
      setsortByPromotionChevron(true) // Меняем флаг для стрелки
      const arr = [...dataProducts].sort((prev, next) => next.discount - prev.discount) // Сортируем
      setSortDataProducts(arr) // Записываем в Хук
    }
  }

  const setsortByDateFn = () => { // Функция сортировки кнопка (по дате)
    if (!sortByDate) { // Если кнопка не нажата...
      setSearchParams({ sort: 'date' }) // Метод передачи в URL
      setsortByDate(true) // Меняем флаг по дате
      setSortCancell(false) // Меняем флаг отмены
      setsortByPrice(false) // Меняем флаг по цене
      setsortByPromotion(false) // Меняем флаг по акции
    } if (sortByDateChevron) {
      setsortByDateChevron(false) // Меняем флаг для стрелки
      const arr = [...dataProducts].sort((prev, next) => { // Сортируем
        const c = new Date(prev.created_at)
        const d = new Date(next.created_at)
        return c.getTime() - d.getTime()
      })
      setSortDataProducts(arr) // Записываем в Хук
    } else {
      setsortByDateChevron(true) // Меняем флаг для стрелки
      const arr = [...dataProducts].sort((prev, next) => { // Сортируем
        const c = new Date(prev.created_at)
        const d = new Date(next.created_at)
        return d.getTime() - c.getTime()
      })
      setSortDataProducts(arr) // Записываем в Хук
    }
  }

  const setSearchSortByDateFn = () => { // Функция сортировки При поиске, кнопка (по дате)
    if (!sortByDateChevron) {
      const arr = [...dataProducts].sort((prev, next) => { // Сортируем
        const c = new Date(prev.created_at)
        const d = new Date(next.created_at)
        return c.getTime() - d.getTime()
      })
      setSortDataProducts(arr) // Записываем в Хук
    } else {
      const arr = [...dataProducts].sort((prev, next) => { // Сортируем
        const c = new Date(prev.created_at)
        const d = new Date(next.created_at)
        return d.getTime() - c.getTime()
      })
      setSortDataProducts(arr) // Записываем в Хук
    }
  }

  useEffect(() => { // Для приема массива с продуктами и переадресации через сортировки
    if (dataProducts.length) {
      if (sortByPrice) { // Если флаг по цене
        setSearchSortByPriceFn() // Вызываем функцию сортировки
      } else if (sortBypPomotion) { // Если флаг по акции
        setSearchSortByPromotionFn() // Вызываем функцию сортировки
      } else if (sortByDate) { // Если флаг по дате
        setSearchSortByDateFn() // Вызываем функцию сортировки
      } else if (sortCancell && !searchText) {
        setSortCancellFn() // Если по без сортировки
      } else {
        setSortDataProducts(dataProducts)
      }
    }
  }, [dataProducts]) // Реагируем на массив с продуктами

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
        {sortDataProducts.map((el) => (/* Метод мап для отображения нужного количества карточек */
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
      {!searchEmptyFlag && ( // Если флаг для страницы (ничего не найдено) НЕ поднят...
      <div className={stylesPages.btnSortWr}>
        <div className={stylesPages.tagSort}>Сортировка:</div>
        <button type="button" onClick={setSortCancellFn} className={sortCancell ? stylesPages.btnSortTrue : stylesPages.btnSortFalse}>
          <span>
            Отмена
            <i className="fa-solid fa-xmark" />
          </span>
        </button>
        <button type="button" onClick={setsortByPriceFn} className={sortByPrice ? stylesPages.btnSortTrue : stylesPages.btnSortFalse}>
          <span>
            По цене
            {sortByPriceChevron ? <i className="fa-solid fa-chevron-down" /> : <i className="fa-solid fa-chevron-up" />}
          </span>
        </button>
        <button type="button" onClick={setsortByPromotionFn} className={sortBypPomotion ? stylesPages.btnSortTrue : stylesPages.btnSortFalse}>
          <span>
            По акции
            {sortBypPomotionChevron ? <i className="fa-solid fa-chevron-down" /> : <i className="fa-solid fa-chevron-up" />}
          </span>
        </button>
        <button type="button" onClick={setsortByDateFn} className={sortByDate ? stylesPages.btnSortTrue : stylesPages.btnSortFalse}>
          <span>
            По дате
            {sortByDateChevron ? <i className="fa-solid fa-chevron-down" /> : <i className="fa-solid fa-chevron-up" />}
          </span>
        </button>
      </div>
      )}
      {searchEmptyFn()}
    </>
  )
}
