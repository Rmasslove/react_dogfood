import stylesCard from './card.module.scss' // Импорт компонента стилей

export function Cardtags({ tags }) { // Компонент вывода (tags) с {props}
  const getRandom = () => Math.random() * new Date().getMilliseconds()
  /* Получение случайного числа для поля (key) */

  const tagsFun = () => ( // Функция собирающая (tags) и присваивающая стили
    tags.map((el) => (el === 'new'
      ? (<span key={getRandom()} className={stylesCard.new}>{el}</span>)
      : (<span key={getRandom()} className={stylesCard.other}>{el}</span>)
    ))
  )

  return ( // jsx разметка
    <div className={stylesCard.tags}>
      {tagsFun(getRandom()) /* Элемент (tags) вызывающий функцию (tagsFun) */}
    </div>

  )
}
