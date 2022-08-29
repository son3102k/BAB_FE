class AuthService {
    isLoggedIn() {
        return localStorage.getItem('accessToken') !== null;
    }
}

export default new AuthService();