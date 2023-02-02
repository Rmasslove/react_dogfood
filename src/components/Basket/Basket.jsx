import { useEffect, useState } from 'react' // Импорт компонента
import { useDispatch, useSelector } from 'react-redux' // Импорт компонента
import { toast } from 'react-toastify' // Импорт компонента
import { newArrBasketIdsRedux } from '../../redux/slices/basketIdsSlice'
import { getBasketSliceSelector, newArrBasketRedux } from '../../redux/slices/basketSlice' // Импорт компонента
import stylesBasket from './basket.module.scss' // Импорт компонента стилей
import { BasketCards } from './BasketCards' // Импорт компонента

export function Basket({ api }) { // Компонент корзины
  const [totalQuantityGoods, setTotalQuantityGoods] = useState([]) // Хук кол. едениц общего заказа
  const [fullCalculation, setFullCalculation] = useState([]) // Хук для подсчёта общего заказа
  const [checkboxSelectAll, setCheckboxSelectAll] = useState(false) // Хук для чекбокса выбрать всё
  const dispatch = useDispatch() // Хук из (Redux)
  const basketRedux = useSelector(getBasketSliceSelector) // Хук из (Redux) с массивом корзины

  useEffect(() => { // Хук для загрузки информации о товарах по id
    api.getProductIds(basketRedux.map((product) => product.id)) // Метод запрос на получение товаров
      .then((data) => { // ответ в объекте
        if (!data.error && !data.err) { // Проверка на ошибку (если нет - то)
          dispatch(newArrBasketIdsRedux(data)) // Добавляем товар в срез (redux) корзины
        } else {
          toast.error(data) // Вывод информации об ошибке
          toast.error(data.message) // Вывод информации об ошибке
        }
      })
  }, [])

  useEffect(() => { // Хук для расчёта кол. едениц общего заказа
    const filterArrBasket = basketRedux.filter((el) => el.isChecked === true) // выбр отмеченых тов.
    const resultArrBasket = filterArrBasket.reduce((sum, el) => sum + el.stockQuantity, 0) // сумма
    setTotalQuantityGoods(resultArrBasket) // Считаем сумму и записываем в Хук
  }, [basketRedux])

  useEffect(() => { // Хук для расчёта итоговой суммы заказа
    const filterArrBasket = basketRedux.filter((el) => el.isChecked === true) // выбр отмеченых тов.
    const resultArrBasket = filterArrBasket.reduce((sum, el) => { // Расчёт итоговой суммы заказа
      if (el.discount > 0) { // Если есть скидка то...
        const result = Math.round(el.price - (
          (el.price / 100) * el.discount)) // Подсчёт и округление скидки
        return sum + result * el.stockQuantity // возвращаем сумму со скидкой
      }
      return sum + el.price * el.stockQuantity // возвращаем сумму без скидки
    }, 0)
    setFullCalculation(resultArrBasket) // Записываем результат в Хук
  }, [basketRedux])

  const handleChangeSelectAll = (Event) => { // выбор всего заказа в корзине
    if (Event.target.checked) { // Если чекбокс true
      setCheckboxSelectAll(true) // Переводим Хук (Checkbox) в состояние (true)
      const modifiedArrBasket = basketRedux.map((el) => ({ // Создаем новый массив
        ...el,
        isChecked: true, // Меняем значение на  true
      }))
      dispatch(newArrBasketRedux(modifiedArrBasket)) // Делаем запись в корзину в (redux)
    } else { // Если чекбокс false
      setCheckboxSelectAll(false) // Переводим Хук (Checkbox) в состояние (false)
      const modifiedArrBasket = basketRedux.map((el) => ({ // Создаем новый массив
        ...el,
        isChecked: false, // Меняем значение на (false)
      }))
      dispatch(newArrBasketRedux(modifiedArrBasket)) // Делаем запись в корзину в (redux)
    }
  }

  const basketDeletAll = () => { // Удаление выбранных товаров
    if (checkboxSelectAll) { // Если чекбокс (true)
      const newArrBasket = basketRedux.filter((el) => el.isChecked === false) // Массив без товаров
      dispatch(newArrBasketRedux(newArrBasket)) // Делаем запись в корзину в (redux)
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
            {basketRedux.map((el) => (/* Метод мап для отображения нужного количества карточек */
              <BasketCards /* Компонента Card */
                key={crypto.randomUUID() /* Вызов функции для получения (key) */}
                basketRedux={basketRedux}
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
