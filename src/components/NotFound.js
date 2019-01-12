import React, { Component } from 'react';

export default class NotFound extends Component {
    render() {
        return (
            <div>
            <br></br>
            <h1>Page not found :(</h1>
            <h2>Try logging in by navigating back to the homepage.</h2>
            <br></br>
            <a href={"/"}>Go Back Home</a>
            </div>
        )
    }
}