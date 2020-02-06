import React, { Component } from 'react'
import './ActuallyGame.scss'

class ActuallyGame extends Component{
    constructor(props){
        super(props);
        this.state = {
            operation: '',
            textENG: ['Timer', 'Points', 'To end', 'Start Game!'],
            textPL: ['Czas', 'Punkty', 'Pozostało', 'Start!']
        }
    }
    componentDidMount = () => {
        const { type } = this.props;
        let info;
        if(type == 'addition' ){
            info = '+'
        } else if(type == 'substraction'){
            info = '-'
        } else if(type =='multiplication'){
            info = '*'
        } else {
            info = '/'
        };
        this.setState({
            operation: info
        })
    }
    render(){
        const {num1, num2 , finishGame, fnShowAnswer, timeForAnswer, arrRandomNumber, points, itemMakeOperation, showItemOperation, fnStartGame, language } = this.props
        const { operation, textENG , textPL } = this.state;
        return(
            <div className="actuallyGame-container">
                { 
                    !finishGame
                    ? <div className="actuallyGame-question">
                            {/* <h2>Remain exercises: {showItemOperation}</h2> */}
                            <h1 className="actuallyGame-questionText">{num1} {operation} {num2} = ? </h1>
                            <div className="actuallyGame-answer">
                                {arrRandomNumber.map((el,index) => {
                                    return(
                                        <label key={index+num1+num2} htmlFor={el}>
                                            <div className="actuallyGame-answerOptions">
                                            <input key={el} onChange={fnShowAnswer} type="radio" id={el} name="option" value={el} /> 
                                            {/* <label htmlFor={el}>{el}</label> */}{el}
                                            </div>
                                        </label>
                                    ) 
                                })}
                            </div>
                        </div>
                    : null
                }
                {
                  !finishGame
                  ?  <div className="actuallyGame-info">
                        <p className="timer">{language == 'PL' ? textPL[0] : textENG[0]}:
                            <a> {timeForAnswer} </a>
                        </p>
                        <p className="points">{language == 'PL' ? textPL[1] : textENG[1]}: 
                            <a> { points } </a>
                        </p>
                        <p className="exercises">{language == 'PL' ? textPL[2] : textENG[2]}: 
                            <a> {showItemOperation -1} </a>
                        </p>
                        <button className="actuallyGame-btn" onClick={ fnStartGame }>
                            {language == 'PL' ? textPL[3] : textENG[3]}
                        </button>
                     </div>
                    : null
                }
            </div>
        )
    }
}

export default ActuallyGame
