import stylesCardReviews from './cardReviews.module.scss' // Импорт компонента стилей

export function CardReviews({ text, author, rating }) { // Компонент коментариев
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
          </div>
          <p className={stylesCardReviews.text}>{text}</p>
          <hr />
        </div>
      </div>
    </div>
  )
}
