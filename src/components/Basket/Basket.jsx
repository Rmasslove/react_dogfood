import { useEffect, useState } from 'react' // Импорт компонента
import stylesBasket from './basket.module.scss' // Импорт компонента стилей
import { BasketCards } from './BasketCards' // Импорт компонента

export function Basket({ basket, setBasket }) { // Компонент корзины
  const [totalQuantityGoods, setTotalQuantityGoods] = useState([]) // Хук кол. едениц общего заказа
  const [fullCalculation, setFullCalculation] = useState([]) // Хук для подсчёта общего заказа
  const [checkboxSelectAll, setCheckboxSelectAll] = useState(false)

  useEffect(() => { // Хук для расчёта кол. едениц общего заказа
    const filterArrBasket = basket.filter((el) => el.isChecked === true) // выбор отмеченых товаров
    const resultArrBasket = filterArrBasket.reduce((sum, el) => sum + el.stockQuantity, 0) // сумма
    setTotalQuantityGoods(resultArrBasket) // Считаем сумму и записываем в Хук
  }, [basket])

  useEffect(() => { // Хук для расчёта итоговой суммы заказа
    const filterArrBasket = basket.filter((el) => el.isChecked === true) // выбор отмеченых товаров
    const resultArrBasket = filterArrBasket.reduce((sum, el) => { // Расчёт итоговой суммы заказа
      if (el.discount > 0) { // Если есть скидка то...
        const result = Math.round(el.price - (
          (el.price / 100) * el.discount)) // Подсчёт и округление скидки
        return sum + result * el.stockQuantity // возвращаем сумму со скидкой
      }
      return sum + el.price * el.stockQuantity // возвращаем сумму без скидки
    }, 0)
    setFullCalculation(resultArrBasket) // Записываем результат в Хук
  }, [basket])

  const handleChangeSelectAll = (Event) => { // выбор всего заказа в корзине
    if (Event.target.checked) { // Если чекбокс true
      setCheckboxSelectAll(true) // Переводим Хук (Checkbox) в состояние (true)
      const modifiedArrBasket = basket.map((el) => ({ // Создаем новый массив
        ...el,
        isChecked: true, // Меняем значение на  true
      }))
      setBasket(modifiedArrBasket) // Записываем результат в Хук
      const strBasket = JSON.stringify(modifiedArrBasket) // Сущность для записи в (localStorage)
      localStorage.setItem('Basket', strBasket) // Метод записи в (localStorage)
    } else { // Если чекбокс false
      setCheckboxSelectAll(false) // Переводим Хук (Checkbox) в состояние (false)
      const modifiedArrBasket = basket.map((el) => ({ // Создаем новый массив
        ...el,
        isChecked: false, // Меняем значение на (false)
      }))
      setBasket(modifiedArrBasket) // Записываем результат в Хук
      const strBasket = JSON.stringify(modifiedArrBasket) // Сущность для записи в (localStorage)
      localStorage.setItem('Basket', strBasket) // Метод записи в (localStorage)
    }
  }

  const basketDeletAll = () => { // Удаление выбранных товаров
    if (checkboxSelectAll) { // Если чекбокс (true)
      const newArrBasket = basket.filter((el) => el.isChecked === false) // Массив без товаров
      setBasket(newArrBasket) // Запись в Хук массива без товара по Id
      const strBasket = JSON.stringify(newArrBasket) // Сущность для записи в (localStorage)
      localStorage.setItem('Basket', strBasket) // Метод записи в (localStorage)
      setCheckboxSelectAll(false) // Переводим Хук (Checkbox) в состояние (false)
    }
  }

  return ( // jsx разметка
    <div>
      <div className={stylesBasket.selectAllWr}>
        <div className={stylesBasket.selectAll}>
          <label className={stylesBasket.checkboxSelectAll} htmlFor="coding">
            <input onChange={handleChangeSelectAll/* выбор всего заказа в корзине */} className={stylesBasket.input} type="checkbox" id="coding" checked={checkboxSelectAll} />
            <p className={stylesBasket.selectAllText}>Выбрать все</p>
          </label>
          <div className={stylesBasket.basketDeletAll}>
            <button type="button" onClick={basketDeletAll/* Удаление заказа из корзины */} className={stylesBasket.deletionAllBtn}>
              Удалить выбранные
            </button>
          </div>
        </div>
      </div>
      <div className={stylesBasket.cardsWr}>
        <div>
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
        </div>
        <div>
          <div className={stylesBasket.arrange}>
            <h2>Ваш заказ</h2>
            <p className={stylesBasket.totalQuantityGoods}>
              Итого:
              {' '}
              {totalQuantityGoods/* Итоговая количество ед. товара в заказе */}
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
    </div>
  )
}
