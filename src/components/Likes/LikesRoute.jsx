import { Likes } from './Likes' // Импорт компонента
import { LikesEmpty } from './LikesEmpty'

export function LikesRoute({
  dataProducts, userDetails, api, setReload,
}) { // Копонент для выбора (likes)
  const isLikeArr = dataProducts.filter(
    // eslint-disable-next-line no-underscore-dangle
    (el) => el.likes.includes(userDetails._id),
  ) // Выбор товаров с лайками запись в массив

  // eslint-disable-next-line react/no-unstable-nested-components
  function LikesRouteFn() { // функция выбора страницы
    if (isLikeArr.length > 0) { // Если любимые товары есть то...
      return (
        <Likes
          dataProducts={dataProducts}
          userDetails={userDetails}
          api={api}
          setReload={setReload}
        />
      )
    }
    return <LikesEmpty /* Если корзина пустая *//>
  }

  return ( // jsx разметка
    <div>
      {LikesRouteFn()/* функция выбора страницы */}
    </div>
  )
}
