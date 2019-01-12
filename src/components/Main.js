import React, {Component} from 'react';

export default class Main extends Component {
    
    render() {
        return (
            <div>
            <div>
            <br></br>
            <h2>To get started, please login.</h2>
            <div>
              <button className="btn btn-danger" onClick={this.props.auth.login}>Login</button>
            </div>
            <p id ="logged-in">Already logged in?<br></br><a href="/secret">Click Here</a></p>
          </div>
          </div>
          
        )
    }
}

