import { useSelector } from 'react-redux' // Импорт компонента
import { Link } from 'react-router-dom' // Импорт компонента
import { getBasketSliceSelector } from '../../redux/slices/basketSlice' // Импорт компонента
import { Basket } from './Basket' // Импорт компонента
import stylesBasket from './basket.module.scss' // Импорт компонента стилей
import { BasketEmpty } from './BasketEmpty' // Импорт компонента

export function BasketRoute() {
  const basketRedux = useSelector(getBasketSliceSelector) // Хук из (Redux) с массивом корзины
  // eslint-disable-next-line react/no-unstable-nested-components
  function BasketRouteFn() { // функция выбора страницы
    if (basketRedux.length > 0) { // Если корзина не пустая то...
      return <Basket /* Страница корзины */ />
    }
    return <BasketEmpty /* Если корзина пустая *//>
  }

  return ( // jsx разметка
    <>
      <span className={stylesBasket.link}>Корзина товаров --&gt; </span>
      <Link to="/catalog"><span className={stylesBasket.link}/* Линк для перехода на страницу каталога */>Перейти в каталог товаров</span></Link>
      <div>
        {BasketRouteFn()/* функция выбора страницы */}
      </div>
    </>
  )
}
