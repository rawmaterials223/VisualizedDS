import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
}from "react-router-dom";
import Sort from './Sort';

export default function RouteMenu(){
    return(
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/Sort">Sort</Link>
                        </li>
                        <li>
                            <Link to="/Joseph">Joseph</Link>
                        </li>
                    </ul>
                </nav>
                {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/Sort">
                        <Sort/>
                    </Route>
                    <Route path="/Joseph">
                        <Joseph/>
                    </Route>
                    <Route path="/">
                        <Home/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
} 

function Home(){
    return(
        <h2>Home</h2>

    );
}

function Joseph()
{
    return <h2>Joseph</h2>;
}