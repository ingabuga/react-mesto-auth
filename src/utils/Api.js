class Api {
    constructor(baseUrl, cohort, token) {
        this._baseUrl = baseUrl;
        this._cohort = cohort;
        this._token = token;
    }
  

    getInitialCards = () => {
        return fetch(`${this._baseUrl}/${this._cohort}/cards`, {
            headers: {
                authorization: this._token
            }
        })
            .then(res => this._check(res));
    }

    getUserData = () => {
        return fetch(`${this._baseUrl}/${this._cohort}/users/me`, {
            headers: {
                authorization: this._token
            }
        })
            .then(res => this._check(res));
    }

    patchUserData = (data) => {
        return fetch(`${this._baseUrl}/${this._cohort}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(res => this._check(res));
    }

    patchAvatar = (data) => {
        return fetch(`${this._baseUrl}/${this._cohort}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: data.avatar,
            })
        })
            .then(res => this._check(res));
    }

    addNewCard = (data) => {
        return fetch(`${this._baseUrl}/${this._cohort}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(res => this._check(res));
    }

    deleteCard = (cardId) => {
        return fetch(`${this._baseUrl}/${this._cohort}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
            }
        })
            .then(res => this._check(res));
    }

    handleLike = (cardId, isLiked) => {
        return fetch(`${this._baseUrl}/${this._cohort}/cards/${cardId}/likes`, {
            method: isLiked ? 'DELETE' : 'PUT',
            headers: {
                authorization: this._token,
            },
        })
            .then(res => this._check(res));
    }

    _check(res) {
        if (res.ok) {
          return res.json();
        }
    
        return Promise.reject(res);
    }

}

const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1',
    cohort: 'cohort-49',
    token: 'ccf50a2a-0bfe-45bb-ba00-99b5825eb2e5'
}

const api = new Api(config.baseUrl, config.cohort, config.token);

export default api;