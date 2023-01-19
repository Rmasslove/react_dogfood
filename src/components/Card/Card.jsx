import { useEffect, useState } from 'react' // Импорт компонента
import { Link, useNavigate, useParams } from 'react-router-dom' // Импорт компонента
import { useDispatch, useSelector } from 'react-redux' // Импорт компонента
import { getBasketSliceSelector, newArrBasketRedux } from '../../redux/slices/basketSlice' // Импорт компонента
import stylesCard from './card.module.scss' // Импорт компонента стилей

export function Card({ api }) { // Компонет (Card) с инфо по одной карточке
  const { id } = useParams() // Хук из (react-router-dom) для извлечения id карточки
  const [productId, setProductId] = useState([]) // Хук для получения информации об одном товаре
  const [stockQuantity, setStockQuantity] = useState(1) // Хук количества по одному товару
  const navigate = useNavigate() // Хук из (react-router-dom)
  const dispatch = useDispatch() // Хук из (Redux)
  const basketRedux = useSelector(getBasketSliceSelector) // Хук из (Redux) с массивом корзины

  useEffect(() => { // Хук для загрузки информации об одном товере
    if (id) { // Если токен есть
      api.getProductId(id) // Метод запроса на получение информации об одном товаре
        .then((res) => res.json()) // ответ в json
        .then((data) => { // ответ в объекте
          if (!data.error && !data.err) { // Проверка на ошибку (если нет - то)
            setProductId(data) // Запись в Хук информации об одном товаре
            const strData = JSON.stringify(data.stock) // Сущность для записи в (localStorage)
            localStorage.setItem('stock', strData) // Метод записи в (localStorage)
          } else {
          // eslint-disable-next-line no-alert
            alert(data.message) // Вывод информации об ошибке
          }
        })
    }
  }, [])

  const discountFun = () => { // Функция считающая скидку на товар
    const result = Math.round(productId.price - (
      (productId.price / 100) * productId.discount)) // Подсчёт и округление скидки
    return result
  }

  const stockPlus = () => { // Функция увеличивающая единиц за один товар
    if (stockQuantity < localStorage.getItem('stock')) { // Если меньше чем записано изначально в (localStorage)
      setStockQuantity(stockQuantity + 1) // Увеличиваем на 1
    }
  }

  const stockMinus = () => { // Функция уменьшающая единиц за один товар
    if (stockQuantity > 1) { // Если больше чем 1
      setStockQuantity(stockQuantity - 1) // Уменьшаем на 1
    }
  }

  const basketQuantity = () => { // Функция добавления товара в корзину
    navigate('/basket') // Перенаправляем на страницу корзины с товарами
    const basketCard = { // Карточка товара
      id,
      stockQuantity,
      name: productId.name,
      pictures: productId.pictures,
      discount: productId.discount,
      price: productId.price,
      stock: productId.stock,
      isChecked: false,
    }
    const arrBasket = basketRedux.filter((el) => el.id.includes(id)) // Проверка товара в корзине
    if (arrBasket.length === 0) { // Если такого товара нет то...
      const newArrBasket = basketRedux.concat(basketCard) // Добавляем товар к массиву из корзины
      dispatch(newArrBasketRedux(newArrBasket)) // Добавляем товар в Хук корзины
    } else { // Иначе если товар уже есть в корзине
      const modifiedArrBasket = basketRedux.map((el) => { // Ищем товар в массиве
        if (el.id === id) { // если id совпадают
          return { // Меняем количество товаров
            ...el,
            stockQuantity,
          }
        }
        return el // Или возвращаем товар
      })
      dispatch(newArrBasketRedux(modifiedArrBasket)) // Добавляем товар в Хук корзины
    }
  }

  const likesClick = (Event) => { // Функция для постоновки "лайка"
    console.log('>>>>') // Служебный вывод для отладки
    Event.stopPropagation() // Остановка всплытия события
    Event.preventDefault()
  }

  return ( // jsx разметка
    <>
      <span className={stylesCard.link}>Страница товара --&gt; </span>
      <Link to="/catalog"><span className={stylesCard.link}/* Линк для перехода на страницу каталога */>Перейти в каталог товаров</span></Link>
      <div className={stylesCard.Wr}>
        <div className={stylesCard.imgWr}>
          <img src={productId.pictures} alt={productId.name} />
          <span className={stylesCard.heart} role="presentation" onClick={likesClick}>
            <i className="fa-solid fa-heart" /* иконка с сердцем *//>
          </span>
        </div>
        <div className={stylesCard.text}>
          <h3 className={stylesCard.name}>{productId.name /* {props} с текстом для карточки */}</h3>
          <s className={stylesCard.discount}>{productId.discount > 0 ? `${productId.price} P` : '' }</s>
          <h4 className={productId.discount ? stylesCard.priceDiscount : stylesCard.price}>{productId.discount > 0 ? `${discountFun()/* Вызов функции для расчёта скидки */} P` : `${productId.price} P` /* ценa и выбор стилей для скидки */}</h4>
          <p className={stylesCard.wight}>{productId.wight /* {props} размер уп. (шт, гр) */}</p>
          <div className={stylesCard.btnWr}>
            <p className={stylesCard.stockP}/* Товаров в наличии */>
              В наличии
              {' '}
              {productId.stock}
              {' '}
              шт.
            </p>
            <div className={stylesCard.stock}>
              <button type="button" onClick={stockMinus}>-</button>
              {stockQuantity}
              <button type="button" onClick={stockPlus}>+</button>
            </div>
            <p className={stylesCard.totalPrice}/* Итоговая сумма */>
              Сумма
              {' '}
              {stockQuantity * (productId.discount > 0 ? discountFun() : productId.price)}
              {' '}
              руб.
            </p>
            <button type="button" onClick={basketQuantity} className={stylesCard.btn}><span>В корзину</span></button>
          </div>
        </div>
      </div>
      <Link to="/catalog" className={stylesCard.link}>&lt;-- Назад</Link>
    </>
  )
}
