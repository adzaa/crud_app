import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Index from './components/Index'
import SideBar from './components/SideBar';


import "./App.css"


class App extends Component
{
    render() {
        return(
        <>
            <div className='sidebar'>
                <SideBar/>
            </div>
                <Router>
            <div className='curd'>
                <Route exact path="/" component={Index} />  
            </div>
              </Router>
        </>

        )
    }
}
export default App