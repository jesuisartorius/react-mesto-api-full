import error from '../images/error-icon.svg';
import success from '../images/success-icon.svg';

function InfoTooltip({isOpen, onClose, isLoggedIn}) {

    return (
        <div className={`popup ${isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <button type="reset" onClick={onClose} aria-label="Закрыть окно" className="popup__close-button"/>
                <img src={`${isLoggedIn ? success : error}`} alt="иллюстрация" className="popup__icon" />
                <p className="popup__status-message">{`${isLoggedIn ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}`}</p>
            </div>
        </div>
    );
}
export default InfoTooltip;