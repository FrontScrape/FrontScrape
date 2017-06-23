import auth0 from 'auth0-js';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'frontscrape.auth0.com',
    clientID: 'KxB74WNIauT43Ftg3w3ef1iAgV3mb8n5',
    redirectUri: 'http://localhost:3000',
    audience: 'https://frontscrape.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid'
  });

  login() {
    this.auth0.authorize();
  }
}

// var auth0 = require('auth0-js');

// module.exports = function Auth() {
//   auth0 = new auth0.WebAuth({
//     domain: 'frontscrape.auth0.com',
//     clientID: 'KxB74WNIauT43Ftg3w3ef1iAgV3mb8n5',
//     redirectUri: 'http://localhost:3000',
//     audience: 'https://frontscrape.auth0.com/userinfo',
//     responseType: 'token id_token',
//     scope: 'openid'
//   });

//   function login() {
//     this.auth0.authorize();
//   }
// }