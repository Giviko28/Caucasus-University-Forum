import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Home from './Home';
import Authorization from './Authorization';
import Registration from './Registration';
import {ContextProvider} from "../contexts/StateContext";
import {Logout} from "./Logout";

function App() {
    return (
        <ContextProvider>
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/authorization">
                    <Authorization />
                </Route>
                <Route exact path="/registration">
                    <Registration />
                </Route>
                <Route exact path='*'>
                    <Redirect to='/' />
                </Route>
            </Switch>
        </Router>
        </ContextProvider>
    )
}

export default App;
