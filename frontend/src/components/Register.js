import React, {useState} from 'react';
import {Link} from "react-router-dom";

function Register({onRegister}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleEmailChange(e) {
        setEmail(e.target.value)
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        onRegister({email, password});
    }

    return (
        <div className="auth-form">
            <form className="auth-form__form" onSubmit={handleSubmit}>
                <div className="auth-form__wrapper">
                    <h3 className="auth-form__title">Регистрация</h3>
                    <label className="auth-form__input">
                        <input type="email" name="email" id="email"
                               className="auth-form__textfield"
                               placeholder="Email"
                               onChange={handleEmailChange}
                               required
                               value={email}
                        />
                    </label>
                    <label className="auth-form__input">
                        <input type="password" name="password" id="password"
                               className="auth-form__textfield"
                               placeholder="Пароль"
                               onChange={handlePasswordChange}
                               required
                               value={password}
                        />
                    </label>
                </div>
                <div className="auth-form__wrapper">
                    <button className="auth-form__button"
                            type="submit">Зарегистрироваться
                    </button>
                    <p className="auth-form__text">Уже зарегистрированы? <Link
                        className="auth-form__link" to="/signin">Войти</Link>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Register;