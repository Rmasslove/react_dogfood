import stylesBasket from './basket.module.scss' // Импорт компонента стилей
import { ReactComponent as Xmark } from '../Search/img/circle-xmark-regular.svg' // Импорт файла (svg) преобразованного в компонент

export function BasketCards({ // Компонента карточки товара в корзине
  id, stockQuantity, name, pictures, discount, price, setBasket, basket, stock,
}) {
  const basketQuantityFn = () => { // Функция удаление товара из корзины заказа
    const newArrBasket = basket.filter((el) => el.id !== id)
    setBasket(newArrBasket) // Запись в Хук массива без товара по Id
    const strBasket = JSON.stringify(newArrBasket) // Сущность для записи в (localStorage)
    localStorage.setItem('Basket', strBasket) // Метод записи в (localStorage)
  }

  const discountFun = () => { // Функция считающая скидку на товар
    if (discount > 0) { // если есть скидка то...
      const result = Math.round(price - (
        (price / 100) * discount)) // Подсчёт и округление скидки
      return result // возвращаем цену со скидкой
    }
    return price // возвращаем цену без скидки
  }

  const stockPlus = () => { // Функция увеличивающая единиц за один товар в корзине
    const strData = JSON.stringify(stock) // Сущность (stock) для записи в (localStorage)
    localStorage.setItem('stock', strData) // Метод записи в (localStorage)
    const modifiedArrBasket = basket.map((el) => { // Ищем товар в массиве
      if (el.id === id) { // если id совпадают
        if (stockQuantity < localStorage.getItem('stock')) { // Если меньше чем записано изначально в (localStorage)
          return { // Меняем количество товаров + 1
            ...el,
            stockQuantity: stockQuantity + 1,
          }
        }
      } return el
    })
    setBasket(modifiedArrBasket) // Добавляем товар в Хук корзины
    const strBasket = JSON.stringify(modifiedArrBasket) // Сущность для записи в (localStorage)
    localStorage.setItem('Basket', strBasket) // Метод записи в (localStorage)
  }

  const stockMinus = () => { // Функция уменьшающая единиц за один товар в корзине
    const strData = JSON.stringify(stock) // Сущность (stock) для записи в (localStorage)
    localStorage.setItem('stock', strData) // Метод записи в (localStorage)
    const modifiedArrBasket = basket.map((el) => { // Ищем товар в массиве
      if (el.id === id) { // если id совпадают
        if (stockQuantity > 1) { // Если больше чем 1
          return { // Меняем количество товаров - 1
            ...el,
            stockQuantity: stockQuantity - 1,
          }
        }
      } return el
    })
    setBasket(modifiedArrBasket) // Добавляем товар в Хук корзины
    const strBasket = JSON.stringify(modifiedArrBasket) // Сущность для записи в (localStorage)
    localStorage.setItem('Basket', strBasket) // Метод записи в (localStorage)
  }

  const handleSubmit = () => {
    console.log('id', id)
  }

  return ( // jsx разметка
    <div className={stylesBasket.card}>
      <label className={stylesBasket.checkbox} htmlFor={`coding${id}`}>
        <input onClick={handleSubmit} className={stylesBasket.input} type="checkbox" id={`coding${id}`} /* defaultChecked */ />
        <p className={stylesBasket.name}>{name}</p>
      </label>
      <div className={stylesBasket.stock}>
        <button type="button" onClick={stockMinus}>-</button>
        {stockQuantity}
        <button type="button" onClick={stockPlus}>+</button>
      </div>
      <p>шт.</p>
      <p>
        {discountFun()/* Вызов функции для расчёта скидки */}
        {' '}
        &#8381;
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
