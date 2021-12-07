import React from 'react';
import PopupWithForm from "./PopupWithForm";
import {useContext, useEffect, useState} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

const EditProfilePopup = ({isOpen, onClose, onUpdateUser}) => {
    const currentUser = useContext(CurrentUserContext);

    const [formFields, setFormFields] = useState({
        name: "",
        about: "",
    });

    const {name, about} = formFields;

    const handleChange = (e) => {
        setFormFields({...formFields, [e.target.name]: e.target.value});
    };

    useEffect(() => {
        setFormFields({
            name: currentUser.name,
            about: currentUser.about,
        });
    }, [currentUser, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateUser(formFields);
        setFormFields({name: "", link: ""});
    };

    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            name="edit-profile"
            title="Редактировать профиль"
            buttonText="Сохранить"
            onSubmit={handleSubmit}
        >
            <label className="popup__form-field">
                <input
                    type="text"
                    name="name"
                    className="popup__input popup__input_type_name"
                    placeholder="Имя"
                    minLength="2"
                    maxLength="40"
                    id="name-input"
                    required
                    value={name || ""}
                    onChange={handleChange}
                />
                <span className="popup__input-error name-input-error"/>
            </label>
            <label className="popup__form-field">
                <input
                    type="text"
                    name="about"
                    className="popup__input popup__input_type_job"
                    placeholder="Описание"
                    minLength="2"
                    maxLength="200"
                    id="job-input"
                    required
                    value={about || ""}
                    onChange={handleChange}
                />
                <span className="popup__input-error job-input-error"/>
            </label>
        </PopupWithForm>
    );
};

export default EditProfilePopup;
