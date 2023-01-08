import stylesBasket from './basket.module.scss' // Импорт компонента стилей
import { BasketCards } from './BasketCards' // Импорт компонента

export function Basket({ basket }) { // Компонент корзины
  const getRandom = () => Math.random() * new Date().getMilliseconds() /* Получение случайного
    числа для поля (key) */

  return ( // jsx разметка
    <>
      <div className={stylesBasket.cardsWr}>
        <div className={stylesBasket.cards}>
          {basket.map((el) => (/* Метод мап для отображения нужного количества карточек */
            <BasketCards /* Компонента Card */
              key={getRandom() /* Вызов функции для получения (key) */}
              {...el /* Информация (содержимое) для карточек ввиде props */}
            />
          ))}
        </div>
      </div>
      <div>
        <p>Корзина товаров</p>
      </div>
    </>
  )
}
