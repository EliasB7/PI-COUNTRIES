import { Landing, Home, NavBar } from "./components/index";
import "./App.css";
import { Route, useLocation } from "react-router-dom";
import Detail from "./components/Detail/Detail";
import Activity from "./components/Activity/Activity";

function App() {
  const location = useLocation();

  return (
    <div className="background">
      {location.pathname !== "/" && <NavBar />}

      <Route exact path="/">
        <Landing />
      </Route>

      <Route path="/home">
        <Home />
      </Route>

      <Route path="/newactivity">
        <Activity />
      </Route>

      <Route exact path="/countries/:id" component={Detail} />
    </div>
  );
}

export default App;
