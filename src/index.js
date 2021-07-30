import * as React from 'react';
import ReactDOM from 'react-dom'; //ReactDOM用于页面渲染
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/core/styles';
import App from './App';
import theme from './theme';

//用ReactDOM.render将元素渲染到页面中
ReactDOM.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <Container fixed>
      <App />       
    </Container>
  </ThemeProvider>,
  document.querySelector('#root'),
);
