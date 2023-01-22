import { useNavigate } from 'react-router-dom' // Импорт компонента
import stylesCard from './cards.module.scss' // Импорт компонента стилей
import { Cardtags } from './Cardtags' // Импорт компонента

export function Cards({
  name, pictures, wight, price, discount, tags, _id,
  likes, userDetails, dataProducts, api, setReload,
}) { // Компонент отрисовки одной карточки c {props}
  const navigate = useNavigate() // Хук из (react-router-dom)
  const cardInfo = () => navigate(`/card/${_id}`) // Функция по клику совершает (navigate) на страницу карточки

  const discountFun = () => { // Функция считающая скидку на товар
    const result = Math.round(price - ((price / 100) * discount)) // Подсчёт и округление скидки
    return result
  }
  // eslint-disable-next-line no-underscore-dangle
  const isLike = likes.filter((el) => el === userDetails._id) // Провер. наличия лайка на товарах

  const likesClick = (Event) => { // Функция для постоновки "лайка"
    Event.stopPropagation() // Остановка всплытия события
    Event.preventDefault() // Остановка для события

    // eslint-disable-next-line no-underscore-dangle
    const arr = dataProducts.find((el) => el._id === _id) // Получаем товар из массива товаров
    if (arr !== undefined) { // проверяем что массив загрузился
      // eslint-disable-next-line no-underscore-dangle
      const islike = arr.likes.includes(userDetails._id) // Проверяем наличие лайка на товаре

      if (islike) { // Если лайк есть то...
        api.delLike(_id) // Метод удаления лайка с товара
          .then((res) => res.json()) // ответ в json
          .then((data) => { // ответ в объекте
            if (!data.error && !data.err) { // Проверка на ошибку (если нет - то)
            } else {
              // eslint-disable-next-line no-alert
              alert(data.message) // Вывод информации об ошибке
            }
          })
      } else { // Если лайка нет то...
        api.putLike(_id) // Метод постоновки лайка на товар
          .then((res) => res.json()) // ответ в json
          .then((data) => { // ответ в объекте
            if (!data.error && !data.err) { // Проверка на ошибку (если нет - то)
            } else {
              // eslint-disable-next-line no-alert
              alert(data.message) // Вывод информации об ошибке
            }
          })
      }
    }
    setReload(crypto.randomUUID()) // Вызывает перезагрузку товаров
  }

  return ( // jsx разметка
    <div className={stylesCard.card} role="presentation" onClick={cardInfo}>
      <div>
        <img src={pictures} alt={name} />
      </div>
      <Cardtags tags={tags} /* Компонент (Cardtags) с пропсом *//>
      <span className={isLike.length ? stylesCard.heartTrue : stylesCard.heartFalse} role="presentation" onClick={likesClick}>
        <i className="fa-solid fa-heart" /* иконка с сердцем *//>
      </span>
      <div className={stylesCard.text}>
        <s className={stylesCard.discount}>{discount > 0 ? `${price} P` : '' }</s>
        <h4 className={discount ? stylesCard.priceDiscount : stylesCard.price}>{discount > 0 ? `${discountFun()/* Вызов функции для расчёта скидки */} P` : `${price} P` /* ценa и выбор стилей для скидки */}</h4>
        <p className={stylesCard.wight}>{wight /* {props} размер упаковки (шт, гр) */}</p>
        <h5 className={stylesCard.name}>{name /* {props} с текстом для карточки */}</h5>
      </div>
    </div>
  )
}
