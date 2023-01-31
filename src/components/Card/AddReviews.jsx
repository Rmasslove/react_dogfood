import {
  Formik, Form, Field,
} from 'formik' // Импорт компонента
import * as Yup from 'yup' // Импорт компонента
import { ToastContainer, toast } from 'react-toastify' // Импорт компонента
import stylesAddReviews from './addReviews.module.scss' // Импорт компонента стилей

export function AddReviews({ api, id, setReloadReview }) { // Компонент добавления комментариев
  const addReviewsFn = (values) => { // Функция добавления комментария
    api.addReviewProductId(id, values) // Метод добавление
      .then((res) => res.json()) // ответ в json
      .then((data) => { // ответ в объекте
        if (!data.error && !data.err) { // Проверка на ошибку (если нет - то)
          toast('Комментарий добавлен!', { autoClose: 1000 }) // Вывод информации
          setReloadReview(true) // Флаг для перезагрузки комментариев
        } else {
          toast.error(data.message) // Вывод информации об ошибке
        }
      })
  }

  const SignupSchema = Yup.object().shape({ // Параметры валидации при помощи (Yup)
    rating: Yup.string()
      .required('Поле "Рейтинг" обязательно для заполнения!')
      .max(1, 'Максимум 1 символ!'),
    text: Yup.string()
      .required('Поле "Комментарий" обязательно для заполнения!')
      .min(3, 'Минимум 3 символа!')
      .max(1000, 'Максимум 1000 символов!'),
  })

  return ( // jsx разметка
    <div className={stylesAddReviews.Wr}>
      <Formik
        initialValues={{
          rating: 0,
          text: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, { resetForm }) => { // Сбор значений с формы
          addReviewsFn(values) // Вызоф функции добавления комментария
          resetForm() // Очистка формы
        }}
      >
        {({ errors, touched }) => (
          <Form className={stylesAddReviews.form}>
            <div>
              {errors.rating && touched.rating ? (
                <div className={stylesAddReviews.errors}>{errors.rating}</div>
              ) : null}
              <Field
                className={stylesAddReviews.rating}
                name="rating"
                placeholder="Рейтинг"
                type="number"
                min={0}
                max={5}
              />
            </div>
            {errors.text && touched.text ? (
              <div className={stylesAddReviews.errors}>{errors.text}</div>
            ) : null}
            <Field
              className={stylesAddReviews.textarea}
              name="text"
              placeholder="Комментарий"
              as="textarea"
            />
            <div className={stylesAddReviews.btnWr}>
              <button type="submit" className={stylesAddReviews.btn}>
                <i className="fa-solid fa-plus" />
                Добавить комментарий
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  )
}
