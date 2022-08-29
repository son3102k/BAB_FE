import {Navigate} from 'react-router';
import AuthService from "../services/AuthService";


export default function PrivateRoute({children}) {
    const authUser = AuthService.isLoggedIn();

    if (!authUser) {
        return <Navigate to="/"/>
    }
    return children;
}