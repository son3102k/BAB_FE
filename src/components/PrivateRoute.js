import {Navigate} from 'react-router';
import AuthService from "../services/AuthService";


export default function PrivateRoute({children,admin}) {
    const isAdmin = admin;
    const authUser = AuthService.isLoggedIn();

    // if (!authUser) {
    //     return <Navigate to="/"/>;
    // }
    if (isAdmin===1 && AuthService.getAuthority()!=='ROLE_ADMIN') {
        return <Navigate to="/"/>;
    }
    return children;
}