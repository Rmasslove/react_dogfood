import stylesSearch from './search.module.scss' // Импорт компонента стилей

export function SearchEmpty({
  setUpdateSearchText,
  setSearchEmptyFlag,
}) { // Компонент пустого поиска
  const navigeteFn = () => { // Функция для перехода в каталог
    setSearchEmptyFlag(false) // Убираем флаг для перехода на стриницу (ничего не найдено)
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
