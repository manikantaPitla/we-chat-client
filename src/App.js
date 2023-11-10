import "./App.css";
import { Switch, Route } from "react-router-dom";
import Auth from "./components/Auth";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => (
  <>
    <Switch>
      <Route exact path="/auth" component={Auth} />
      <ProtectedRoute exact path="/" component={Home} />
      {/* <Route exact path="/register" component={Register} />
      <ProtectedRoute exact path="/settings" component={Settings} /> */}
    </Switch>
  </>
);

export default App;
