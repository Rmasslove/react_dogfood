import { Link } from 'react-router-dom' // Импорт компонента
import stylesBasket from './basket.module.scss' // Импорт компонента стилей

export function BasketEmpty() { // Компонент пустой корзины
  return ( // jsx разметка
    <div className={stylesBasket.basketEmptyWr}>
      <p className={stylesBasket.basketEmpty}>Корзина товаров пуста</p>
      <div className={stylesBasket.basketEmptyI}>
        {' '}
        <i className="fa-solid fa-basket-shopping" />
      </div>
      <div className={stylesBasket.basketEmptyBtnLink}>
        <Link to="/"><button type="button" className={stylesBasket.basketEmptyBtn}>На главную</button></Link>
      </div>
    </div>
  )
}
