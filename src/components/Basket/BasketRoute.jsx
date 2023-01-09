import { Link } from 'react-router-dom' // Импорт компонента
import { Basket } from './Basket' // Импорт компонента
import stylesBasket from './basket.module.scss' // Импорт компонента стилей
import { BasketEmpty } from './BasketEmpty' // Импорт компонента

export function BasketRoute({ basket, setBasket }) {
  // Компонент выбора страницы корзины или пустой корзины
  // eslint-disable-next-line react/no-unstable-nested-components
  function BasketRouteFn() { // функция выбора страницы
    if (basket.length > 0) { // Если корзина не пустая то...
      return <Basket basket={basket} setBasket={setBasket}/* Страница корзины */ />
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
