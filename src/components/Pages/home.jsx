// import { Card } from '../Card/Card' // Импорт компонента
import stylesPages from './pages.module.scss' // Импорт компонента стилей
import img1 from '../Modal/img/img1.jpg' // Импорт файла (jpg)
import img2 from '../Modal/img/img2.jpg' // Импорт файла (jpg)
import img3 from '../Modal/img/img3.jpg' // Импорт файла (jpg)
import img4 from '../Modal/img/img4.jpg' // Импорт файла (jpg)
import img5 from '../Modal/img/img5.jpg' // Импорт файла (jpg)
import img6 from '../Modal/img/img6.jpg' // Импорт файла (jpg)

export function Home() { // Компонент вывода страницы по умолчанию с {props}
  return ( // jsx разметка
    <div className={stylesPages.imgWr}>
      <img src={img1} alt="foto" />
      <img src={img2} alt="foto" />
      <img src={img3} alt="foto" />
      <img src={img4} alt="foto" />
      <img src={img5} alt="foto" />
      <img src={img6} alt="foto" />
      <div className={stylesPages.home}>
        <h1>Вас приветствует магазин продуктов для собак</h1>
        <h2>Пожалуйста зарегистрируйтесь!</h2>
      </div>
    </div>
  )
}
