import ReactDOM from 'react-dom';
import React , { Component } from 'react'
import Counter from '../components/Counter/Counter.jsx'

const App = () => <Counter />

ReactDOM.render(
    <App />,
    document.getElementById('app')
)