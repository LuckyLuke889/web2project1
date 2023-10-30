import React from "react";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import '../CreateTournament.css'

const LogoutButton = () => {
    const {logout, isAuthenticated} = useAuth0();

    return(
        isAuthenticated && (<button className="submit-btn" onClick={() => {
            logout();
            localStorage.clear();
        }}>Log out</button>)
    )
}


export default LogoutButton