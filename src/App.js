import React, { Component } from 'react';
import './App.css';
import Main from './components/Main';
import Secret from './components/Secret';
import NotFound from './components/NotFound'
import Callback from './components/Callback';

class App extends Component {

  render() {

    let mainComponent = ""
    switch(this.props.location){
      case "":
        mainComponent = <Main {...this.props} />
        break;
      case "secret":
        mainComponent = this.props.auth.isAuthenticated() ? 
        <Secret 
        {...this.props}
        score = {localStorage.getItem("score")}
        // changeScore = {this.handleScoreChange}
        />
         : <NotFound />
        break;
      case "callback":
        mainComponent = <Callback />
        break;

      default:
        mainComponent = <NotFound />
    }

    return (
      <div className="App">
      <header className="App-header">
            <h1 className = "App-title">Welcome to SlayTags! {localStorage.getItem('nickname') &&  localStorage.getItem('nickname')}</h1>
          </header>
        {mainComponent}
    
      </div>
    );
  }
  
}


export default App;
