import {useEffect, useState} from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({isOpen, onClose, onAddPlace}) => {
    const [formFields, setFormFields] = useState({name: "", link: ""});
    const {name, link} = formFields;

    const handleChange = (e) =>
        setFormFields({...formFields, [e.target.name]: e.target.value});

    useEffect(() => {
        setFormFields({name: "", link: ""});
    }, [isOpen]);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onAddPlace(formFields);
    };

    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            name="add-card"
            title="Новое место"
            buttonText="Создать"
            onSubmit={handleSubmit}
        >
            <label className="popup__form-field">
                <input
                    type="text"
                    name="name"
                    className="popup__input popup__input_type_title"
                    placeholder="Название"
                    required
                    minLength="1"
                    maxLength="30"
                    id="title-input"
                    value={name}
                    onChange={handleChange}
                />
                <span className="popup__input-error title-input-error"/>
            </label>

            <label className="popup__form-field">
                <input
                    type="url"
                    name="link"
                    className="popup__input popup__input_type_image-link"
                    placeholder="Ссылка на изображение"
                    required
                    id="url-input"
                    value={link}
                    onChange={handleChange}
                />
                <span className="popup__input-error url-input-error"/>
            </label>
        </PopupWithForm>
    );
};

export default AddPlacePopup;