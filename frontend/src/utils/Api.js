class Api {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  _request(endpoint, options) {
    return fetch(this._baseUrl + endpoint, options).then(this._checkResponse);
  }

  getInitialCards() {
    return this._request(`/cards`, {
      headers: this._headers,
    });
  }

  addCard({ name, link }) {
    return this._request(`/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    });
  }

  like(cardId, isLiked) {
    return this._request(`/cards/${cardId}/likes`, {
      method: `${!isLiked ? "DELETE" : "PUT"}`,
      headers: this._headers,
    });
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      headers: this._headers,
      method: "DELETE",
    });
  }

  getProfile() {
    return this._request(`/users/me`, {
      headers: this._headers,
    });
  }

  editProfile({ name, about }) {
    return this._request(`/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    });
  }

  changeAvatar(data) {
    return this._request(`/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
  }
}

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-54",
  headers: {
    authorization: "6834ec0b-ea76-4e97-a1ec-80a039bf651a",
    "Content-Type": "application/json",
  },
});
