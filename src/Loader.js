class Loader extends React.Component {
  render() {
    return (
      <div className="App">
        <main className="App-header">
          <img src="../media/img/citrusgames.svg" className="App-logo" alt="logo" />
          <h1 className="App-title"> Spelet laddas ... </h1>
        </main>
      </div>
    );
  }
}

ReactDOM.render(<Loader />, document.getElementById('loader'));

