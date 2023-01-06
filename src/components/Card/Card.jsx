import { useEffect, useState } from 'react' // Импорт компонента
import { Link, useParams } from 'react-router-dom' // Импорт компонента
import stylesCard from './card.module.scss' // Импорт компонента стилей

// eslint-disable-next-line no-unused-vars
export function Card({ api, basket, setBasket }) { // Компонет (Card) с инфо по одной карточке
  const { id } = useParams() // Хук из (react-router-dom) для извлечения id карточки
  const [productId, setProductId] = useState([]) // Хук для получения информации об одном товаре
  const [stock, setStock] = useState([]) // Хук для отображения количества по одному товару

  console.log({ stock }) // Служебный вывод для отладки

  useEffect(() => { // Хук для загрузки информации об одном товере
    if (id) { // Если токен есть
      api.getProductId(id) // Метод запроса на получение информации об одном товаре
        .then((res) => res.json()) // ответ в json
        .then((data) => { // ответ в объекте
          if (!data.error && !data.err) { // Проверка на ошибку (если нет - то)
            setProductId(data) // Запись в Хук информации об одном товаре
            setStock(data.stock) // Запись в Хук информации о количестве одного товара
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
    if (stock < localStorage.getItem('stock')) { // Если меньше чем записано изначально в (localStorage)
      setStock(stock + 1) // Увеличиваем на 1
    }
  }

  const stockMinus = () => { // Функция уменьшающая единиц за один товар
    if (stock > 1) { // Если больше чем 1
      setStock(stock - 1) // Уменьшаем на 1
    }
  }

  const likesClick = (Event) => { // Функция для постоновки "лайка"
    console.log('>>>>') // Служебный вывод для отладки
    Event.stopPropagation() // Остановка всплытия события
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
            <div className={stylesCard.stock}>
              <button type="button" onClick={stockMinus}>-</button>
              {stock}
              <button type="button" onClick={stockPlus}>+</button>
            </div>
            <button type="button" className={stylesCard.btn}><span>В корзину</span></button>
          </div>
        </div>
      </div>
      <Link to="/catalog" className={stylesCard.link}>&lt;-- Назад</Link>
    </>
  )
}
