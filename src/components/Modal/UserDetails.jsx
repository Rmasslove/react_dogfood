import stylesUserDetails from './userdetails.module.scss' // Импорт стилей
import avatarDefault from './img/avatarDefault.jpg' // Импорт файла (jpg)

export function UserDetails({ userDetails }) { // Компонент (Signup) с {props}
  return ( // jsx разметка
    <div className={stylesUserDetails.wr}>
      <img src={userDetails.avatar === '' ? avatarDefault : userDetails.avatar} alt={userDetails.name} />
      <div className={stylesUserDetails.text}>
        <p>{userDetails.name}</p>
        <p>{userDetails.about}</p>
        <p>
          email:
          {' '}
          {userDetails.email}
        </p>
      </div>
    </div>
  )
}
