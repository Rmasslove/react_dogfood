import { Link } from 'react-router-dom' // Импорт компонента
import stylesLikes from './likes.module.scss' // Импорт компонента стилей

export function LikesEmpty() { // Компонент отсутствие избранных товаров
  return ( // jsx разметка
    <>
      <span className={stylesLikes.link}>Избранные товары --&gt; </span>
      <Link to="/catalog"><span className={stylesLikes.link}/* Линк для перехода на страницу каталога */>Перейти в каталог товаров</span></Link>
      <div>
        <div className={stylesLikes.likesEmptyWr}>
          <p className={stylesLikes.likesEmpty}>Нет избранных товаров</p>
          <div className={stylesLikes.likesEmptyI}>
            {' '}
            <i className="fa-regular fa-heart" />
          </div>
          <div className={stylesLikes.likesEmptyBtnLink}>
            <Link to="/"><button type="button" className={stylesLikes.likesEmptyBtn}>На главную</button></Link>
          </div>
        </div>
      </div>
    </>
  )
}
