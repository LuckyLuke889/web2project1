import React from "react";
import { useNavigate } from 'react-router-dom'
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import '../CreateTournament.css'

const TournamentButton = () => {
    const {isAuthenticated} = useAuth0();
    const navigate = useNavigate();


    return(
        isAuthenticated && (<button className="submit-btn" onClick={() => {
            {navigate('/createTournament')}
        }}>Create tournament</button>)
    )
}


export default TournamentButton