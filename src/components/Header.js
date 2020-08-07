import React from 'react';
import logo from '../images/logo.svg';

function Header() {
    return (
      <header className="header page__header">
        <a href="#top" className="header__logo-link">
          <img src={logo} alt="Логотип" className="header__logo" />
        </a>
      </header>
    );
}

export default Header;
