import stylesCardReviews from './cardReviews.module.scss' // Импорт компонента стилей

export function CardReviews({ text, author, rating }) { // Компонент коментариев
  return ( // jsx разметка
    <div className={stylesCardReviews.Wr}>
      <div className={stylesCardReviews.reviewsWr}>
        <div className={stylesCardReviews.card}>
          <p className={stylesCardReviews.rating}>{rating}</p>
          <p className={stylesCardReviews.author}>{author}</p>
        </div>
        <p className={stylesCardReviews.text}>{text}</p>
      </div>
    </div>
  )
}
