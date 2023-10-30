import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import './CreateTournament.css';
import { firestore } from './firebase';
import {addDoc, getDoc, doc, getFirestore, collection} from '@firebase/firestore';

function CreateTournament(){
    const abc = [1,2,3,4]
    const navigate = useNavigate();
    const [inputNumberValue, setinputNumberValue] = useState(4);
    const [array,setData]=useState(abc);
    const ref = collection(firestore, "tournaments");

    const handleCreateClick = () => {
        console.log("CREATING...")
        const tournamentPoints = document.getElementById('tournamentPoints').value;
        const tournamentTeams = document.getElementById('addyourteams').childNodes; //timovi koje korisnik prijavljuje
        const sportSelected = document.getElementById("sports");
        const warningMessage = document.getElementById('warningMessage');
        const tournamentPointsArray = tournamentPoints.split(",");
        const isArrayOfNumbers = tournamentPointsArray.every((element) => !isNaN(parseInt(element))); //provjera jesu li brojevi u polju brojevi
        const tournamentName = document.getElementById('tournamentName').value;
        let teams = []
        //console.log(isArrayOfNumbers)
        let areTextFieldsFilled = true;

        if(tournamentName == ""){
            areTextFieldsFilled = false;
        }

        console.log("tournamentTeams", tournamentTeams)

        tournamentTeams.forEach((teamInfo) => {
            const teamLabel = teamInfo.value
            console.log(teamInfo)
            
            if(teamLabel == ""){
                areTextFieldsFilled = false;
            }
        });
        
        if(tournamentPointsArray.length != 3 || !isArrayOfNumbers){
            warningMessage.innerHTML = "Write three numbers that represent points per game!";
        }
        else if(!areTextFieldsFilled){
            warningMessage.innerHTML = "You have left some text fields empty!";
        }
        else{
            warningMessage.innerHTML = "";

            for(let i = 0; i < tournamentTeams.length; ++i){
                teams.push(tournamentTeams[i].value)
            }

            //console.log(tournamentName, sportSelected.value, teams, tournamentPoints);
            const user = document.getElementById("username")
            //console.log(user)

            const userData = JSON.parse(localStorage.getItem("userData"))

            let teamsMap = []

            teams.forEach((team)=>{
                console.log(team)
                teamsMap.push({teamName: team, points: 0});
            })

            //console.log("Map:", teamsMap);

            let data = {
                useremail: userData.email,
                tournamentName: tournamentName, 
                sport: sportSelected.value,
                teams: JSON.stringify(teamsMap),
                points: tournamentPoints
            }

            //console.log(data);
        /*
            try {
                addDoc(ref, data);
                console.log("Adding data to database")
            } catch (error) {
                console.error(error);
            }*/
            
            userData.tournamentName = tournamentName


            localStorage.setItem("userData", JSON.stringify(userData));

            navigate('/rounds');
        }
    }

    const handleInputNumberChange = (event) => {   //Funkcija stvorena u svrhu ažuriranja broja polja za unos naziva timova
        const arrayCopy = [...array];
        const arraySize = arrayCopy.length;
        const currentNumOfTeams = event.target.value
        setinputNumberValue(currentNumOfTeams)
        
        for(let i = 0; i < Math.abs(arraySize - currentNumOfTeams); ++i){
            if(arraySize < currentNumOfTeams){
                arrayCopy.push(currentNumOfTeams)
            }else{
                arrayCopy.pop()
            }
        }

        setData(arrayCopy)

      };

    return(
        <div className="form-structor">
        <div className="signup">
            <h2 className="form-title" id="signup">Create tournament</h2>
            <div className="form-holder">
                <input type="text" id = "tournamentName" className="input" placeholder="Tournament name" />
                <label for="sport" id = "label">Choose a sport:</label>
                    <select name="sports" className="input" id="sports">
                    <option value="football" className="input">football</option>
                    <option value="handball">handball</option>
                    <option value="basketball">basketball</option>
                    <option value="chess">chess</option>
                    </select>  
                    <div id = "setQuantity">
                     <label for="quantity" id = "quantitylabel">Number of competitors</label>
                     <input type="number" id="quantity" name="quantity" min="4" max="8"  
                     value={inputNumberValue}
                     onInput={handleInputNumberChange}></input>
                    </div>
                    <div className = "addTeams">
                    <label id = "label">Add your team names:</label>
                      <div className='addContainer' id ="addyourteams">{array.map((index) => {return(<input className = 'teamNameLabel' type='text' id = {index}></input>)})}</div>
                    </div>
                    <div></div>
                    <div>
                      <label id = "label">Add points for win,tie,loss:</label>
                      <div className='addContainer'>
                        <input id = "tournamentPoints" className = 'teamNameLabel' type='text' placeholder = "win,tie,loss"></input>
                      </div>
                      <p id="warningMessage" class="hidden"></p>
                    </div>


            </div>
            <button className="submit-btn" onClick={handleCreateClick}>Create</button>
            <button className="submit-btn" onClick={() => {{navigate('/')}}}>Return</button>
        </div>
    </div>
    );
}

export default CreateTournament