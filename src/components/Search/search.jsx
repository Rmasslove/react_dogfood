import { useState } from 'react' // Импорт компонента
import stylesSearch from './search.module.scss' // Импорт стилей компонента
import { ReactComponent as Glass } from './img/magnifying-glass-solid.svg' // Импорт файла (svg) преобразованного в компонент
import { ReactComponent as Xmark } from './img/circle-xmark-regular.svg' // Импорт файла (svg) преобразованного в компонент

export function Search({ dataProducts }) { // Компонент (Search) с {props}
  const [text, updateText] = useState('') // Хук (useState) для поля поиска принимающий пустую строку

  const [searchData, setSearchData] = useState(dataProducts) // Хук принимающий список продуктов
  const clearSearch = () => { // Функция очистки поля поиска
    updateText('') // Хук принимающий значение пустого поля для поиска
    setSearchData(dataProducts) // Хук принимающий изначальное значение списка продуктов
  }

  const search = (Event) => { // Функция поиска товаров
    updateText(Event.target.value) // Хук принимающий значение поля поиска
    const arr = dataProducts.filter( // Метод сортировки списка продуктов
      (el) => el.name.toLowerCase().includes(Event.target.value.toLowerCase()),
    )
    setSearchData(arr) // Хук принимающий список отсортированых продуктов
  }

  return (
    <div className={stylesSearch.search}>
      <input placeholder="Поиск..." value={text} onChange={search} /* Поле для в вода с запускающим функцию для поиска событием (onChange) *//>
      <button type="button">
        {text /* При наличии текста в поле для ввода */
          ? <Xmark onClick={clearSearch} /* Установка иконки через компонент (Xmark) *//>
          : <Glass /* Или установка иконки через компонент (Glass) *//>}
      </button>
      {text && /* Поле вывода результата поиска */ (
      <div className={stylesSearch.searchResult}>
        По запросу&nbsp;
        <b>{text}</b>
        &nbsp;
        {searchData.length > 0 ? `найдено ${searchData.length} товаров` : 'ничего нe найдено'}
        {/* Если значение списка продуктов больше нуля => Количество найденых продуктов */}
      </div>
      )}
    </div>
  )
}
