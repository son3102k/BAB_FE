class AuthService {
    isLoggedIn() {
        return localStorage.getItem('accessToken') !== null;
    }

    getAuthority() {
        return localStorage.getItem('authority');
    }
}

export default new AuthService();