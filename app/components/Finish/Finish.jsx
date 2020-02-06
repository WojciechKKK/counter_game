import React , { Component } from 'react'
import './Finish.scss';

class Finish extends Component{
    constructor(){
        super();
        this.state = {
            textPL: ['Wyniki gry', 'Ilość zadań', 'Punkty', 'Zagraj jeszcze raz'],
            textENG: ['Result of a game', 'All exercises', 'Points', 'Play again'],
            finalText: []
        }
    }
    componentDidMount = () => {
        if(this.props.language == 'PL'){
            this.setState({
                finalText: this.state.textPL
            })
        } else {
            this.setState({
                finalText: this.state.textENG
            })
        }
    }
    render(){
        const { finishGame, points, itemsOperationsForView, fnResetGame } = this.props
        const { finalText } = this.state;
        return(
            <div className="finish-component">
                { 
                    finishGame 
                    ? <div className="finish-container">
                        <p className="finish-title">{finalText[0]}</p>
                        <p className="finish-exercises">{finalText[1]}: {itemsOperationsForView }</p>
                        <p className="finish-points"> {finalText[2]}: { points } </p>
                        <button className="finish-btn" disabled={false} onClick={ fnResetGame }>{finalText[3]}</button>
                      </div> 
                    : null
                }
            </div>
        )
    }
}

export default Finish