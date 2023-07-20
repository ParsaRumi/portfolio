import "bootstrap/dist/css/bootstrap.min.css";
import "./style/App.css";
import Header from "./component/Header";
import Router from "./Router";

function App() {
  return (
    <div className="App">
      <Header />
      <Router/>
    </div>
  );
}

export default App;
