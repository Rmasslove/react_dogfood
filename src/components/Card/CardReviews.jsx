import { toast } from 'react-toastify' // Импорт компонента
import stylesCardReviews from './cardReviews.module.scss' // Импорт компонента стилей
import { ReactComponent as Xmark } from '../Search/img/circle-xmark-regular.svg' // Импорт файла (svg) преобразованного в компонент

export function CardReviews({
  // eslint-disable-next-line camelcase
  text, author, rating, _id, id, api, user_id, setReloadReview,
}) { // Компонент коментариев
  const deleteReviewsFn = () => { // Функция удаления комментария по (id)
    // eslint-disable-next-line no-alert, no-restricted-globals
    if (confirm('Удалить комментарий?')) {
      api.delReview(id, _id) // Метод удаления комментария
        .then((res) => res.json()) // ответ в json
        .then((data) => { // ответ в объекте
          if (!data.error && !data.err) { // Проверка на ошибку (если нет - то)
            setReloadReview(true) // Меняем флаг перезагрузки комментариев
          } else {
            toast.error(data.message) // Вывод информации об ошибке
          }
        })
    }
  }

  const visibleDeleteReviewsFn = () => { // Функция отображения кнопки удалить комментарий
    // eslint-disable-next-line no-underscore-dangle, camelcase
    if (author._id === user_id) { // Если id автора и id юзера совпадают...
      return ( // Выводим кнопку удаления
        <button type="button" className={stylesCardReviews.btn}>
          <Xmark onClick={deleteReviewsFn} /* Установка иконки через компонент (Xmark) *//>
        </button>
      )
    }
    return false // Ничего не выводим
  }

  return ( // jsx разметка
    <div>
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
              <p className={stylesCardReviews.autorReviews}>{author.name}</p>
            </div>
            {visibleDeleteReviewsFn() /* Функция отображения кнопки удаления комментария */}
          </div>
          <p className={stylesCardReviews.text}>{text}</p>
          <hr />
        </div>
      </div>
    </div>
  )
}
