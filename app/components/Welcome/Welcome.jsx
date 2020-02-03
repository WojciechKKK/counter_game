import React, { Component } from 'react'
import './Welcome.scss'
import Selection from './Selection/Selection.jsx'

class Welcome extends Component{
    constructor(props){
        super(props);
        this.state = {
            // YOU CAN SET A PARAM
            quantityExercises: 10, // numbers to show for qunatity exercises
            quantityTime: 10, // numbers to show for time exercises

            exercisesSelect: [], 
            timeSelect: [],
            operationsSelect: ['addition', 'substraction', 'multiplication', 'division']
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
        const { setItemGame, setTimeGame, fnCloseOption, setOperation } = this.props
        const { exercisesSelect , timeSelect, operationsSelect } = this.state;
        return(
            <div className="welcome-container">
                <h1 className="welcome-title">Game of counter</h1> 
                <Selection title="Select the quantity od exercises" select={exercisesSelect} fnSet={setItemGame}/>
                <Selection title="Select time for one exercises (seconds)" select={timeSelect} fnSet={setTimeGame} />
                <Selection title="Select option game" select={operationsSelect} fnSet={setOperation} />
                <button className="welcome-btn" onClick={fnCloseOption}>
                    Ready!
                </button>
            </div>
        )
    }
}

export default Welcome