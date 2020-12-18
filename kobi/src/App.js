import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Question from "./Pages/Question";
import Answer from "./Pages/Answer";
import TesAns from "./Pages/TesAns";
import Rep from "./Pages/Reports";
function App() {
  return (
    <div className="App">
    <BrowserRouter>
        <Switch>
          <Route path="/Home" component={Home} />
          <Route path="/Qus" component={Question} />
          <Route path="/Ans" component={Answer} />
          <Route path="/Reports" component={Rep} />
          <Route path="/TesterAns" component={TesAns} />
          <Route path="/" component={Login} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
