import React, { Component } from 'react'
import './ActuallyGame.scss'

class ActuallyGame extends Component{
    constructor(props){
        super(props);
        this.state = {
            operation: ''
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
        const {num1, num2 , finishGame, fnShowAnswer, timeForAnswer, arrRandomNumber, points, itemMakeOperation, showItemOperation, fnStartGame } = this.props
        const { operation } = this.state;
        return(
            <div className="actuallyGame-container">
                { 
                    !finishGame
                    ? <div className="actuallyGame-question">
                            {/* <h2>Remain exercises: {showItemOperation}</h2> */}
                            <h1>{num1} {operation} {num2} = ? </h1>
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
                        <p className="timer">Timer:
                            <a> {timeForAnswer} </a>
                        </p>
                        <p className="points">Points: 
                            <a> { points } </a>
                        </p>
                        <p className="exercises">To end: 
                            <a> {showItemOperation -1} </a>
                        </p>
                        <button className="actuallyGame-btn" onClick={ fnStartGame }>
                            Start Game!
                        </button>
                     </div>
                    : null
                }
            </div>
        )
    }
}

export default ActuallyGame
