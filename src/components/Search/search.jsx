import { useNavigate } from 'react-router-dom' // Импорт компонента
import { useEffect } from 'react' // Импорт компонента
import stylesSearch from './search.module.scss' // Импорт стилей компонента
import { ReactComponent as Glass } from './img/magnifying-glass-solid.svg' // Импорт файла (svg) преобразованного в компонент
import { ReactComponent as Xmark } from './img/circle-xmark-regular.svg' // Импорт файла (svg) преобразованного в компонент
import { useDebounce } from '../../Hooks/useDebounce' // Импорт компонента

export function Search({
  dataProducts, setSearchData, searchText, setUpdateSearchText,
}) { // Компонент строки поиска с {props}
  const navigate = useNavigate() // Хук из (react-router-dom)
  const debounceValue = useDebounce(searchText) // Хук (useDebounce) с задержкой 600ms

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
      const arr = dataProducts.filter( // Метод сортировки списка продуктов
        (el) => el.name.toLowerCase().includes(searchText.toLowerCase()),
      )
      if (arr.length === 0) { // Если товаров не нейдено
        navigate('/catalog/searchempty') // Перенаправляем на страницу (searchempty)
      } else {
        navigate('/catalog') // Перенаправляем на страницу каталога с товарами
        setSearchData(arr) // Хук принимающий список отсортированых продуктов
      }
    }
  }, [debounceValue]) // Срабатывает на изменение функции (debounceValue) 600ms

  return (
    <div className={stylesSearch.search}>
      <input placeholder="Поиск..." value={searchText} onChange={search} /* Поле для в вода с запускающим функцию для поиска событием (onChange) *//>
      <button type="button">
        {searchText /* При наличии текста в поле для ввода */
          ? <Xmark onClick={clearSearch} /* Установка иконки через компонент (Xmark) *//>
          : <Glass /* Или установка иконки через компонент (Glass) *//>}
      </button>
    </div>
  )
}
