import stylesCard from './card.module.scss' // Импорт компонента стилей

export function Card({ el }) { // Компонент Card c {props}
  return ( // jsx разметка
    <div className={stylesCard.card}>
      {el /* props с текстом для карточки */}
      <span className={stylesCard.heart}>
        <i className="fa-regular fa-heart" /* иконка с сердцем *//>
      </span>
    </div>
  )
}
