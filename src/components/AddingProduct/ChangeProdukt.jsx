import { Link, useNavigate, useParams } from 'react-router-dom' // Импорт компонента
import { ToastContainer, toast } from 'react-toastify' // Импорт компонента
import {
  Formik, Form, Field,
} from 'formik' // Импорт компонента
import * as Yup from 'yup' // Импорт компонента
import { useEffect, useState } from 'react' // Импорт компонента
import { PreviewProduct } from './PreviewProduct' // Импорт компонента
import stylesAddingProduct from './addingProduct.module.scss' // Импорт компонента стилей
import 'react-toastify/dist/ReactToastify.css' // Импорт компонента стилей

export function ChangeProdukt({ api, setReload }) { // Компонент редактирования товара
  const [dataPreview, setdataPreview] = useState([]) // Хук для чекбокса выбрать всё
  const [changeFlag, setchangeFlag] = useState(false)
  // const [productIdChange, setProductIdChange] = useState([]) // Хук для информации товаре по (Id)
  const navigate = useNavigate() // Хук из (react-router-dom)
  const { id } = useParams() // Хук из (react-router-dom) для извлечения id карточки

  useEffect(() => { // Хук для загрузки информации об одном товере
    if (id) { // Если Id есть
      api.getProductId(id) // Метод запроса на получение информации об одном товаре
        .then((res) => res.json()) // ответ в json
        .then((data) => { // ответ в объекте
          if (!data.error && !data.err) { // Проверка на ошибку (если нет - то)
            setdataPreview(data) // Запись в Хук информации об одном товаре
          } else {
            toast.error(data.message) // Вывод информации об ошибке
          }
        })
    }
  }, [])

  const SignupSchema = Yup.object().shape({ // Параметры валидации при помощи (Yup)
    name: Yup.string()
      .min(2, 'Минимум 2 символа!')
      .max(70, 'Максимум 70 символов!'),
    price: Yup.string(),
    wight: Yup.string(),
    stock: Yup.string(),
    discount: Yup.string(),
    description: Yup.string()
      .min(3, 'Минимум 3 символа!')
      .max(1000, 'Максимум 1000 символов!'),
    pictures: Yup.string()
      .url(),
  })

  const addchangeProductFn = () => { // Функция добавления изменённого товара
    api.changeProduct(id, dataPreview) // Метод добавление товара
      .then((res) => res.json()) // ответ в json
      .then((data) => { // ответ в объекте
        if (!data.error && !data.err) { // Проверка на ошибку (если нет - то)
          toast('Товар изменён!', { autoClose: 1000 }) // Вывод информации
          setdataPreview([]) // Очищаем Хук с объектом товара
          setTimeout(setReload(crypto.randomUUID()), 500) // Флаг для перезагрузки товаров
          navigate(`/card/${id}`) // Перенаправлени на страницу измененного товара
        } else {
          toast.error(data.message) // Вывод информации об ошибке
        }
      })
  }

  const changeObjFn = ({ // Функция формирующая новый объект с изменениями
    name, price, wight, stock, discount, description, pictures,
  }) => {
    const obj = {
      ...dataPreview,
      name: name || dataPreview.name,
      price: price || dataPreview.price,
      wight: wight || dataPreview.wight,
      stock: stock || dataPreview.stock,
      discount: discount || dataPreview.discount,
      description: description || dataPreview.description,
      pictures: pictures || dataPreview.pictures,
    }
    return obj // Возвращаем измененный объект
  }

  return ( // jsx разметка
    <>
      <span className={stylesAddingProduct.link}>Страница редактирования товара --&gt; </span>
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
              setdataPreview(changeObjFn(body)) // Запись объекта в Хук
              setchangeFlag(true) // Поднимаем флаг для возможности отправки изменения на сервер
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
                  <button type="submit" className={stylesAddingProduct.btn}>
                    {' '}
                    <i className="fa-solid fa-magnifying-glass-plus" />
                    Просмотр товара
                  </button>
                  {changeFlag // Выбор тега кнопки
                    ? (
                      <button type="button" onClick={addchangeProductFn} className={stylesAddingProduct.btn}>
                        <i className="fa-regular fa-pen-to-square" />
                        Редактировать товар
                      </button>
                    )
                    : (
                      <div className={stylesAddingProduct.fake}>
                        <i className="fa-regular fa-pen-to-square" />
                        Редактировать товар
                      </div>
                    )}
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
