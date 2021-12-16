// const BASE_URL = "https://auth.nomoreparties.co";
const BASE_URL = "https://api.superproject.nomoredomains.rocks";

const checkResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Error! + ${res.status}`);
}

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
    }).then(checkResponse)
}

export const login = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
    }).then(checkResponse)
        .then((data) => {
            localStorage.setItem("jwt", data.token)
            return data;
        })
}

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    }).then(checkResponse)
}