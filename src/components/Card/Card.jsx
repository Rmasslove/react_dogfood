import { Link, useParams } from 'react-router-dom' // Импорт компонента

export function Card() { // Компонет (Card) с инфо по одной карточке
  const { id } = useParams() // Хук из (react-router-dom) для извлечения id карточки
  console.log(id)
  return ( // jsx разметка
    <>
      <h1>Страница товара</h1>
      <p>{id}</p>
      <Link to="/catalog">Назад</Link>
    </>
  )
}
