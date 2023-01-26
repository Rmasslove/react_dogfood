import { Link, useNavigate } from 'react-router-dom' // Импорт компонента
import { ToastContainer, toast } from 'react-toastify' // Импорт компонента
import {
  Formik, Form, Field,
} from 'formik' // Импорт компонента
import * as Yup from 'yup' // Импорт компонента
import { useState } from 'react' // Импорт компонента
import { PreviewProduct } from './PreviewProduct' // Импорт компонента
import stylesAddingProduct from './addingProduct.module.scss' // Импорт компонента стилей
import 'react-toastify/dist/ReactToastify.css' // Импорт компонента стилей

export function AddingProduct({ api, setReload }) { // Компонент добавление товара
  const [dataPreview, setdataPreview] = useState([]) // Хук для чекбокса выбрать всё
  const navigate = useNavigate() // Хук из (react-router-dom)

  const SignupSchema = Yup.object().shape({ // Параметры валидации при помощи (Yup)
    name: Yup.string()
      .min(2, 'Минимум 2 символа!')
      .max(70, 'Максимум 70 символов!')
      .required('Поле "Название товара" обязательно для заполнения!'),
    price: Yup.string()
      .required('Поле "Цена" обязательно для заполнения!'),
    wight: Yup.string()
      .required('Поле "Вес" обязательно для заполнения!'),
    stock: Yup.string()
      .required('Поле "Количество товара" обязательно для заполнения!'),
    discount: Yup.string(),
    description: Yup.string()
      .min(3, 'Минимум 3 символа!')
      .max(1000, 'Максимум 1000 символов!'),
    pictures: Yup.string()
      .url()
      .required('Поле "Изображение" обязательно для заполнения!'),
  })

  const addProductFn = () => { // Функция добавления товара
    api.addProduct(dataPreview) // Метод добавление товара
      .then((res) => res.json()) // ответ в json
      .then((data) => { // ответ в объекте
        if (!data.error && !data.err) { // Проверка на ошибку (если нет - то)
          toast('Товар добавлен!') // Вывод информации
          setdataPreview([]) // Очищаем Хук с объектом товара
          setTimeout(setReload(crypto.randomUUID()), 1000) // Флаг для перезагрузки товаров
          navigate('/addproductdone') // Перенаправлени на страницу успешного добавления
        } else {
          toast.error(data.message) // Вывод информации об ошибке
        }
      })
  }

  return ( // jsx разметка
    <>
      <span className={stylesAddingProduct.link}>Страница добавления нового товара --&gt; </span>
      <Link to="/catalog"><span className={stylesAddingProduct.link}/* Линк для перехода на страницу каталога */>Перейти в каталог товаров</span></Link>
      <div className={stylesAddingProduct.wr}>
        <div>
          <Formik
            initialValues={{
              name: '',
              price: '',
              wight: '',
              stock: '',
              discount: '',
              description: '',
              pictures: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={(values) => { // Сбор значений с формы
              const body = values // Запись значений в объект
              setdataPreview(body) // Запись объекта в Хук
            }}
          >
            {({ errors, touched }) => (
              <Form className={stylesAddingProduct.form}>
                {errors.name && touched.name ? (
                  <div className={stylesAddingProduct.errors}>{errors.name}</div>
                ) : null}
                <Field
                  className={stylesAddingProduct.field}
                  name="name"
                  placeholder="Название товара"
                  type="text"
                />
                {errors.price && touched.price ? (
                  <div className={stylesAddingProduct.errors}>{errors.price}</div>
                ) : null}
                <Field
                  className={stylesAddingProduct.field}
                  name="price"
                  placeholder="Цена"
                  type="number"
                  min={0}
                />
                {errors.wight && touched.wight ? (
                  <div className={stylesAddingProduct.errors}>{errors.wight}</div>
                ) : null}
                <Field
                  className={stylesAddingProduct.field}
                  name="wight"
                  placeholder="Параметр вес/шт."
                  type="text"
                />
                {errors.stock && touched.stock ? (
                  <div className={stylesAddingProduct.errors}>{errors.stock}</div>
                ) : null}
                <Field
                  className={stylesAddingProduct.field}
                  name="stock"
                  placeholder="Количество товара"
                  type="number"
                  min={0}
                />
                {errors.discount && touched.discount ? (
                  <div className={stylesAddingProduct.errors}>{errors.discount}</div>
                ) : null}
                <Field
                  className={stylesAddingProduct.field}
                  name="discount"
                  placeholder="Скидка на товар"
                  type="number"
                  min={0}
                />
                {errors.description && touched.description ? (
                  <div className={stylesAddingProduct.errors}>{errors.description}</div>
                ) : null}
                <Field
                  className={stylesAddingProduct.textarea}
                  name="description"
                  placeholder="Описание товара"
                  as="textarea"
                />
                {errors.pictures && touched.pictures ? (
                  <div className={stylesAddingProduct.errors}>{errors.pictures}</div>
                ) : null}
                <Field
                  className={stylesAddingProduct.field}
                  name="pictures"
                  placeholder="Изображение"
                />
                <div className={stylesAddingProduct.btnWr}>
                  <button type="submit" className={stylesAddingProduct.btn}>Просмотр товара</button>
                  {dataPreview.length !== 0 // Выбор тега кнопки
                    ? <button type="button" onClick={addProductFn} className={stylesAddingProduct.btn}>Добавить товар</button>
                    : <div className={stylesAddingProduct.fake}>Добавить товар</div>}
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <PreviewProduct dataPreview={dataPreview} /* Компонент предварительного просмотра *//>
      </div>
      <ToastContainer />
    </>
  )
}
