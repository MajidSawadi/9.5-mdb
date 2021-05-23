import { Route, Switch } from "react-router-dom";

import "./App.css";

import { HomePage, AuthPage, FourOhFourPage, RegisterPage } from "./pages";

import { ProtectedRoute } from "./components";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path={`/login`} component={AuthPage} />
        <Route path={`/sign`} component={RegisterPage} />
        <ProtectedRoute exact path={"/"} component={HomePage} />
        <Route path={`/*`} component={FourOhFourPage} />
      </Switch>
    </div>
  );
}

export default App;
