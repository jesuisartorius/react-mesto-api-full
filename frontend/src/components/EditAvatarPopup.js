import {useRef} from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({isOpen, onClose, onUpdateAvatar}) => {
    const avatarRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        const avatar = avatarRef.current.value;
        onUpdateAvatar(avatar);
    };

    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            name="profile-avatar"
            title="Обновить аватар"
            buttonText="Сохранить"
            onSubmit={handleSubmit}
        >
            <label className="popup__form-field">
                <input
                    type="url"
                    name="avatar"
                    className="popup__input popup__input_type_image-link"
                    placeholder="Ссылка на фотографию"
                    id="avatar-input"
                    required
                    ref={avatarRef}
                />
                <span className="popup__input-error avatar-input-error"/>
            </label>
        </PopupWithForm>
    );
};

export default EditAvatarPopup;