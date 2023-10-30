import React from "react";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import TournamentButton from "./components/TournamentButton";
import './CreateTournament.css'
import User from "./User";

function App() {
  return (
    <div className="signup">
      <User />
      <div className="form-holder">
      <LoginButton />
      <LogoutButton />
      <TournamentButton />
      </div>
    </div>
  );
}

export default App;
