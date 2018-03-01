import React, { Component } from 'react';
import citrus from './citrusgames.svg';
import './App.css';

class App extends Component {
  render() {
    return (

      <div className="App">
        <main className="App-header">
          <img src={citrus} className="App-logo" alt="logo" />
          <h1 className="App-title"> Spelet laddas ... </h1>
        </main>

      </div>

    );
  }
}
// ReactDOM.render(<App />, document.getElementById('loader'));
// registerServiceWorker();
export default App;
