import httpService from './httpService';
import jwtDecode from 'jwt-decode';

httpService.setJWT(getJWT());

async function loginUser(user) {
    const { data: jwt } = await httpService.post("/auth", {
        email: user.username,
        password: user.password
    });
    localStorage.setItem("token", jwt);
}

function loginWithJWT(jwt) {
    localStorage.setItem("token", jwt);
}

function getJWT() {
    return localStorage.getItem('token');
}

function logout() {
    localStorage.removeItem("token");
}

function getCurrentUser() {
    try {
        const jwt = localStorage.getItem('token');
        return jwtDecode(jwt);
    } catch (ex) {
        return null;
    }
}

export default {
    loginUser,
    logout,
    getCurrentUser,
    loginWithJWT,
    getJWT
}