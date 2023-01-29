import { useNavigate } from 'react-router-dom' // Импорт компонента
import { useEffect, useState } from 'react' // Импорт компонента
import { ToastContainer, toast } from 'react-toastify'
import stylesSearch from './search.module.scss' // Импорт стилей компонента
import { ReactComponent as Glass } from './img/magnifying-glass-solid.svg' // Импорт файла (svg) преобразованного в компонент
import { ReactComponent as Xmark } from './img/circle-xmark-regular.svg' // Импорт файла (svg) преобразованного в компонент
import { useDebounce } from '../../Hooks/useDebounce' // Импорт компонента

export function Search({
  dataProducts, setSearchData, searchText, setUpdateSearchText,
  setsearchParams, setSearchEmptyFlag, api, setIsLoadingSearchProducts, reload,
}) { // Компонент строки поиска с {props}
  const navigate = useNavigate() // Хук из (react-router-dom)
  const debounceValue = useDebounce(searchText) // Хук (useDebounce) с задержкой 600ms
  const [searchTextFlag, setSearchTextFlag] = useState(false) // Флаг для разрешения навигации

  useEffect(() => { // Хук для передачи значения из поля поиска в URL
    setsearchParams({ q: searchText }) // Метод передачи
  }, [searchText]) // Реагинует на текст в строке поиска

  const clearSearch = () => { // Функция очистки поля поиска
    setUpdateSearchText('') // Хук принимающий значение пустого поля для поиска
    setSearchData(dataProducts) // Хук принимающий изначальное значение списка продуктов
    navigate('/catalog') // Перенаправляем на страницу каталога с товарами
  }

  const search = (Event) => { // Функция для поля поиска товаров
    setUpdateSearchText(Event.target.value) // Хук принимающий значение поля поиска
  }

  useEffect(() => { // Хук для запуска поиска товара
    if (searchText) { // Если в строке поиска что-то есть то...
      setIsLoadingSearchProducts(true) // Флаг для лоудера поиска
      api.searchProduct(searchText) // Метод получения поиска
        .then((res) => res.json()) // ответ в json
        .then((data) => { // ответ в объекте
          setIsLoadingSearchProducts(false) // Снимаем флаг для лоудера поиска
          if (!data.error && !data.err) { // Проверка на ошибку (если нет - то)
            if (data.length === 0) { // Если товаров не нейдено
              setSearchEmptyFlag(true) // Поднимае флаг для стриницы (ничего не найдено)
            } else { // Если товары есть...
              setSearchData(data) // Хук принимающий список отсортированых продуктов для отображения
              setSearchEmptyFlag(false) // Ставим запрет на страницу (ничего не найдено)
              // eslint-disable-next-line no-unused-expressions
              !searchTextFlag && navigate('/catalog') // Перенаправляем на страницу каталога с товарами
              setSearchTextFlag(true) // Ставить флаг о том что переход на стран. с catalog уже был
            }
          } else {
            toast.error(data.message) // Вывод информации об ошибке
          }
        })
    }
  }, [debounceValue, reload]) // Срабатывает на функцию (debounceValue) 600ms + reload для лайков

  useEffect(() => { // Хук для отработки переходов в каталог при пустой строке поиска
    if (!searchText) { // Если поле поиска опустело...
      setIsLoadingSearchProducts(false) // Импорт компонента
      setSearchEmptyFlag(false) // Ставим закрывающий флаг для стриницы (ничего не найдено)
      // eslint-disable-next-line no-unused-expressions
      searchTextFlag && navigate('/catalog') // Перенаправляем на страницу каталога с товарами
      setSearchTextFlag(false) // Изменяем флаг на разрешающий переход при следующем поиске
    }
  }, [searchText]) // Реагинует на текст в строке поиска

  return (
    <div className={stylesSearch.search}>
      <input placeholder="Поиск..." value={searchText} onChange={search} /* Поле для в вода с запускающим функцию для поиска событием (onChange) *//>
      <button type="button">
        {searchText /* При наличии текста в поле для ввода */
          ? <Xmark onClick={clearSearch} /* Установка иконки через компонент (Xmark) *//>
          : <Glass /* Или установка иконки через компонент (Glass) *//>}
      </button>
      <ToastContainer />
    </div>
  )
}
