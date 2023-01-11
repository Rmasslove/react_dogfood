import stylesFooter from './footer.module.scss' // Импорт компонента стилей

export function Footer() { // компонент Footer с {props}
  return ( // jsx разметка
    <footer className={stylesFooter.footer}>
      <h3>
        <a target="_blank" href="https://github.com/Rmasslove" rel="noreferrer">
          <i className="fa-brands fa-square-github href_github" />
          {' '}
          Rmasslove 2022 &copy;

        </a>
      </h3>
      {/* Содержимое footer */}
    </footer>
  )
}
