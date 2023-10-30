import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import './CreateTournament.css';
import { firestore } from './firebase';
import {getDoc, doc, getDocs, getFirestore, collection, updateDoc} from '@firebase/firestore';

const Rounds = () => {
    const four = [[[0,2],[1,3]],[[1,2],[0,3]],[[0,1],[2,3]]];
    const five = [[[1,0],[2,4]],[[4,3],[0,2]],[[1,2],[0,3]],[[3,1],[0,4]],[[3,2],[1,4]]];
    const six = [[[4,5],[2,0],[3,1]],[[1,2],[4,3],[0,5]],[[3,5],[1,0],[2,4]],[[4,0],[3,2],[5,1]],[[5,2],[1,4]]];
    const seven = [[[5,6],[1,0],[2,3]],[[1,4],[3,5],[2,6]],[[3,1],[2,0],[4,5]],[[0,3],[5,2],[4,6]],[[1,5],[6,0],[4,2]],[[0,4],[2,1],[6,3]],[[1,6],[4,3],[5,0]]];
    const eight = [[[2,4],[3,6],[0,1],[7,5]],[[5,3],[2,0],[4,6],[1,7]],[[0,3],[6,5],[1,2],[7,4]],[[0,5],[6,2],[3,7],[1,4]],[[4,5],[0,6],[2,7],[3,1]],[[6,1],[3,4],[0,7],[5,2]],[[6,7],[4,0],[1,5],[2,3]]];
    
    const navigate = useNavigate();
    const db = getFirestore();
    const colRef = collection(db, "tournaments")

    

    //const docRef = doc(firestore, "tournaments", "Gx1ri40Aqqj3c9xQRLL5");
    //const docRef = doc(firestore, "tournaments", "hr1VYjMPIqjGizQHObqf");
    //const docSnap = getDoc(docRef);
    let teamsToFight = [];
    let blabla = [1,2,3,4];
    let documentIds = []
    const [array,setData]=useState([]);
    const [tournamentPass, settournamentPass] = useState("")
    const [documentRef, setdocumentRef] = useState()

    const roundsData = document.getElementById("roundsData")
        
        //getNotes();
        //const docSnap = getDoc(docRef);

    const applyResults = () => {
        let points = "";
        const container = document.getElementsByClassName("table-row");

        getDocs(colRef).then((snapshot) => {snapshot.docs.forEach((document)=>{
            const tournamentName = document.data().tournamentName;
            const storageTournamentName = JSON.parse(localStorage.getItem("userData")).tournamentName;
            
            if(tournamentName == storageTournamentName){
                const userID = document.id
                let teams = JSON.parse(document.data().teams)
                console.log(userID)
                points = document.data().points.split(",");
                console.log("points", points);

                for(let i = 0; i < container.length; ++i){
                    const firstCompetitor = container[i].childNodes[0].innerHTML
                    const secondCompetitor = container[i].childNodes[1].innerHTML
                    const results = container[i].childNodes[2].value.split(":");
                    //console.log(firstCompetitor,secondCompetitor);
                    const firstScore = parseFloat(results[0]);
                    const secondScore = parseFloat(results[1]);
                    let firstPoints = 0
                    let secondPoints = 0
                    //console.log(firstScore,secondScore)

                    if(firstScore > secondScore){
                        firstPoints = points[0]
                        secondPoints = points[2]
                    }else if(firstScore < secondScore){
                        firstPoints = points[2]
                        secondPoints = points[0]                        
                    }else{
                        firstPoints = points[1]
                        secondPoints = points[1]
                    }

                    for(let i = 0; i < teams.length; ++i){
                        let points = parseFloat(teams[i].points)
                        console.log("hey", points)
                        if(teams[i].teamName == firstCompetitor){
                            points = points + parseFloat(firstPoints)
                            teams[i].points = JSON.stringify(points)
                        }else if(teams[i].teamName == secondCompetitor){
                            points = points + parseFloat(secondPoints)
                            teams[i].points = JSON.stringify(points)
                        }
                        console.log("new",points)
                    }

                    console.log(teams)

                    const file = doc(db, "tournaments", userID);

                    let dataUpdate = {
                        useremail: document.data().useremail,
                        tournamentName: document.data().tournamentName, 
                        sport: document.data().sport,
                        teams: JSON.stringify(teams),
                        points: document.data().points
                    }

                    updateDoc(file,dataUpdate)

                    

                    //const file = doc(db, "documents", userID)

                    //updateDoc(file, )

                    //console.log(firstCompetitor,":",firstPoints,";",secondCompetitor,":",secondPoints)

                }

                return;
            }
            })})
    }
        

    const GenerateTeams = async () => {

        getDocs(colRef).then((snapshot) => {
            let ids = []
            snapshot.docs.forEach((doc)=>{

                const tournamentName = doc.data().tournamentName
                const storageTournamentName = JSON.parse(localStorage.getItem("userData")).tournamentName 
                
                if(tournamentName == storageTournamentName){

                    const teams = doc.data().teams
                    const teamsArray = JSON.parse(teams)
                    const numOfTeams = teamsArray.length
                    let arrayToItterate = []

                    switch(numOfTeams){
                        case 4:
                            arrayToItterate = four
                            break;
                        case 5:
                            arrayToItterate = five
                            break;  
                        case 6:
                            arrayToItterate = six
                            break;
                        case 7:
                            arrayToItterate = seven
                            break;    
                        case 8:
                            arrayToItterate = eight
                            break;               
                    }
        
                    //console.log("arrayToItterate:", arrayToItterate)
                    //console.log(teamsArray)
        
                    for(let i = 0; i < arrayToItterate.length; ++i){
                        for(let j = 0; j < arrayToItterate[i].length; ++j){
                            const A = arrayToItterate[i][j][0]
                            const B = arrayToItterate[i][j][1]
                            const pair = [teamsArray[A].teamName, teamsArray[B].teamName]
                            teamsToFight.push(pair)
                            //console.log(teamsArray[A].teamName, "vs.", teamsArray[B].teamName)
                        }
                    }

                    setData(teamsToFight)
                }


                
            })
        })   
    }

       
        //console.log("data:", array)

    return(<div>
            <div id="roundsData"></div>
            <button className="submit-btn" onClick={GenerateTeams}>Generate</button>
<div class="container">
	<div class="table">
		<div class="table-header">
			<div class="header__item"><a id="wins" class="filter__link filter__link--number">First team</a></div>
			<div class="header__item"><a id="total" class="filter__link filter__link--number">Second team</a></div>
            <div class="header__item"><a id="total" class="filter__link filter__link--number">Result</a></div>
		</div>
		<div class="table-content" id = "table-content">	
				
                {array.map((index)=>{return(<div id = {index} class="table-row">
                                                <div class="table-data">
                                                    {index[0]}
                                                </div>
                                                <div class="table-data">
                                                    {index[1]}
                                                </div>
                                                <input type="text" class= "table-data"></input>
                                             </div>)})}                                          
		</div>	
	</div>
</div>
<button className="submit-btn" onClick={applyResults}>Apply results</button>
<button className="submit-btn" onClick={()=>{navigate("/table")}}>Show table</button>
<button className="submit-btn" onClick={() => {{navigate('/createTournament')}}}>Return</button>
</div>)

}

export default Rounds