export function setToken(token: string | null) {
    if (token) {
        localStorage.setItem('token', token); // armazena o token
    } else {
        localStorage.removeItem('token'); // remove o token
    }
}

export function getToken() {
    return localStorage.getItem('token'); // recupera o token
}
