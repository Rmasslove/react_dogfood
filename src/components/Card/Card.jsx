import stylesCard from './card.module.scss' // Импорт компонента стилей
import { Cardtags } from './Cardtags' // Импорт компонента

export function Card({
  name, pictures, wight, price, discount, tags,
}) { // Компонент отрисовки одной карточки c {props}
  const discountFun = () => { // Функция считающая скидку на товар
    const result = Math.round(price - ((price / 100) * discount)) // Подсчёт и округление скидки
    return result
  }

  return ( // jsx разметка
    <div className={stylesCard.card}>
      <div className={stylesCard.imgWr}>
        <img src={pictures} alt={name} />
      </div>
      <Cardtags tags={tags} /* Компонент (Cardtags) с пропсом *//>
      <span className={stylesCard.heart}>
        <i className="fa-solid fa-heart" /* иконка с сердцем *//>
      </span>
      <div className={stylesCard.text}>
        <s className={stylesCard.discount}>{discount > 0 ? `${discountFun()/* Вызов функции для расчёта скидки */} P` : '' }</s>
        <p className={discount ? stylesCard.priceDiscount : stylesCard.price}>{`${price} P` /* {props} с ценой и выбор стилей для скидки */}</p>
        <p className={stylesCard.wight}>{wight /* {props} размер упаковки (шт, гр) */}</p>
        <h5 className={stylesCard.name}>{name /* {props} с текстом для карточки */}</h5>
      </div>
      <div className={stylesCard.btnWr}>
        <button type="button" className={stylesCard.btn}><span>В корзину</span></button>
      </div>
    </div>
  )
}
