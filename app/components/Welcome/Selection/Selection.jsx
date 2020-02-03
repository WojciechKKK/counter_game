import React, { Component } from 'react';
import './Selection.scss';
class Selection extends Component{
    constructor(){
        super();
    }
    render(){
        const { title, select } = this.props;
        return(
            <div className="selection-container">
                <p className="selection-title">
                    {title}
                </p>
                <select onChange={this.props.fnSet} className="selection-select"  >
                    <option key={0} value="-" className="selection-option">-</option>
                    {
                        select.map(el => <option key={el} value={el} className="selection-option">{el}</option> )
                    }
                </select>
            </div>
        )
    }
}

export default Selection