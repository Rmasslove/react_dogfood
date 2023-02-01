import stylesCard from './card.module.scss' // Импорт компонента стилей

export function Cardtags({ tags, discount }) { // Компонент вывода (tags) с {props}
  const tagsFun = () => ( // Функция собирающая (tags) и присваивающая стили
    tags.map((el) => (el === 'new'
      ? (<span key={crypto.randomUUID()} className={stylesCard.new}>{el}</span>)
      : (<span key={crypto.randomUUID()} className={stylesCard.other}>{el}</span>)
    ))
  )

  const discountTagsFn = () => {
    if (discount > 0) {
      return (
        <span className={stylesCard.discountTg}>
          {discount}
          %
        </span>
      )
    }
    return null
  }

  return ( // jsx разметка
    <div className={stylesCard.tags}>
      {tagsFun(crypto.randomUUID()) /* Элемент (tags) вызывающий функцию (tagsFun) */}
      {discountTagsFn()}
    </div>

  )
}
