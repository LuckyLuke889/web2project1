import React from "react";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import '../CreateTournament.css';


const LoginButton = () => {
    const {loginWithRedirect, isAuthenticated} = useAuth0();

    return(
        !isAuthenticated && (<button className="submit-btn" onClick={
            () => {
                loginWithRedirect();
            }}>Log in</button>)
    )
}


export default LoginButton