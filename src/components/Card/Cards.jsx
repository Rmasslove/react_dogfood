import { useNavigate } from 'react-router-dom' // Импорт компонента
import stylesCard from './card.module.scss' // Импорт компонента стилей
import { Cardtags } from './Cardtags' // Импорт компонента

export function Cards({
  name, pictures, wight, price, discount, tags, _id,
}) { // Компонент отрисовки одной карточки c {props}
  const discountFun = () => { // Функция считающая скидку на товар
    const result = Math.round(price - ((price / 100) * discount)) // Подсчёт и округление скидки
    return result
  }
  const navigate = useNavigate() // Хук из (react-router-dom)
  const cardInfo = () => navigate(`/card/${_id}`) // Функция по клику совершает (navigate) на страницу карточки

  return ( // jsx разметка
    <div className={stylesCard.card} role="presentation" onClick={cardInfo}>
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
