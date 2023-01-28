import { Link } from 'react-router-dom' // Импорт компонента
import stylesAddingProduct from './addingProduct.module.scss' // Импорт компонента стилей

export function DelProductDone() { // Компонент успешное удаления товара
  return ( // jsx разметка
    <div className={stylesAddingProduct.AddProductDoneWr}>
      <p className={stylesAddingProduct.AddProductDone}>Товар удалён!</p>
      <div className={stylesAddingProduct.AddProductDoneI}>
        {' '}
        <i className="fa-solid fa-trash-can" />
      </div>
      <div className={stylesAddingProduct.AddProductDoneBtnLink}>
        <Link to="/catalog"><button type="button" className={stylesAddingProduct.AddProductDoneBtn}>Перейти в каталог</button></Link>
      </div>
    </div>
  )
}
