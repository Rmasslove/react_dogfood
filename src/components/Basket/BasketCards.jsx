import stylesBasket from './basket.module.scss' // Импорт компонента стилей
import { ReactComponent as Xmark } from '../Search/img/circle-xmark-regular.svg' // Импорт файла (svg) преобразованного в компонент

export function BasketCards({ // Компонента карточки товара в корзине
  id, stockQuantity, name, pictures, discount, price, setBasket, basket,
}) {
  const basketQuantityFn = () => { // Функция удаление товара из корзины заказа
    setBasket(() => basket.filter((el) => el.id !== id)) // Запись в Хук массива без товара по Id
  }

  const discountFun = () => { // Функция считающая скидку на товар
    if (discount > 0) { // если есть скидка то...
      const result = Math.round(price - (
        (price / 100) * discount)) // Подсчёт и округление скидки
      return result // возвращаем цену со скидкой
    }
    return price // возвращаем цену без скидки
  }

  const handleSubmit = () => {
    console.log('id', id)
  }

  return ( // jsx разметка
    <div className={stylesBasket.card}>
      <label className={stylesBasket.checkbox} htmlFor={`coding${id}`}>
        <input onClick={handleSubmit} className={stylesBasket.input} type="checkbox" id={`coding${id}`} defaultChecked />
        <p className={stylesBasket.name}>{name}</p>
      </label>
      <p>
        {stockQuantity}
        {' '}
        шт.
      </p>
      <p>
        {discountFun()/* Вызов функции для расчёта скидки */}
        {' '}
        р
      </p>
      <img src={pictures} alt={name} />
      <div className={stylesBasket.deletionWr}>
        <button type="button" onClick={basketQuantityFn/* Удаление заказа из корзины */} className={stylesBasket.deletion}>
          <Xmark />
          {' '}
        </button>
      </div>
    </div>
  )
}
