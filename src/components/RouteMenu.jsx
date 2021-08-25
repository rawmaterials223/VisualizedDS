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
                <Link component={RouterLink} to="/">首页Home</Link>
            </li>
            <li>
                <Link component={RouterLink} to="/Sort">算法Sort</Link>
            </li>
            <li>
                <Link component={RouterLink} to="/Joseph">综合Joseph</Link>
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
    <div>
      <Card className={classes.root}>
        <CardContent>
            <Typography className={classes.title}>
              1952889 鲁灵伊
            </Typography>
            <Typography className={classes.title}>
              数据结构课程设计
            </Typography>
            <Typography className={classes.title}>
              算法实现设计：几种排序：要求随机输入一组数据，随时给出某一趟排序的变化情况
              (1)	直接插入排序、折半插入排序、希尔排序；
              (2)	冒泡排序、快速排序；
              (3)	简单选择排序；
            </Typography>
            <Typography className={classes.title}>
              综合应用设计：编号是1，2，……，n的n个人按照顺时针方向围坐一圈扔骰子（1-6），先选取一个人扔，按照扔的数字m，从扔骰子的人开始从1沿顺时针方向顺序报数，报到m时停止报数，报m的人出列，然后从他在顺时针方向的下一个人扔骰子，扔完后从1开始报数，如此，直到剩下一个人胜出。设计一个程序模拟这一过程。
              (1)	通过输入框输入1，2，……，n个人。
              (2)	模拟整个游戏过程。
              (3)	按照出列的顺序输出各个人的编号。

            </Typography>            
        </CardContent>
      </Card>
    </div>
  );
}