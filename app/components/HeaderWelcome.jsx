import React, { Component } from 'react'

class HeaderWelcome extends Component{
    constructor(props){
        super(props);
        this.state = {
            quan: 20 // choose numbers of qunatity & time 
        }
    }

    render(){
        let chooseItemsGame = [];
        let chooseTimeForGame = [];
        //make a option numebrs
      for(let i = 1 ; i <= this.state.quan; i++){
        chooseItemsGame.push(i);
        chooseTimeForGame.push(i.toFixed(2))
      };
        const {fnItemGame, fnTimeGame, fnCloseOption } = this.props
        return(
            <div>
                <h1>Game of counter</h1> 
                <p>Select the quantity of exercises: 
                    <select onChange={fnItemGame}>
                        {chooseItemsGame.map(el => {
                            return <option key={el} value={el}>
                                        {el}
                                    </option>})}
                    </select>
                </p>
                <p>Select time for one exercise (seconds): 
                    <select onChange={ fnTimeGame }>
                        {chooseTimeForGame.map(el => {
                            return <option key={el} value={el}>
                                        {Math.floor(el)}
                                    </option>
                        })}
                    </select> 
                </p>
                <button onClick={ fnCloseOption }>
                    Ready!
                </button>
            </div>
        )
    }
}

export default HeaderWelcome