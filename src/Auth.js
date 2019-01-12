/* eslint no-restricted-globals:0 */
import auth0 from "auth0-js";

const LOGIN_SUCCESS_PAGE = "/secret";
const LOGIN_FAILURE_PAGE = "/";


export default class Auth {

    auth0 = new auth0.WebAuth({
        domain: 'slaytags.auth0.com',
        clientID: '2YFgHUCs4tlkLxgXBFpr4wMtkrH2jlqL',
        redirectUri: 'http://localhost:3000/callback',
        responseType: 'token id_token',
        scope: 'openid profile'
    });

    login() {
        this.auth0.authorize();
    }

    constructor() {
        this.login = this.login.bind(this);
        this.getProfile = this.getProfile.bind(this);
    }

    handleAuthentication() {
        if(localStorage.getItem("score") === "undefined"){
            localStorage.setItem("score",0);
        }
        this.auth0.parseHash((err, authResults) => {
            console.log(authResults);
            if (authResults && authResults.accessToken && authResults.idToken) {
                // set access token, id token, and expiry at first auth
                localStorage.setItem("access_token", authResults.accessToken);
                localStorage.setItem("id_token", authResults.idToken);
                let expiresAt = JSON.stringify((authResults.expiresIn) * 1000 + new Date().getTime());
                localStorage.setItem("expires_at", expiresAt);
                // get the Auth provider
                var authProvider = authResults.idTokenPayload.sub.split("|")[0];
                localStorage.setItem("nickname", authResults.idTokenPayload.nickname.replace(/\s/g, ''));

                console.log("Auth provider: ", authProvider);
                localStorage.setItem("picture", authResults.idTokenPayload.picture)
                if (authProvider === "facebook") {
                    if(localStorage.getItem("fb_auth") === null){
                    localStorage.setItem("gender", authResults.idTokenPayload.gender);
                    localStorage.setItem("fb_nickname", authResults.idTokenPayload.nickname);
                    var facebookImage = authResults.idTokenPayload.picture;
                    localStorage.setItem("fb_picture", facebookImage);
                    localStorage.setItem("fb_auth", true);
                    // increment the score upon authentication
                    var newScore = parseInt(localStorage.getItem("score"));
                    if (localStorage.getItem("score") === null) {
                        newScore = 0;
                    }
                    localStorage.setItem("score", parseInt(newScore += 1));
                    }
                }
        
                else if (authProvider === "twitter") {
                    if(localStorage.getItem("tw_auth") === null){
                    localStorage.setItem("tw_nickname", authResults.idTokenPayload.nickname);
                    localStorage.setItem("tw_picture", authResults.idTokenPayload.picture);
                    localStorage.setItem("tw_auth", true);
                    // increment the score upon authentication
                    var newScore = parseInt(localStorage.getItem("score"));
                    if (localStorage.getItem("score") === null) {
                        newScore = 0;
                    }
                    localStorage.setItem("score", parseInt(newScore += 1));
                }
                }
                else if (authProvider === "linkedin") {
                    if(localStorage.getItem("ln_auth") === null){
                    localStorage.setItem("ln_nickname", authResults.idTokenPayload.nickname);
                    localStorage.setItem("ln_picture", authResults.idTokenPayload.picture);
                    localStorage.setItem("ln_auth", true);
                    // increment the score upon authentication
                    var newScore = parseInt(localStorage.getItem("score"));
                    if (localStorage.getItem("score") === null) {
                        newScore = 0;
                    }
                    localStorage.setItem("score", parseInt(newScore += 1));
                }
                }
                else if (authProvider === "github") {
                    if(localStorage.getItem("gh_auth") === null){
                    localStorage.setItem("gh_nickname", authResults.idTokenPayload.nickname);
                    localStorage.setItem("gh_picture", authResults.idTokenPayload.picture);
                    localStorage.setItem("gh_auth", true);
                    // increment the score upon authentication
                    var newScore = parseInt(localStorage.getItem("score"));
                    if (localStorage.getItem("score") === null) {
                        newScore = 0;
                    }
                    localStorage.setItem("score", parseInt(newScore += 1));
                }
                }
                else if (authProvider === "google-oauth2") {
                    if(localStorage.getItem("gg_auth") === null){
                    localStorage.setItem("gg_nickname", authResults.idTokenPayload.nickname);
                    localStorage.setItem("gg_picture", authResults.idTokenPayload.picture);
                    localStorage.setItem("gg_auth", true);
                    // increment the score upon authentication
                    var newScore = parseInt(localStorage.getItem("score"));
                    if (localStorage.getItem("score") === null) {
                        newScore = 0;
                    }
                    localStorage.setItem("score", parseInt(newScore += 1));
                }
            }
                location.hash = "";
                location.pathname = LOGIN_SUCCESS_PAGE;

            } else if (err) {
                location.pathname = LOGIN_FAILURE_PAGE;
                console.log(err);
            }
        });
    }

