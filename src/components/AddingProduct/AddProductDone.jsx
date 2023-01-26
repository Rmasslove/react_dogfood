import { Link } from 'react-router-dom' // Импорт компонента
import stylesAddingProduct from './addingProduct.module.scss' // Импорт компонента стилей

export function AddProductDone() { // Компонент успешное добавление товара
  return ( // jsx разметка
    <div className={stylesAddingProduct.AddProductDoneWr}>
      <p className={stylesAddingProduct.AddProductDone}>Товар добавлен</p>
      <div className={stylesAddingProduct.AddProductDoneI}>
        {' '}
        <i className="fa-regular fa-square-plus" />
      </div>
      <div className={stylesAddingProduct.AddProductDoneBtnLink}>
        <Link to="/addingproduct"><button type="button" className={stylesAddingProduct.AddProductDoneBtn}>Добававить ещё товар</button></Link>
        <Link to="/catalog"><button type="button" className={stylesAddingProduct.AddProductDoneBtn}>Перейти в каталог</button></Link>
      </div>
    </div>
  )
}
