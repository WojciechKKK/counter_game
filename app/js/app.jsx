import ReactDOM from 'react-dom';
import React, { Component } from 'react'
import '../styles/style.css'
import FooterGame from '../components/FooterGame.jsx'
import BodyGame from '../components/BodyGame.jsx'
import HeaderWelcome from '../components/HeaderWelcome.jsx'



class MathAnswersGame extends Component{
    constructor(props){
        super(props);
        this.state = {
            sumNumbers: 0,              //sum numbers
            num1: 0,                    //number 1
            num2: 0,                    //number 2
            answer: '',                 //user's choose
            points: 0,                  //sum points
            timeForAnswer: 1,           //time for one exercises
            showItemOperation: 1,       //items exercises
            finish : false,             //finish game ?
            showOptionsForUser: false,  //show view/game ?
            arrForNumber: [],            //place for oprtions numbers
            itemMakeOperation: 0,          //item operations -view

            //mie ulegają zmianie
            itemsOperationsForView: 1,  //final result of the operation
            timeForAnswerView: 1,       //time for one exercises
        }
    }
    

    randomNUmbers = () => {
        let num1 = this.chooseRandomNumber(1,6);
        let num2 = this.chooseRandomNumber(1,6);
        let final = num1+ num2;
        this.setState({
          sumNumbers: final,
            num1: num1,
            num2: num2
        });
    }

    //check final with answer
    checkNumber = () => {
        const { answer, sumNumbers } = this.state
            if(answer == sumNumbers){
            this.setState({
                points: this.state.points +1,
                answer: ''
            });
        } 
        this.randomNUmbers();
    }

    //show answer - form controlled
    showAnswer = (e) => {
        this.setState({
            answer: e.target.value
        })
    }

    componentWillUnmount = () => {
        clearInterval(this.timer)
    }

    //start timer & game 
    startGame = (e) => {
        this.showOptionsNumber();
        this.timer = setInterval(()=>{
          //zmniejszam czas 
            this.setState({
              timeForAnswer: (this.state.timeForAnswer -0.01).toFixed(2)
            });

            //sprawdzam czy nie jest przekroczony
            if(this.state.timeForAnswer == 0){
              this.checkNumber();
              this.showOptionsNumber();
                this.setState({
                  timeForAnswer: this.state.timeForAnswerView,
                  showItemOperation: this.state.showItemOperation - 1,
                  itemMakeOperation: this.state.itemMakeOperation + 1,
                  answer: ''
                });
                
              //sprawdzam czy ilość gier nie jest przekroczona
              if(this.state.showItemOperation == 0){
                  clearInterval(this.timer);
                  this.setState({
                      answer: '',
                      finish: true
                  })
                }
            }
        },10);
        e.currentTarget.disabled = 'true'
        e.currentTarget.className = 'clickOn'
    }

    resetGame = () => {
        location.reload()
    }

    //set state game items
    chooseItemsGame = (e) => {
      this.setState({
        showItemOperation: e.target.value,
        itemsOperationsForView: e.target.value,
      })
    }

    //set state game time
    chooseTimeForGame = (e) => {
      this.setState({
        timeForAnswer: e.target.value,
        timeForAnswerView: e.target.value
      })
    }

    //close the view level of game and random numbers
    closeOptionForUser = (e) => {
      this.setState({
        showOptionsForUser: true
      });
      // e.currentTarget.disabled = true;
      this.randomNUmbers();
      this.showOptionsNumber();
    }

    //random number (min,max)
    chooseRandomNumber = (min,max) => {
        let number = (Math.floor(Math.random() * (max- min) + min));
        return number
    }

    //random numebrs for choice
    showOptionsNumber = () => {
        let arrFinal=[];
        arrFinal.push(this.state.sumNumbers);
        let i = 0;
        while(i < 10){
            let number = (Math.floor(Math.random() * (11- 1) + 1));
            if(arrFinal.indexOf(number) == -1){
                arrFinal.push(number);
                };
            if(arrFinal.length == 4){
                break;
                }
            i++
        }
        console.log(arrFinal);
        arrFinal.sort();
        this.setState({
            arrForNumber: arrFinal,
        })
    }
   
    render(){
    const { num1, num2, points, timeForAnswer, showItemOperation, finish, itemsOperationsForView, showOptionsForUser, itemMakeOperation } = this.state;
        return(
          <div className="container">
            { !showOptionsForUser
              ? <HeaderWelcome 
                    fnItemGame={this.chooseItemsGame} 
                    fnTimeGame={this.chooseTimeForGame} 
                    fnCloseOption={this.closeOptionForUser} 
                />
              : <div>
                    <BodyGame 
                        finishGame={finish} 
                        num1={num1} 
                        num2={num2} 
                        fnShowAnswer={this.showAnswer} 
                        timeForAnswer={timeForAnswer}
                        arrRandomNumber={this.state.arrForNumber}
                        points={points} 
                        itemMakeOperation={itemMakeOperation}
                        showItemOperation={showItemOperation}
                        fnStartGame={this.startGame}  
                    />
                    <FooterGame 
                        finishGame={finish} 
                        points={points} 
                        fnResetGame={this.resetGame} 
                        itemsOperationsForView={itemsOperationsForView} 
                    />
                </div>
            }
          </div>
        )
    }
}

const App = () =>  <MathAnswersGame />

ReactDOM.render(
    <App />,
    document.getElementById('app')
)
