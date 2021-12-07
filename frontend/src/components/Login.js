import React, {useState} from "react";

function Login({onLogin}) {
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
        onLogin({email, password});
    }

    return (
        <div className="auth-form">
            <form className="auth-form__form" onSubmit={handleSubmit}>
                <div className="auth-form__wrapper">
                    <h3 className="auth-form__title">Вход</h3>
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
                <button className="auth-form__button" type="submit">Войти
                </button>
            </form>
        </div>
    )
}

export default Login;