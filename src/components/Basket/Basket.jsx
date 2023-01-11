import { useEffect, useState } from 'react'
import stylesBasket from './basket.module.scss' // Импорт компонента стилей
import { BasketCards } from './BasketCards' // Импорт компонента

export function Basket({ basket, setBasket }) { // Компонент корзины
  // eslint-disable-next-line no-unused-vars
  const [totalQuantityGoods, setTotalQuantityGoods] = useState([]) // Хук кол. едениц общего заказа
  const [fullCalculation, setFullCalculation] = useState([]) // Хук для подсчёта общего заказа

  useEffect(() => { // Хук для расчёта кол. едениц общего заказа
    const totalQuantityGoodsFn = () => basket.reduce((sum, el) => sum + el.stockQuantity, 0)
    setTotalQuantityGoods(totalQuantityGoodsFn) // Считаем сумму и записываем в Хук
  }, [basket])

  useEffect(() => { // Хук для расчёта итоговой суммы заказа
    const fullCalculationFn = () => basket.reduce((sum, el) => { // Функц. расчёта итог.суммы заказа
      if (el.discount > 0) { // Если есть скидка то...
        const result = Math.round(el.price - (
          (el.price / 100) * el.discount)) // Подсчёт и округление скидки
        return sum + result * el.stockQuantity // возвращаем сумму со скидкой
      }
      return sum + el.price * el.stockQuantity // возвращаем сумму без скидки
    }, 0)
    setFullCalculation(fullCalculationFn) // Записываем результат в Хук
  }, [basket])

  return ( // jsx разметка
    <div className={stylesBasket.cardsWr}>
      <div className={stylesBasket.cards}>
        {basket.map((el) => (/* Метод мап для отображения нужного количества карточек */
          <BasketCards /* Компонента Card */
            key={crypto.randomUUID() /* Вызов функции для получения (key) */}
            setBasket={setBasket}
            basket={basket}
            {...el /* Информация (содержимое) для карточек ввиде props */}
          />
        ))}
      </div>
      <div>
        <div className={stylesBasket.arrange}>
          <h2>Ваш заказ</h2>
          <p className={stylesBasket.totalQuantityGoods}>
            Итого:
            {' '}
            {totalQuantityGoods/* Итоговая стоимость заказа */}
            {' '}
            ед. товара
          </p>
          <p className={stylesBasket.fullCalculation}>
            Всего на сумму:
            {' '}
            {fullCalculation/* Итоговая стоимость заказа */}
            {' '}
            pуб.
          </p>
          <button type="button" className={stylesBasket.btn}><span>Оформить заказ</span></button>
        </div>
      </div>
    </div>
  )
}
