import React , { Component } from 'react'

class FooterGame extends Component{
    constructor(props){
        super(props)
    }
  
    render(){
        const { finishGame, points, itemsOperationsForView, fnResetGame } = this.props
        return(
            <div>
                { finishGame 
                    ? <div>
                        <h1>Result of a game</h1>
                        <h3>All exercises:  { itemsOperationsForView }</h3>
                        <h3>Points: { points }/{itemsOperationsForView}</h3>
                        <button disabled={false} onClick={ fnResetGame }>Play again</button>
                      </div> 
                    : ''
                }
            </div>
        )
    }
}

export default FooterGame