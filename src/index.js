import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router,
  Routes,
  Route} from 'react-router-dom';
import './index.css';
import App from './App';
import {Auth0Provider} from '@auth0/auth0-react';
import {useAuth0} from "@auth0/auth0-react"
import User from './User'
import CreateTournament from './CreateTournament';
import Rounds from './Rounds';
import Table from './Table';

const domain = process.env.REACT_APP_ATH0_DOMAIN;
const client_id = process.env.REACT_APP_ATH0_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider domain={domain} clientId={client_id} redirectUri = {window.location.origin}>
         <Router>
       <Routes>
        <Route path='/' element = {<App />}></Route>
        <Route path='/createTournament' element = {<CreateTournament />}></Route>
        <Route path='/rounds' element = {<Rounds />}></Route>
        <Route path='/table' element = {<Table />}></Route>
       </Routes>
     </Router>   
  </Auth0Provider>
);

