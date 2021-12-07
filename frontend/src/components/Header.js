import React from "react";
import logo from "../images/Logo.svg";

const Header = ({children}) => {
    return (
        <header className="header">
            <img
                src={logo}
                alt="Логотип сайта"
                className="header__logo"
            />
            <nav className="menu">
                {children}
            </nav>
        </header>
    )
}

export default Header;