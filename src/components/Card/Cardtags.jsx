import stylesCard from './card.module.scss' // Импорт компонента стилей

export function Cardtags({ tags }) { // Компонент вывода (tags) с {props}
  const tagsFun = () => ( // Функция собирающая (tags) и присваивающая стили
    tags.map((el) => (el === 'new'
      ? (<span key={crypto.randomUUID()} className={stylesCard.new}>{el}</span>)
      : (<span key={crypto.randomUUID()} className={stylesCard.other}>{el}</span>)
    ))
  )

  return ( // jsx разметка
    <div className={stylesCard.tags}>
      {tagsFun(crypto.randomUUID()) /* Элемент (tags) вызывающий функцию (tagsFun) */}
    </div>

  )
}
