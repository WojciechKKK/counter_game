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
            sumNumbers: 0,              //suma cyfr
            num1: 0,                    //number 1
            num2: 0,                    //number 2
            answer: '',                 //strzał usera
            points: 0,                  //suma punktów
            timeForAnswer: 1,           //czas na jedno zadanie
            showItemOperation: 1,       //ilosc zadań
            finish : false,             //warunkuje koniec gry
            showOptionsForUser: false,  //warunkuje widok wyboru/gry usera
            arrForNumber: [],            //miejsce dla opcji wyboru cyfr
            itemMakeOperation: 0,          //ilość operacji-widok

            //mie ulegają zmianie
            itemsOperationsForView: 1,  //wynik końcowy operacji
            timeForAnswerView: 1,       //ilość czasu na zadanie
        }
    }
    

    randomNUmbers = () => {
        let num1 = Math.ceil(Math.random() * 5 );
        let num2 = Math.ceil(Math.random() * 5 );
        let final = num1+ num2;
        this.setState({
          sumNumbers: final,
            num1: num1,
            num2: num2
        });
    }

    //sprawdza wynik z odpowiedzią
    checkNumber = () =>{
        const { answer, sumNumbers } = this.state
            
        if(answer == sumNumbers){
            this.setState({
                points: this.state.points +1,
                answer: ''
            });
        } 
        this.randomNUmbers();
    }

    //pokazuje odpowiedź -form kontrolowany
    showAnswer = (e) => {
        this.setState({
            answer: e.target.value
        })
    }

    componentWillUnmount = () => {
        clearInterval(this.timer)
    }

    //uruchamia timery i startuje gre
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
        e.currentTarget.disabled = true;
    }

    resetGame = () => {
        location.reload()
    }

    //ustawia w state ilość gier
    chooseItemsGame = (e) => {
      this.setState({
        showItemOperation: e.target.value,
        itemsOperationsForView: e.target.value,
      })
    }

    //ustawia w state czas gry
    chooseTimeForGame = (e) => {
      this.setState({
        timeForAnswer: e.target.value,
        timeForAnswerView: e.target.value
      })
    }

    //zamyka widok wyboru poziomów gry i losuje liczby
    closeOptionForUser = (e) => {
      this.setState({
        showOptionsForUser: true
      });
      // e.currentTarget.disabled = true;
      this.randomNUmbers();
      this.showOptionsNumber();
    }

    //losuje cyfry do wyboru
    showOptionsNumber = () => {
        let randomNum1 = (Math.floor(Math.random() * (4- 1) + 1));
        let randomNum2 = (Math.floor(Math.random() * (8 - 5) + 5));
        let randomNum3 = (Math.floor(Math.random() * (11 - 9) + 9));
        let arrFinal=[];
        arrFinal.push(randomNum1);
        arrFinal.push(randomNum2);
        arrFinal.push(randomNum3);
        arrFinal.push(this.state.sumNumbers);
        if(arrFinal[3] == arrFinal[0]){
            arrFinal[0] = (Math.floor(Math.random() * (4- 1) + 1));
            if(arrFinal[3] == arrFinal[0]){
                arrFinal[0] = (Math.floor(Math.random() * (4- 1) + 1));
            }
        } else if (arrFinal[3] == arrFinal[1]){
            arrFinal[1] = (Math.floor(Math.random() * (8 - 5) + 5));
            if (arrFinal[3] == arrFinal[1]){
                arrFinal[1] = (Math.floor(Math.random() * (8 - 5) + 5));
            }
        } else if(arrFinal[3] == arrFinal[2]){
            arrFinal[2] = (Math.floor(Math.random() * (11 - 9) + 9));
            if(arrFinal[3] == arrFinal[2]){
                arrFinal[2] = (Math.floor(Math.random() * (11 - 9) + 9));
            }
        }
        arrFinal.sort();
        this.setState({
            arrForNumber: arrFinal
        })
    }
   
    render(){
    const { num1, num2, answer, points, timeForAnswer, showItemOperation, finish, itemsOperationsForView, showOptionsForUser, itemMakeOperation } = this.state;
        return(
          <div className="container">
            { !showOptionsForUser
              ? <HeaderWelcome 
                  fnItemGame={this.chooseItemsGame} 
                  fnTimeGame={this.chooseTimeForGame} 
                  fnCloseOption={this.closeOptionForUser} />
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
                    fnStartGame={this.startGame}  />
                  <FooterGame 
                    finishGame={finish} 
                    points={points} 
                    fnResetGame={this.resetGame} 
                    itemsOperationsForView={itemsOperationsForView} />
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
