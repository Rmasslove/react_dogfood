import stylesUserDetails from './userdetails.module.scss' // Импорт стилей

export function UserDetails() { // Компонент (Signup) с {props}
  return ( // jsx разметка
    <div className={stylesUserDetails.wr}>
      <p>name</p>
      <p>about</p>
      <p>avatar</p>
      <p>email</p>
    </div>
  )
}
