import { Cards } from '../Card/Cards' // Импорт компонента
import stylesPages from './pages.module.scss' // Импорт компонента стилей

export function Catalog({ dataProducts }) { // Компонент отрисовки карточик с {props}
  return (
    <>
      <p className={stylesPages.link}>Каталог товаров</p>
      <div className={stylesPages.cards}>
        {dataProducts.map((el) => (/* Метод мап для отображения нужного количества карточек */
          <Cards /* Компонента Card */
            key={crypto.randomUUID() /* Вызов функции для получения (key) */}
            {...el /* Информация (содержимое) для карточек ввиде props */}
          />
        ))}
      </div>
    </>
  )
}
