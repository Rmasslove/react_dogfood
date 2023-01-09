import stylesBasket from './basket.module.scss' // Импорт компонента стилей
import { BasketCards } from './BasketCards' // Импорт компонента

export function Basket({ basket, setBasket }) { // Компонент корзины
  const getRandom = () => Math.random() * new Date().getMilliseconds() /* Получение случайного
    числа для поля (key) */

  const fullСalculation = () => basket.reduce((sum, el) => { // Функция расчёта итог. суммы заказа
    if (el.discount > 0) { // Если есть скидка то...
      const result = Math.round(el.price - (
        (el.price / 100) * el.discount)) // Подсчёт и округление скидки
      return sum + result * el.stockQuantity // возвращаем сумму со скидкой
    }
    return sum + el.price * el.stockQuantity // возвращаем сумму без скидки
  }, 0)

  return ( // jsx разметка
    <div className={stylesBasket.cardsWr}>
      <div className={stylesBasket.cards}>
        {basket.map((el) => (/* Метод мап для отображения нужного количества карточек */
          <BasketCards /* Компонента Card */
            key={getRandom() /* Вызов функции для получения (key) */}
            setBasket={setBasket}
            basket={basket}
            {...el /* Информация (содержимое) для карточек ввиде props */}
          />
        ))}
      </div>
      <div className={stylesBasket.arrange}>
        <h3>Ваш заказ</h3>
        <p className={stylesBasket.fullСalculation}>
          Всего
          {' '}
          {fullСalculation()/* Итоговая стоимость заказа */}
          {' '}
          p
        </p>
      </div>
    </div>
  )
}
