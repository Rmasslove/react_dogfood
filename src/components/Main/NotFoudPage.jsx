import { Link } from 'react-router-dom' // Импорт компонента
import stylesMain from './main.module.scss' // Импорт стилей

export function NotFoundPage() { // Компонент для несуществующей страницы
  return ( // jsx разметка
    <>
      <p className={stylesMain.Wr}>Страница не найдена</p>
      <div className={stylesMain.WrI}>
        <i className="fa-solid fa-magnifying-glass" />
      </div>
      <div className={stylesMain.emptyBtnLink}>
        <Link to="/">
          <button type="button" className={stylesMain.emptyBtn}>На главную</button>
        </Link>
      </div>
    </>
  )
}
