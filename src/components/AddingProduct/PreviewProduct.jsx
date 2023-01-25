import stylesAddingProduct from './addingProduct.module.scss' // Импорт компонента стилей

export function PreviewProduct({
  name, pictures, wight, price, discount,
}) { // Компонент отрисовки одной карточки c {props}
  const discountFun = () => { // Функция считающая скидку на товар
    if (price) {
      if (discount > 0) {
        const result = Math.round(price - ((price / 100) * discount)) // Подсчёт и округление скидки
        return (result, 'P')
      }
      return (price, 'P')
    }
    return ''
  }

  return ( // jsx разметка
    <div className={stylesAddingProduct.card}>
      <div>
        <img src={pictures} alt={name} />
      </div>
      <div className={stylesAddingProduct.text}>
        <s className={stylesAddingProduct.discount}>{discount > 0 ? `${price} P` : '' }</s>
        <h4 className={discount ? stylesAddingProduct.priceDiscount : stylesAddingProduct.price}>
          {discountFun()/* Вызов функции для расчёта скидки */}
        </h4>
        <p className={stylesAddingProduct.wight}>{wight /* {props} размер упаковки (шт, гр) */}</p>
        <h5 className={stylesAddingProduct.name}>{name /* {props} с текстом для карточки */}</h5>
      </div>
    </div>
  )
}
