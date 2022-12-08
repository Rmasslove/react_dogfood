import { Card } from '../Card/Card' // Импорт компонента
import stylesMain from './main.module.scss' // Импорт компонента стилей

function Main() { // Компонент Main с {props}
  const smiles = ['o_o', 'O_o', 'o_O', 'o_o', 'O_o', 'o_O'] // Временные данные для карточек

  const getRandom = () => Math.random() * new Date().getMilliseconds() /* Получение случайного
  числа для поля (key) */

  return ( // jsx разметка
    <main>
      <div className={stylesMain.cards}>
        {smiles.map((el) => (/* Метод мап для отображения нужного количества карточек */
          <Card /* Компонента Card */
            key={getRandom() /* Вызов функции для получения (key) */}
            el={el /* Информация (содержимое) для карточек ввиде props */}
          />
        ))}
      </div>
    </main>
  )
}

export { // экспорт компонента
  Main,
}
