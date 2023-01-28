import { useDispatch, useSelector } from 'react-redux' // Импорт компонента
import { getBasketSliceSelector, newArrBasketRedux } from '../../redux/slices/basketSlice' // Импорт компонента
import stylesBasket from './basket.module.scss' // Импорт компонента стилей
import { ReactComponent as Xmark } from '../Search/img/circle-xmark-regular.svg' // Импорт файла (svg) преобразованного в компонент

export function BasketCards({ // Компонента карточки товара в корзине
  id, stockQuantity, name, pictures, discount, price, stock, isChecked,
}) {
  const dispatch = useDispatch() // Хук из (Redux)
  const basketRedux = useSelector(getBasketSliceSelector) // Хук из (Redux) с массивом корзины

  const basketQuantityFn = () => { // Функция удаление товара из корзины заказа
    const newArrBasket = basketRedux.filter((el) => el.id !== id)
    dispatch(newArrBasketRedux(newArrBasket))
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
    const modifiedArrBasket = basketRedux.map((el) => { // Ищем товар в массиве
      if (el.id === id) { // если id совпадают
        if (stockQuantity < stock) { // Если меньше чем на складе
          return { // Меняем количество товаров + 1
            ...el,
            stockQuantity: stockQuantity + 1,
          }
        }
      } return el
    })
    dispatch(newArrBasketRedux(modifiedArrBasket))
  }

  const stockMinus = () => { // Функция уменьшающая единиц за один товар в корзине
    const modifiedArrBasket = basketRedux.map((el) => { // Ищем товар в массиве
      if (el.id === id) { // если id совпадают
        if (stockQuantity > 1) { // Если больше чем 1
          return { // Меняем количество товаров - 1
            ...el,
            stockQuantity: stockQuantity - 1,
          }
        }
      } return el
    })
    dispatch(newArrBasketRedux(modifiedArrBasket))
  }

  const handleChange = () => { // Функция смены состояния для (checkbox)
    const modifiedArrBasket = basketRedux.map((el) => { // Создаём новый массив из (basket)
      if (el.id === id) { // Если (id) совпадает
        return {
          ...el, // Разварачиваем объект
          isChecked: !isChecked, // Меняем (checked)
        }
      } return el
    })
    dispatch(newArrBasketRedux(modifiedArrBasket))
  }

  const stockMinusStyle = () => { // Функция отображения стилей для (-)
    if (stockQuantity === 1) { // Если количество равно 1 то...
      return stylesBasket.stockStop
    }
    return stylesBasket.stockStopFalse
  }

  const stockPlusStyle = () => { // Функция отображения стилей для (-)
    if (stockQuantity === stock) { // Если количество равно количеству на складе то...
      return stylesBasket.stockStop
    }
    return stylesBasket.stockStopFalse
  }

  return ( // jsx разметка
    <div className={stylesBasket.card}>
      <label className={stylesBasket.checkbox} htmlFor={`coding${id}`}>
        <input onChange={handleChange} className={stylesBasket.input} type="checkbox" id={`coding${id}`} checked={isChecked}/* defaultChecked */ />
        <p className={stylesBasket.name}>{name}</p>
      </label>
      <div className={stylesBasket.stock}>
        <button type="button" onClick={stockMinus} className={stockMinusStyle()}>-</button>
        {stockQuantity}
        <button type="button" onClick={stockPlus} className={stockPlusStyle()}>+</button>
      </div>
      <p>шт.</p>
      <p>
        {discountFun()/* Вызов функции для расчёта скидки */}
        {' '}
        &#8381;
      </p>
      <div>
        <img className={stylesBasket.img} src={pictures} alt={name} />
      </div>
      <div className={stylesBasket.deletionWr}>
        <button type="button" onClick={basketQuantityFn/* Удаление заказа из корзины */} className={stylesBasket.deletion}>
          <Xmark />
          {' '}
        </button>
      </div>
    </div>
  )
}
