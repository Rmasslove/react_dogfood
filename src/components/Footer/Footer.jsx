import stylesFooter from './footer.module.scss' // Импорт компонента стилей

export function Footer() { // компонент Footer с {props}
  return ( // jsx разметка
    <footer className={stylesFooter.footer}>
      <h3>&copy; Rmasslove 2022</h3>
      {/* Содержимое footer */}
    </footer>
  )
}
