import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import './CreateTournament.css';
import { firestore } from './firebase';
import {getDoc, doc, getDocs, getFirestore, collection, updateDoc} from '@firebase/firestore';

function Table(){
    const navigate = useNavigate()
    const db = getFirestore();
    const colRef = collection(db, "tournaments")
    const [array,setData]=useState([]);

    const showTable = () => {
        getDocs(colRef).then((snapshot) => {
            snapshot.docs.forEach((document)=>{
                const tournamentName = document.data().tournamentName
                const storageTournamentName = JSON.parse(localStorage.getItem("userData")).tournamentName 

                if(tournamentName == storageTournamentName){
                    const teams = JSON.parse(document.data().teams)

                    teams.sort((a, b) => parseFloat(b.points) - parseFloat(a.points));

                    setData(teams)
                }
            })
        })

    }

    return(
        <div>
        <button className="submit-btn" onClick={showTable}>Show table</button>
        <div id="roundsData"></div>
<div class="container">
<div class="table">
    <div class="table-header">
        <div class="header__item"><a id="wins" class="filter__link filter__link--number">Team</a></div>
        <div class="header__item"><a id="total" class="filter__link filter__link--number">Points</a></div>
    </div>
    <div class="table-content" id = "table-content">
        {array.map((index)=>{return(<div id = {index} class="table-row">
                                            <div class="table-data">
                                                {index.teamName}
                                            </div>
                                            <div class="table-data">
                                                {index.points}
                                            </div>
                                         </div>)})}	                                   
    </div>	
</div>
</div>
<button className="submit-btn" onClick={()=>{navigate("/createTournament")}}>Return</button>
</div>);

}

export default Table;