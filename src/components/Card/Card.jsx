import { useEffect, useState } from 'react' // Импорт компонента
import { Link, useNavigate, useParams } from 'react-router-dom' // Импорт компонента
import { useDispatch, useSelector } from 'react-redux' // Импорт компонента
import { ToastContainer, toast } from 'react-toastify'
import { getBasketSliceSelector, newArrBasketRedux } from '../../redux/slices/basketSlice' // Импорт компонента
import stylesCard from './card.module.scss' // Импорт компонента стилей
import 'react-toastify/dist/ReactToastify.css'
import { Loader } from '../Loader/Loader'
import { CardReviews } from './CardReviews'

export function Card({
  api, dataProducts, userDetails, setReload,
}) { // Компонет с инфо по одной карточке
  const { id } = useParams() // Хук из (react-router-dom) для извлечения id карточки
  const [productId, setProductId] = useState([]) // Хук для получения информации об одном товаре
  const [stockQuantity, setStockQuantity] = useState(1) // Хук количества по одному товару
  const [userFlag, setUserFlag] = useState(false) // Хук для флага что товар создан юзером
  const [isLoadingProductId, setIsLoadingProductId] = useState(true) // Хук флага для лоудера
  const [reviewsBlock, setReviewsBlock] = useState(false)

  const navigate = useNavigate() // Хук из (react-router-dom)
  const dispatch = useDispatch() // Хук из (Redux)
  const basketRedux = useSelector(getBasketSliceSelector) // Хук из (Redux) с массивом корзины

  useEffect(() => { // Хук для загрузки информации об одном товере
    if (id) { // Если Id есть
      api.getProductId(id) // Метод запроса на получение информации об одном товаре
        .then((res) => res.json()) // ответ в json
        .then((data) => { // ответ в объекте
          if (!data.error && !data.err) { // Проверка на ошибку (если нет - то)
            setProductId(data) // Запись в Хук информации об одном товаре
          } else if (data.message === 'Нет товара по заданному id') { // Если ошибка 404
            toast.error(data.message) // Вывод информации об ошибке
            navigate('*') // Переход на страницу с сообщением (страница не найдена)
          } else {
            toast.error(data.message) // Вывод информации об ошибке
          }
          setIsLoadingProductId(false) // Меняем значение для лоудера
        })
    }
  }, [])

  const discountFun = () => { // Функция считающая скидку на товар
    const result = Math.round(productId.price - (
      (productId.price / 100) * productId.discount)) // Подсчёт и округление скидки
    return result
  }

  const stockPlus = () => { // Функция увеличивающая единиц за один товар
    if (stockQuantity < productId.stock) { // Если меньше чем на складе
      setStockQuantity(stockQuantity + 1) // Увеличиваем на 1
    }
  }

  const stockMinus = () => { // Функция уменьшающая единиц за один товар
    if (stockQuantity > 1) { // Если больше чем 1
      setStockQuantity(stockQuantity - 1) // Уменьшаем на 1
    }
  }

  const basketQuantity = () => { // Функция добавления товара в корзину
    toast('Товар добавлен в корзину', { autoClose: 1000 }) // Вывод информации
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
      dispatch(newArrBasketRedux(newArrBasket)) // Добавляем товар в срез (redux) корзины
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
      dispatch(newArrBasketRedux(modifiedArrBasket)) // Добавляем товар в срез (redux) корзины
    }
  }

  const likesClick = (Event) => { // Функция для постоновки "лайка"
    Event.stopPropagation() // Остановка всплытия события
    Event.preventDefault() // Остановка для события

    // eslint-disable-next-line no-underscore-dangle
    const arr = dataProducts.find((el) => el._id === id) // Получаем товар из массива товаров

    if (arr !== undefined) { // проверяем что массив загрузился
      // eslint-disable-next-line no-underscore-dangle
      const islike = arr.likes.includes(userDetails._id) // Проверяем наличие лайка на товаре

      if (islike) { // Если лайк есть то...
        api.delLike(id) // Метод удаления лайка с товара
          .then((res) => res.json()) // ответ в json
          .then((data) => { // ответ в объекте
            if (!data.error && !data.err) { // Проверка на ошибку (если нет - то)
              setTimeout(setReload(crypto.randomUUID()), 500) // Вызывает перезагрузку товаров
              toast('Товар удалён из избранного', { autoClose: 1000 }) // Вывод информации об удалении товара из избранного
            } else {
              toast.error(data.message) // Вывод информации об ошибке
            }
          })
      } else { // Если лайка нет то...
        api.putLike(id) // Метод постоновки лайка на товар
          .then((res) => res.json()) // ответ в json
          .then((data) => { // ответ в объекте
            if (!data.error && !data.err) { // Проверка на ошибку (если нет - то)
              setTimeout(setReload(crypto.randomUUID()), 500) // Вызывает перезагрузку товаров
              toast('Товар добавлен в избранное', { autoClose: 1000 }) // Вывод информации о добавлении товара в избранного
            } else {
              toast.error(data.message) // Вывод информации об ошибке
            }
          })
      }
    }
  }

  const isLikeStylesFn = () => { // Функция для выбора цвета стиля сердечка
    // eslint-disable-next-line no-underscore-dangle
    const arr = dataProducts.find((el) => el._id === id) // Получаем товар из массива товаров
    if (arr !== undefined) { // Если массив загрузился
      // eslint-disable-next-line no-underscore-dangle
      const islike = arr.likes.includes(userDetails._id) // Проверяем наличие записи о лайке
      return islike // Возвращаем лайк
    }
    return false // Возвращаем отсутствие лайка
  }

  useEffect(() => { // Хук для проверки автора товара
    if (productId.length !== 0) { // Если товар загружен
      // eslint-disable-next-line no-underscore-dangle
      if (productId.author._id === userDetails._id) { // Если товар создан юзером...
        setUserFlag(true) // Поднимаем флаг
      }
    }
  }, [productId]) // срабатывает на загруженый товар

  const changeCard = () => { // Функция по клику совершает переход на страницу для редактирования
    if (userFlag) { // Если товар создан пользователем
      // eslint-disable-next-line no-underscore-dangle
      navigate(`/changeprodukt/${productId._id}`) // (navigate) на страницу редактирования карточки
    }
  }

  const delProductFn = () => { // Функция удаления товара по (id)
    // eslint-disable-next-line no-alert, no-restricted-globals
    if (confirm('Удалить товар?')) {
      api.delProduct(id) // Метод удаления товара
        .then((res) => res.json()) // ответ в json
        .then((data) => { // ответ в объекте
          if (!data.error && !data.err) { // Проверка на ошибку (если нет - то)
            setTimeout(setReload(crypto.randomUUID()), 500) // Вызывает перезагрузку товаров
            toast('Товар удалён!', { autoClose: 1000 }) // Сообщение об удалении
            navigate('/delproductdone') // Переход на страницу уведомления
          } else {
            toast.error(data.message) // Вывод информации об ошибке
          }
        })
    }
  }

  const reviewsFn = () => { // Функция раскрытия блока с комментариями
    if (!reviewsBlock && !productId.reviews.length) { // Если блок закрыт и комментариев нет...
      toast('Комментарии к товару отсутствуют!', { autoClose: 1000 }) // Сообщение
    } else { // Иначе...
      setReviewsBlock(!reviewsBlock) // Открываем блок, меняя статус флага
    }
  }

  return ( // jsx разметка
    <>
      <span className={stylesCard.link}>Страница товара --&gt; </span>
      <Link to="/catalog"><span className={stylesCard.link}/* Линк для перехода на страницу каталога */>Перейти в каталог товаров</span></Link>
      {isLoadingProductId ? <Loader /> : (
        <div className={stylesCard.Wr}>
          <div className={stylesCard.WrBlock}>
            <div className={stylesCard.imgWr}>
              <img src={productId.pictures} alt={productId.name} />
              <span className={isLikeStylesFn() ? stylesCard.heartTrue : stylesCard.heartFalse} role="presentation" onClick={likesClick}>
                <i className="fa-solid fa-heart" /* иконка с сердцем *//>
              </span>
            </div>
            <div className={stylesCard.text}>
              {userFlag && (
              <div className={stylesCard.changeCardButtonWr}>
                <button type="button" onClick={changeCard} className={stylesCard.btn}>
                  <span>
                    <i className="fa-regular fa-pen-to-square" />
                    Редактировать товар
                  </span>
                </button>
                <button type="button" onClick={delProductFn} className={stylesCard.btnDel}>
                  <span>
                    <i className="fa-solid fa-trash-can" />
                    Удалить товар
                  </span>
                </button>
              </div>
              )}
              <h3 className={stylesCard.name}>{productId.name /* текст для карточки */}</h3>
              <s className={stylesCard.discount}>{productId.discount > 0 ? `${productId.price} P` : '' }</s>
              <h4 className={productId.discount ? stylesCard.priceDiscount : stylesCard.price}>{productId.discount > 0 ? `${discountFun()/* Вызов функции для расчёта скидки */} P` : `${productId.price} P` /* ценa и выбор стилей для скидки */}</h4>
              <p className={stylesCard.wight}>{productId.wight /* размер уп. (шт, гр) */}</p>
              <div className={stylesCard.btnWr}>
                <p className={stylesCard.stockP}/* Товаров в наличии */>
                  В наличии
                  {' '}
                  {productId.stock}
                  {' '}
                  шт.
                </p>
                <div className={stylesCard.stock}>
                  <button type="button" onClick={stockMinus} className={(stockQuantity === 1) ? stylesCard.stockStop : stylesCard.stockStopFalse}>-</button>
                  {stockQuantity}
                  <button type="button" onClick={stockPlus} className={(stockQuantity === productId.stock) ? stylesCard.stockStop : stylesCard.stockStopFalse}>+</button>
                </div>
                <p className={stylesCard.totalPrice}/* Итоговая сумма */>
                  Сумма
                  {' '}
                  {stockQuantity * (productId.discount > 0 ? discountFun() : productId.price)}
                  {' '}
                  руб.
                </p>
                <button type="button" onClick={basketQuantity} className={stylesCard.btn}>
                  <span>
                    <i className="fa-solid fa-basket-shopping" />
                    В корзину
                  </span>
                </button>
                <ToastContainer />
              </div>
              <h6 className={stylesCard.descriptionH}>Описание товара:</h6>
              <p className={stylesCard.description}>
                {productId.description}
              </p>
            </div>
          </div>
          <button type="button" onClick={reviewsFn} className={stylesCard.btnReviews}>
            <span>
              <i className="fa-solid fa-plus" />
              Коментарии:
            </span>
          </button>
          <div className={stylesCard.reviewsWr}>
            {reviewsBlock && productId.reviews.map((el) => (/* Вывод нужного количества карточек */
              <CardReviews /* Компонента  */
                key={crypto.randomUUID()/* Вызов функции для получения (key) */}
                {...el /* Информация (содержимое) для карточек ввиде props */}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}
