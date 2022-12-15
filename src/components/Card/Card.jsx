import stylesCard from './card.module.scss' // Импорт компонента стилей
import { Cardtags } from './Cardtags'

export function Card({
  name, pictures, wight, price, discount, tags,
}) { // Компонент Card c {props}
  // const getRandom = () => Math.random() * new Date().getMilliseconds()
  /* Получение случайного числа для поля (key) */
  const discountFun = () => {
    const result = Math.round(price - ((price / 100) * discount))
    return result
  }
  /* const tagsFun = () => (
    tags.map((el) => (el === 'new'
      ? (<span className={stylesCard.new}>{el}</span>)
      : (<span className={stylesCard.other}>{el}</span>)
    ))
  ) */

  return ( // jsx разметка
    <div className={stylesCard.card}>
      <div className={stylesCard.imgWr}>
        <img src={pictures} alt="name" />
      </div>
      <Cardtags tags={tags} />
      <span className={stylesCard.heart}>
        <i className="fa-regular fa-heart" /* иконка с сердцем *//>
      </span>
      <div className={stylesCard.text}>
        <s className={stylesCard.discount}>{discount > 0 ? `${discountFun()} P` : '' }</s>
        <p className={stylesCard.price}>{`${price} P`}</p>
        <p className={stylesCard.wight}>{wight}</p>
        <h5 className={stylesCard.name}>{name /* {props} с текстом для карточки */}</h5>
      </div>
      <div className={stylesCard.btnWr}>
        <button type="button" className={stylesCard.btn}><span>В корзину</span></button>
      </div>
    </div>
  )
}
