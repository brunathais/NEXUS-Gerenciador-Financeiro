export function setToken(token: string | null) { // armazena o token no localStorage do navegador
    if(token) localStorage.setItem('token', token); // se token for nulo, remove o item do localStorage
    else localStorage.removeItem('token');
}

export function getToken() { // recupera o token do localStorage do navegador
    return localStorage.getItem('token'); // retorna null se nao existir o item no localStorage
}