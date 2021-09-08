//import setCats from './service';
import './App.css';
import CatRanchers from './components/CatRanchers';


function App(){
  // setCats();

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          target="_blank"
          rel="noopener noreferrer"
        >
         Welcome to Catrancher app
        </a>
      </header> */}
      <CatRanchers/>
    </div>
  );
}

export default App;
