import React, { Component } from 'react'


class BodyGame extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const {num1, num2 , finishGame, fnShowAnswer, timeForAnswer, arrRandomNumber, points, itemMakeOperation, showItemOperation, fnStartGame } = this.props
        return(
            <div>
                { !finishGame
                    ? <div>
                        {/* <h2>Remain exercises: {showItemOperation}</h2> */}
                        <div className="showNumbers">
                        <h1>{num1} + {num2} = ? </h1>
                        <div>
                            {arrRandomNumber.map((el,index) => {
                                return(
                                    <label key={el} htmlFor={el}>
                                        <div className="radioOption">
                                        <input key={el} onChange={fnShowAnswer} type="radio" id={el} name="option" value={el} /> 
                                        {/* <label htmlFor={el}>{el}</label> */}{el}
                                        </div>
                                    </label>
                                ) 
                            })}
                        </div>
                        </div>
                        <div className="timer-points">
                            <h2 className="timer">Timer: 
                                <b style={{color: 'red'}}> 
                                    {timeForAnswer} 
                                </b>
                            </h2>
                            <h2 className="points">Points: 
                                <a style={{color: 'green'}}> 
                                    { points }
                                </a>
                            </h2>
                            <h2 className="exercises">To end: 
                                <a style={{color: 'royalblue'}}> 
                                    {showItemOperation -1}
                                </a>
                            </h2>
                            <button className="startCount" onClick={ fnStartGame }>
                                Start Game!
                            </button>
                        </div>
                      </div>
                    : ''
                }
            </div>
        )
    }
}

export default BodyGame
