import React, { Component } from 'react';
/*eslint no-useless-concat: "error"*/
// var queryString = "https://api.twitter.com/oauth/authorize?oauth_token=";

export default class Secret extends Component {
    render() {
        return (
            <div>
                <div>
                    <hr />Please login into <b>one or more</b> of the following apps to generate your score.
                <button className="btn btn-lg btn-danger" onClick={this.props.auth.login}>Login</button> <hr />
                    <button className="btn btn-info functional-links" onClick={this.props.auth.logoutOfAll}>Logout of All Accounts</button>
                    <button className="btn btn-info functional-links" onClick={this.props.auth.share}>Share with friends!</button>
                </div>
                <br></br>
                <form className = "email-share">
                    <div className="form-group">
                        <label for="exampleInputEmail1">Get notified of your friend's reputation!</label>
                        <input type="email" className="form-control" id="user-email" aria-describedby="emailHelp" placeholder="Enter your email"></input>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <button type="submit" className="btn btn-primary" id = "notify-submit">Submit</button>
                </form>
            </div>
        )
    }
}
