import stylesBasket from './basket.module.scss' // Импорт компонента стилей

export function BasketEmpty() { // Компонент пустой корзины
  return ( // jsx разметка
    <>
      <p className={stylesBasket.basketEmpty}>Корзина товаров пуста</p>
      <div className={stylesBasket.basketEmptyI}>
        {' '}
        <i className="fa-solid fa-basket-shopping" />
      </div>
    </>
  )
}
