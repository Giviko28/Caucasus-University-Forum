import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './Home';
import Authorization from './Authorization';
import Registration from './Registration';
import {ContextProvider} from "../contexts/StateContext";

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
            </Switch>
        </Router>
        </ContextProvider>
    )
}

export default App;
