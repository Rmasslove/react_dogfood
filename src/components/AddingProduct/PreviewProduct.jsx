import stylesAddingProduct from './addingProduct.module.scss' // Импорт компонента стилей

export function PreviewProduct({ dataPreview }) { // Компонент отрисовки одной карточки c {props}
  const discountFun = () => { // Функция считающая скидку на товар
    if (dataPreview.price) { // Если значение есть...
      if (dataPreview.discount > 0) { // Если скидка есть...
        const result = Math.round(dataPreview.price
          - ((dataPreview.price / 100) * dataPreview.discount)) // Подсчёт и округление скидки
        return (`${result} P`) // Возвращаем результат со скидкой
      }
      return (`${dataPreview.price} P`) // Возвращаем цену без скидки
    }
    return ''
  }

  return ( // jsx разметка
    <div className={dataPreview.length !== 0
      ? stylesAddingProduct.card : stylesAddingProduct.cardFalse}
    >
      <div>
        <img src={dataPreview.pictures} alt={dataPreview.name} />
      </div>
      <div className={stylesAddingProduct.text}>
        <s className={stylesAddingProduct.discount}>{dataPreview.discount > 0 ? `${dataPreview.price} P` : '' }</s>
        <h4 className={dataPreview.discount
          ? stylesAddingProduct.priceDiscount : stylesAddingProduct.price}
        >
          {discountFun()/* Вызов функции для расчёта скидки */}
        </h4>
        <p className={stylesAddingProduct.wight}>{dataPreview.wight}</p>
        {dataPreview.stock && (
        <p className={stylesAddingProduct.stock}>
          В наличии
          {' '}
          {dataPreview.stock}
          {' '}
          шт.
        </p>
        )}
        <h5 className={stylesAddingProduct.name}>{dataPreview.name}</h5>
      </div>
      <div><p>{dataPreview.description}</p></div>
    </div>
  )
}
