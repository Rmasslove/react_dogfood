import stylesCard from './card.module.scss' // Импорт компонента стилей

export function Cardtags({ tags }) {
  const getRandom = () => Math.random() * new Date().getMilliseconds()
  /* Получение случайного числа для поля (key) */

  const tagsFun = () => (
    tags.map((el) => (el === 'new'
      // eslint-disable-next-line react/no-array-index-key
      ? (<span key={getRandom()} className={stylesCard.new}>{el}</span>)
      // eslint-disable-next-line react/no-array-index-key
      : (<span key={getRandom()} className={stylesCard.other}>{el}</span>)
    ))
  )

  return (
    <div className={stylesCard.tags}>
      {tagsFun(getRandom())}
    </div>

  )
}
