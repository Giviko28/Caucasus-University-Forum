import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Home from './Home';
import Authorization from './Authorization';
import Registration from './Registration';
import {ContextProvider} from "../contexts/StateContext";
import {FlashMessage} from "./FlashMessage";
import {FlashProvider} from "../contexts/FlashContext";

function App() {
    return (
        <ContextProvider>
        <FlashProvider>
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
        </FlashProvider>
        </ContextProvider>
    )
}

export default App;
