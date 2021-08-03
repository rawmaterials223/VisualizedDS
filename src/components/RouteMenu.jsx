import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link as RouterLink,
}from "react-router-dom";
import Sort from './Sort';
import Joseph from './Joseph';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

export function RouteMenu(){
  return(
    <Router>
      <div>
        <nav>
          <ul>
            <li>
                <Link component={RouterLink} to="/">Home</Link>
            </li>
            <li>
                <Link component={RouterLink} to="/Sort">Sort</Link>
            </li>
            <li>
                <Link component={RouterLink} to="/Joseph">Joseph</Link>
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
  const useStyles = makeStyles({
    root:{
      midWidth: 200,
    },
    title:{
      fontSize: 14,
      margin: "0 10px",
      padding: "5px",
    },
  });

  const classes = useStyles();

  return(
    <Card className={classes.root}>
       <CardContent>
          <Typography className={classes.title}>
              1952889 鲁灵伊
          </Typography>
          <Typography className={classes.title}>
              数据结构课程设计
          </Typography>
       </CardContent>
    </Card>
  );

}