class Auth {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    return res.ok
      ? res.json()
      : Promise.reject(
          new Error(`Error ${res.status}: ${res.statusText}`)
        );
  }


  _request(endpoint, options) {
    return fetch(this._baseUrl + endpoint, options).then(this._checkResponse);
  }

  register({ email, password }) {
    return this._request(`/signup`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
  }

  authorize({ email, password }) {
    return this._request(`/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
  }

  checkToken(token) {
    return  this._request(`/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
  }
}

const auth = new Auth("https://auth.nomoreparties.co");

export default auth;
