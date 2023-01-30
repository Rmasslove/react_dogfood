import { useState, useEffect } from 'react' // Импорт компонента
import { ToastContainer, toast } from 'react-toastify' // Импорт компонента
import { Loader } from '../Loader/Loader' // Импорт компонента
import stylesCardReviews from './cardReviews.module.scss' // Импорт компонента стилей

export function CardReviews({
  text, author, rating, api,
}) { // Компонент коментариев
  const [autorReviews, setAutorReviews] = useState('')
  const [isLoadingAutorReviews, setIsLoadingAutorReviews] = useState(true)
  // console.log(author)

  useEffect(() => { // Хук с запросом информации о пользователе
    api.getUserDetailsId(author) // Метод запроса на получение информации о пользователе
      .then((res) => res.json()) // ответ в json
      .then((data) => { // ответ в объекте
        if (!data.error && !data.err) { // Проверка на ошибку (если нет - то)
          setAutorReviews(data.name)
          setIsLoadingAutorReviews(false)
        } else {
          toast.error(data.message) // Вывод информации об ошибке
        }
      })
  }, []) // Срабатывает на изменения (dataProducts)

  return ( // jsx разметка
    <div>
      {isLoadingAutorReviews ? <Loader /> : (
        <div className={stylesCardReviews.Wr}>
          <div className={stylesCardReviews.reviewsWr}>
            <div className={stylesCardReviews.card}>
              <p className={stylesCardReviews.rating}>
                <span className={rating >= 1 ? stylesCardReviews.starTrue : stylesCardReviews.starFalse}><i className="fa-solid fa-star" /></span>
                <span className={rating >= 2 ? stylesCardReviews.starTrue : stylesCardReviews.starFalse}><i className="fa-solid fa-star" /></span>
                <span className={rating >= 3 ? stylesCardReviews.starTrue : stylesCardReviews.starFalse}><i className="fa-solid fa-star" /></span>
                <span className={rating >= 4 ? stylesCardReviews.starTrue : stylesCardReviews.starFalse}><i className="fa-solid fa-star" /></span>
                <span className={rating >= 5 ? stylesCardReviews.starTrue : stylesCardReviews.starFalse}><i className="fa-solid fa-star" /></span>
              </p>
              <div className={stylesCardReviews.authorWr}>
                <p className={stylesCardReviews.autorReviews}>{autorReviews}</p>
              </div>
            </div>
            <p className={stylesCardReviews.text}>{text}</p>
            <hr />
          </div>
          <ToastContainer />
        </div>
      )}
    </div>
  )
}
