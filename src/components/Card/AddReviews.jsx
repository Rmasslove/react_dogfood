import { useFormik } from 'formik'
import stylesAddReviews from './addReviews.module.scss' // Импорт компонента стилей

export function AddReviews() { // Компонент добавления комментариев
  const formik = useFormik({
    initialValues: {
      text: '',
    },
    onSubmit: (values) => {
      console.log(values)
    },
  })

  return ( // jsx разметка
    <div className={stylesAddReviews.Wr}>
      <form className={stylesAddReviews.formWr} onSubmit={formik.handleSubmit}>
        <label htmlFor="Комментарий">
          <p>Ваш комментарий</p>
          <input
            id="text"
            name="text"
            type="textarea"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </label>
        <button type="submit">Отправить комментарий</button>
      </form>
    </div>
  )
}
