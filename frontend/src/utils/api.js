class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _handleResponse(res) {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {headers: this._headers}).then(
            this._handleResponse
        );
    }

    getUserData() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
        }).then(this._handleResponse);
    }


    getAppInfo() {
        return Promise.all([this.getUserData(), this.getInitialCards()]);
    }

    addCard({name, link}) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({name, link}),
        }).then(this._handleResponse);
    }

    setUserInfo({name, about}) {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
            method: "PATCH",
            body: JSON.stringify({name, about}),
        }).then(this._handleResponse);
    }


    setUserAvatar(avatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            headers: this._headers,
            method: "PATCH",
            body: JSON.stringify({avatar}),
        }).then(this._handleResponse);
    }


    addLike(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            headers: this._headers,
            method: "PUT",
        }).then(this._handleResponse);
    }

    deleteLike(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            headers: this._headers,
            method: "DELETE",
        }).then(this._handleResponse);
    }

    changeLikeCardStatus(cardId, isLiked) {
        return isLiked ? this.addLike(cardId) : this.deleteLike(cardId);
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            headers: this._headers,
            method: "DELETE",
        }).then(this._handleResponse);
    }

    addNewCard() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
            method: "POST",
            body: JSON.stringify({name: this.name, link: this.link}),
        }).then(this._handleResponse);
    }
}


//  export instance of Api
const api = new Api({
    baseUrl: "https://api.superproject.nomoredomains.rocks",
    headers: {
        "authorization": `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
    },
});

export default api;