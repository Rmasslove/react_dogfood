import { Card } from '../Card/Card' // Импорт компонента
import stylesPages from './pages.module.scss' // Импорт компонента стилей

export function Home({ dataSmiles }) { // Компонент (Home) с {props}
  const getRandom = () => Math.random() * new Date().getMilliseconds() /* Получение случайного
    числа для поля (key) */
  return (
    <>
      <h1>Главная страница</h1>
      <div className={stylesPages.cards}>
        {dataSmiles.map((el) => (/* Метод мап для отображения нужного количества карточек */
          <Card /* Компонента Card */
            key={getRandom() /* Вызов функции для получения (key) */}
            el={el /* Информация (содержимое) для карточек ввиде {props} */}
          />
        ))}
      </div>
    </>
  )
}
