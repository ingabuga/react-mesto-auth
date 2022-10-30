export const BASE_URL = 'https://auth.nomoreparties.co';

function checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(res.status);
}

function request(url, options) {
    // принимает два аргумента: урл и объект опций
    return fetch(url, options).then(checkResponse)
}

export const register = (password, email) => {
    return request(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json" 
            },
        body: JSON.stringify({
            password,
            email
            })
    })
        // .then(response => checkResponse(response))
}

export const login = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json" 
            },
        body: JSON.stringify({
            password,
            email
            })
    })
        // .then(response => checkResponse(response))
        .then(data => { 
            if(data.token) {
                localStorage.setItem('token', data.token);
                return data;
            } else {
                return;
            }
        })
}

export const checkToken = (token) => {
    return request(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
            },
    })
        // .then(response => checkResponse(response))
        .then(res => res.data)
}


