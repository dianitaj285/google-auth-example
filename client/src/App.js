import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    window.gapi.load('auth2', () => {
      this.auth = window.gapi.auth2.init({
        clientId:
          '132163685745-fgvpj4a7ps9a68e20qmmdptsh34m2sdj.apps.googleusercontent.com',
      });

      this.auth.isSignedIn.listen(status => {
        console.log(status);
      });

      this.auth.currentUser.listen(user => {
        const id_token = user.getAuthResponse().id_token;
        fetch('/google-signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({token: id_token}),
        })
          .then(res => res.json())
          .then(res => console.log(res));
      });
    });
  }

  handleClick = () => {
    this.auth.signIn();
  };

  render() {
    return <button onClick={this.handleClick}>Google Sign in</button>;
  }
}

export default App;
