import { useNavigate } from 'react-router-dom' // Импорт компонента
import stylesSearch from './search.module.scss' // Импорт стилей компонента
import { ReactComponent as Glass } from './img/magnifying-glass-solid.svg' // Импорт файла (svg) преобразованного в компонент
import { ReactComponent as Xmark } from './img/circle-xmark-regular.svg' // Импорт файла (svg) преобразованного в компонент

export function Search({
  dataProducts, setGoods, searchData, setSearchData, searchText, setUpdateSearchText,
}) { // Компонент строки поиска с {props}
  const navigate = useNavigate() // Хук из (react-router-dom)
  const clearSearch = () => { // Функция очистки поля поиска
    setUpdateSearchText('') // Хук принимающий значение пустого поля для поиска
    const strProducts = localStorage.getItem('localProducts') // Сущность принимающая сохраненное значение о товарах в (localStorage)
    setGoods(JSON.parse(strProducts)) // Запись в Хук изначального значения товаров из (loc.Storage)
    setSearchData(dataProducts) // Хук принимающий изначальное значение списка продуктов
  }

  const search = (Event) => { // Функция поиска товаров
    navigate('/catalog') // Перенаправляем на страницу каталога с товарами
    setUpdateSearchText(Event.target.value) // Хук принимающий значение поля поиска
    const strProducts = JSON.parse(localStorage.getItem('localProducts')) // Сущность принимающая товары из (localStorage) для поиска и сортировки
    const arr = strProducts.filter( // Метод сортировки списка продуктов
      (el) => el.name.toLowerCase().includes(Event.target.value.toLowerCase()),
    )
    setSearchData(arr) // Хук принимающий список отсортированых продуктов
    setGoods(arr) // Хук с товарами принимающий отсортированое значение после поиска для отображения
  }

  return (
    <div className={stylesSearch.search}>
      <input placeholder="Поиск..." value={searchText} onChange={search} /* Поле для в вода с запускающим функцию для поиска событием (onChange) *//>
      <button type="button">
        {searchText /* При наличии текста в поле для ввода */
          ? <Xmark onClick={clearSearch} /* Установка иконки через компонент (Xmark) *//>
          : <Glass /* Или установка иконки через компонент (Glass) *//>}
      </button>
      {searchText && /* Поле вывода результата поиска */ (
      <div className={stylesSearch.searchResult}>
        По запросу&nbsp;
        <b>{searchText}</b>
        &nbsp;
        {searchData.length > 0 ? `найдено ${searchData.length} товаров` : 'ничего нe найдено'}
        {/* Если значение списка продуктов больше нуля => Количество найденых продуктов */}
      </div>
      )}
    </div>
  )
}
