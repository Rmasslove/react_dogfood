import { useEffect, useState } from 'react' // Импорт компонента
import { useDispatch } from 'react-redux' // Импорт компонента
import { newArrIsLikeProductsRedux } from '../../redux/slices/isLikeProductsSlice' // Импорт компонента
import { Loader } from '../Loader/Loader' // Импорт компонента
import { Likes } from './Likes' // Импорт компонента
import { LikesEmpty } from './LikesEmpty' // Импорт компонента

export function LikesRoute({
  dataProducts, userDetails, api, setReload,
}) { // Копонент для выбора (likes)
  const [isLoadingLikesProducts, setIsLoadingLikesProducts] = useState(true) // Лоудер избранных тов
  const dispatch = useDispatch() // Хук из (Redux)

  const isLikeArr = dataProducts.filter(
    // eslint-disable-next-line no-underscore-dangle
    (el) => el.likes.includes(userDetails._id),
  ) // Выбор товаров с лайками запись в массив

  useEffect(() => { // Хук для проверки загрузки
    if (isLikeArr.length > 0) { // Если загрузилось
      setIsLoadingLikesProducts(false) // Меняем значение для лоудера
      dispatch(newArrIsLikeProductsRedux(isLikeArr)) // Запись в (redux)
    }
  }, [isLikeArr])

  // eslint-disable-next-line react/no-unstable-nested-components
  function LikesRouteFn() { // функция выбора страницы
    if (isLoadingLikesProducts) { // Если флаг лоудера (true)...
      return <Loader /> // Грузим лоудер
    }
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
