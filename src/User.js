import {React, useState, useEffect} from "react";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import './CreateTournament.css'

export const x = 5


const User = () => {
    const {user, isAuthenticated} = useAuth0();
    let [userData, setuserData] = useState(false);

    //const userString = JSON.stringify(user);
    //console.log(userString)

    return(isAuthenticated && <div>
                                <img className="userimage" src = {user.picture}>
                                </img>
                                <div className = "username">Hi {user.nickname}!
                                </div>
                                <script>{
                                localStorage.setItem('userData', JSON.stringify({ name: user.nickname, email: user.email, tournamentName: ""}))}
                                </script>
                              </div>
                              )
}

export default User;