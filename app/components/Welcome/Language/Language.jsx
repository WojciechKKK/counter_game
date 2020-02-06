import React , { Component } from 'react';
import './Language.scss';

class Language extends Component{
    constructor(){
        super();
    }
    setHandleLanguage = (e) => {
        let allLanguages = document.querySelectorAll('.language');
        for(let i  = 0 ; i < allLanguages.length; i++){
            allLanguages[i].classList.remove('active')
        }
        e.currentTarget.classList.add('active');
        console.log(e.currentTarget.innerText);
        if(typeof this.props.changeLanguage == 'function'){
            this.props.changeLanguage(e.currentTarget.innerText);
        }
    }
    render(){
        return(
            <div className="language-component">
                <p className="language" onClick={this.setHandleLanguage}>PL</p>
                / 
                <p className="language active" onClick={this.setHandleLanguage}>ENG</p>
            </div>
        )
    }
}

export default Language