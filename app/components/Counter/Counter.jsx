import React, { Component } from 'react'
import '../../styles/reset.scss';
import './Counter.scss'

import Finish from '../Finish/Finish.jsx'
import Welcome from '../Welcome/Welcome.jsx'
import ActuallyGame from '../ActuallyGame/ActuallyGame.jsx'

class Counter extends Component{
    constructor(props){
        super(props);
        this.state = {
            sumNumbers: 0,              //sum numbers
            num1: 0,                    //number 1
            num2: 0,                    //number 2
            answer: '',                 //user's choose
            points: 0,                  //sum points
            timeForAnswer: 0,           //time for one exercises
            showItemOperation: 0,       //items exercises
            finish : false,             //finish game ?
            showOptionsForUser: false,  //show view/game ?
            arrForNumber: [],            //place for oprtions numbers
            itemMakeOperation: 0,          //item operations -view

            //mie ulegają zmianie
            itemsOperationsForView: 1,  //final result of the operation
            timeForAnswerView: 1,       //time for one exercises
            selectOperation:''          //select mathemathic operation
        }
    }
    

    randomNUmbers = () => {
      const { selectOperation } = this.state;
      let num1;
      let num2;
      let final;

      if(selectOperation == 'addition' ){
        //set a param for addition
        num1 = this.chooseRandomNumber(1,50);
        num2 = this.chooseRandomNumber(1,50);
        final = num1 + num2;
      } else if(selectOperation == 'substraction'){
        //set a param for substraction
        num1 = this.chooseRandomNumber(11,100);
        num2 = this.chooseRandomNumber(1,10);
        final = num1 - num2;
      } else if(selectOperation =='multiplication'){
        //set a param for multiplication
        num1 = this.chooseRandomNumber(1,10);
        num2 = this.chooseRandomNumber(1,10);
        final = num1 * num2;
      } else { 
        //set a param for division
        num1 = this.chooseRandomNumber(1,100);
        let dividersNum = [];
        for(let i = 0 ; i < num1; i++){
          if(num1 % i === 0){
            dividersNum.push(i)
          }
        }
        //random num from arr
        num2 = dividersNum[Math.floor(dividersNum.length * Math.random())]
        final = num1 / num2;
      };
        this.setState({
          sumNumbers: final,
            num1: num1,
            num2: num2,
            answer: ''
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
        e.currentTarget.classList.add('clickOn');
    }

    resetGame = () => {
        location.reload()
    }

    //set state game items
    chooseItemGame = (e) => {
      this.setState({
        showItemOperation: e.target.value,
        itemsOperationsForView: e.target.value,
      })
    }

    //set state game time
    chooseTimeGame = (e) => {
      const textFromUser = e.target.value;
      const textFromUserToNumber = Number(textFromUser);
      this.setState({
        timeForAnswer: textFromUserToNumber.toFixed(2),
        timeForAnswerView: textFromUserToNumber.toFixed(2)
      })
    }

    //close the view level of game and random numbers
    closeOptionForUser = (e) => {
      const { showItemOperation, timeForAnswer, selectOperation} = this.state;
      if(showItemOperation == 0 || timeForAnswer == 0 || selectOperation == ''){
        return alert('Complete all options :) ')
      }
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
        while(i < 100){
            let number = (Math.floor(Math.random() * (100- 1) + 1));
            if(arrFinal.indexOf(number) == -1){
                arrFinal.push(number);
                };
            if(arrFinal.length == 4){
                break;
                }
            i++
        }
        // console.log(arrFinal);
        arrFinal.sort();
        this.setState({
            arrForNumber: arrFinal,
        })
    }
   
    setOperation = (e) => {
      this.setState({
        selectOperation: e.target.value
      })
    }

    render(){
    const { num1, num2, points, timeForAnswer, showItemOperation, finish, itemsOperationsForView, showOptionsForUser, itemMakeOperation, selectOperation } = this.state;
        return(
          <div className="counter-container">
            { 
              !showOptionsForUser
                ? <Welcome 
                    setItemGame={this.chooseItemGame} 
                    setTimeGame={this.chooseTimeGame} 
                    fnCloseOption={this.closeOptionForUser} 
                    setOperation={this.setOperation}
                  />
                : <div className="counter-game">
                    <ActuallyGame 
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
                      type={selectOperation}
                    />
                    <Finish 
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

export default Counter