    isAuthenticated() {
        // Check whether the current time is past the
        // access token's expiry time
        let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
        return new Date().getTime() < expiresAt;
    }

    getProfile(cb) {
        this.auth0.client.userInfo(this.accessToken, (err, profile) => {
            if (profile) {
                this.userProfile = profile;
            }
            cb(err, profile);
        });
    }

    facebookLogout() {
        // remove facebook local storage data
        localStorage.removeItem("gender");
        localStorage.removeItem("fb_nickname");
        localStorage.removeItem("fb_picture");
        localStorage.removeItem("fb_auth");
        location.pathname = LOGIN_SUCCESS_PAGE;
        // Remove isLoggedIn flag from localStorage
        localStorage.removeItem('isLoggedIn');
        location.reload();
        // decrement score 
        // increment the score upon authentication
        var newScore = parseInt(localStorage.getItem("score"));
        if (localStorage.getItem("score") === 0) {
            newScore = 0;
        }
        localStorage.setItem("score", parseInt(newScore -= 1));
    }

    twitterLogout() {
        // remove twitter local storage data    
        localStorage.removeItem("tw_nickname");
        localStorage.removeItem("tw_picture");
        localStorage.removeItem("tw_auth");
        location.pathname = LOGIN_SUCCESS_PAGE;
        // Remove isLoggedIn flag from localStorage
        localStorage.removeItem('isLoggedIn');
        location.reload();
        var newScore = parseInt(localStorage.getItem("score"));
        if (localStorage.getItem("score") === 0) {
            newScore = 0;
        }
        localStorage.setItem("score", parseInt(newScore -= 1));
    }

    githubLogout() {
        // remove github local storage data
        localStorage.removeItem("gh_nickname");
        localStorage.removeItem("gh_picture");
        localStorage.removeItem("gh_auth");
        location.pathname = LOGIN_SUCCESS_PAGE;
        // Remove isLoggedIn flag from localStorage
        localStorage.removeItem('isLoggedIn');
        location.reload();
        var newScore = parseInt(localStorage.getItem("score"));
        if (localStorage.getItem("score") === 0) {
            newScore = 0;
        }
        localStorage.setItem("score", parseInt(newScore -= 1));
    }

    googleLogout() {
        // remove google local storage data
        localStorage.removeItem("gg_nickname");
        localStorage.removeItem("gg_picture");
        localStorage.removeItem("gg_auth");
        location.pathname = LOGIN_SUCCESS_PAGE;
        // Remove isLoggedIn flag from localStorage
        localStorage.removeItem('isLoggedIn');
        location.reload();
        var newScore = parseInt(localStorage.getItem("score"));
        if (localStorage.getItem("score") === 0) {
            newScore = 0;
        }
        localStorage.setItem("score", parseInt(newScore -= 1));
    }

    linkedinLogout() {
        // remove linkedin local storage data
        localStorage.removeItem("ln_nickname");
        localStorage.removeItem("ln_picture");
        localStorage.removeItem("ln_auth");
        location.pathname = LOGIN_SUCCESS_PAGE;
        localStorage.removeItem('isLoggedIn');
        location.reload();
        var newScore = parseInt(localStorage.getItem("score"));
        if (localStorage.getItem("score") === 0) {
            newScore = 0;
        }
        localStorage.setItem("score", parseInt(newScore -= 1));

    }

    logoutOfAll() {
        localStorage.clear();
        location.pathname = LOGIN_FAILURE_PAGE;
    }

}