import React , { Component } from 'react'
import './Finish.scss';

class Finish extends Component{
    constructor(){
        super()
    }
  
    render(){
        const { finishGame, points, itemsOperationsForView, fnResetGame } = this.props
        return(
            <div className="finish-component">
                { 
                    finishGame 
                    ? <div className="finish-container">
                        <p className="finish-title">Result of a game</p>
                        <p className="finish-exercises">All exercises:  { itemsOperationsForView }</p>
                        <p className="finish-points">Points: { points } </p>
                        <button className="finish-btn" disabled={false} onClick={ fnResetGame }>Play again</button>
                      </div> 
                    : null
                }
            </div>
        )
    }
}

export default Finish