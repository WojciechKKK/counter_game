import React, { Component } from 'react'
import './Welcome.scss'
import Selection from './Selection/Selection.jsx'
import Language from './Language/Language.jsx'

class Welcome extends Component{
    constructor(props){
        super(props);
        this.state = {
            // YOU CAN SET A PARAM
            quantityExercises: 10, // numbers to show for qunatity exercises
            quantityTime: 10, // numbers to show for time exercises

            exercisesSelect: [], 
            timeSelect: [],
            operationsSelectENG: ['addition', 'substraction', 'multiplication', 'division'],
            operationsSelectPL: ['dodawanie', 'odejmowanie', 'mnożenie', 'dzielenie'],
            textENG:["Select the quantity od exercises", "Select time for one exercises (seconds)", "Select option game", "Ready!"],
            textPL:["Wybierz ilość zadań", "Wybierz czas na jedno zadanie (sekundy)", "Wybierz działanie", "Start!"]
        }
    }

    
    componentDidMount = () => {
        const { quantityExercises, quantityTime } = this.state;
        let exercisesSelect = [];
        let timesSelect = [];
        for(let i = 1 ; i <= quantityExercises; i++ ){
            exercisesSelect.push(i)
        }
        for(let i = 1 ; i <= quantityTime; i++ ){
            timesSelect.push(i)
        }

        this.setState({
            exercisesSelect: exercisesSelect, 
            timeSelect: timesSelect
        })
    }

    render(){
        const { setItemGame, setTimeGame, fnCloseOption, setOperation, changeLanguage , language,  } = this.props
        const { exercisesSelect , timeSelect, operationsSelect, textENG, textPL, operationsSelectENG, operationsSelectPL } = this.state;
        return(
            <div className="welcome-container">
                <h1 className="welcome-title">Game of counter</h1> 
                <Language changeLanguage={changeLanguage} language={language}/>
                <Selection title={language == 'PL' ? textPL[0] : textENG[0]} select={exercisesSelect} fnSet={setItemGame}/>
                <Selection title={language == 'PL' ? textPL[1] : textENG[1]} select={timeSelect} fnSet={setTimeGame} />
                <Selection title={language == 'PL' ? textPL[2] : textENG[2]} select={language == 'PL' ? operationsSelectPL : operationsSelectENG} fnSet={setOperation} />
                <button className="welcome-btn" onClick={fnCloseOption}>
                    {language == 'PL' ? textPL[3] : textENG[3]}
                </button>
            </div>
        )
    }
}

export default Welcome