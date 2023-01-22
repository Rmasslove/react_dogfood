import { Link } from 'react-router-dom' // Импорт компонента
import { Cards } from '../Card/Cards' // Импорт компонента
import stylesLikes from './likes.module.scss' // Импорт компонента стилей
import stylesPages from '../Pages/pages.module.scss' // Импорт компонента стилей

export function Likes({
  dataProducts, userDetails, api, setReload,
}) { // Копонент (likes)
  const isLikeArr = dataProducts.filter(
    // eslint-disable-next-line no-underscore-dangle
    (el) => el.likes.includes(userDetails._id),
  ) // Выбор товаров с лайками запись в массив

  return ( // jsx разметка
    <>
      <span className={stylesLikes.link}>Избранные товары --&gt; </span>
      <Link to="/catalog"><span className={stylesLikes.link}/* Линк для перехода на страницу каталога */>Перейти в каталог товаров</span></Link>
      <div className={stylesPages.cards}>
        {isLikeArr.map((el) => (/* Метод мап для отображения нужного количества карточек */
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
    </>
  )
}
