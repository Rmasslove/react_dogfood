import stylesBasket from './basket.module.scss' // Импорт компонента стилей

export function BasketCards({ // Компонента карточки товара в корзине
  id, stockQuantity, name, pictures, discount, price,
}) {
  return ( // jsx разметка
    <div className={stylesBasket.card}>
      <p>{id}</p>
      <p>{stockQuantity}</p>
      <p>{name}</p>
      <p>{price}</p>
      <p>{discount}</p>
      <img src={pictures} alt={name} />
    </div>
  )
}
