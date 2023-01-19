import { useNavigate } from 'react-router-dom' // Импорт компонента
import stylesSearch from './search.module.scss' // Импорт компонента стилей

export function SearchEmpty({ setGoods, setUpdateSearchText }) { // Компонент пустой корзины
  const navigate = useNavigate() // Хук из (react-router-dom)
  const navigeteFn = () => { // Функция для перехода в каталог
    navigate('/catalog') // Перенаправляем на страницу каталога с товарами
    const strProducts = localStorage.getItem('localProducts') // Сущность принимающая сохраненное значение о товарах в (localStorage)
    setGoods(JSON.parse(strProducts)) // Запись в Хук начального значения товаров из (loc.Storage)
    setUpdateSearchText('') // Хук принимающий значение пустого поля для поиска
  }

  return ( // jsx разметка
    <div className={stylesSearch.searchEmptyWr}>
      <p className={stylesSearch.searchEmpty}>По запросу ничего не найдено</p>
      <div className={stylesSearch.searchEmptyI}>
        {' '}
        <i className="fa-solid fa-magnifying-glass" />
      </div>
      <div className={stylesSearch.searchEmptyBtnLink}>
        <button type="button" onClick={navigeteFn} className={stylesSearch.searchEmptyBtn}>В каталог</button>
      </div>
    </div>
  )
}
