# Data Structure Design 数据结构课程设计

## What is it? 是什么？

This is the course of data structure design of Tongji Univeristy in the summer semester. It can realize the visualization of **Sort** and **Joseph**. 

这是同济大学大二暑期实践周数据结构课程设计的成品。
- 几种排序。直接插入排序、折半插入排序、希尔排序、冒泡排序、快速排序、简单选择排序。
- 约瑟夫环。n个人围坐掷骰子(1-6)，先选取一个人扔，按照数字m从扔骰子的人开始从1沿顺序报数，报到m停止报数，报m的人出列，然后从他的顺时针方向的下一个人开始扔骰子，扔完后从1开始报数，以此类推直至剩下一个胜出。

## How to run in local 怎样运行？

- 该程序由[React](https://react.docschina.org/)框架搭建
- 先保证下载[Node.js](https://nodejs.org/zh-cn/) **v14.17.3**


```sh
git clone git@github.com:rawmaterials223/VisualizedDS.git
npm install
npm start
```

## Technologies? 使用哪些工具？
- [React](https://github.com/facebook/react) 三大前端框架之一(Vue, Angular)
- [Material-UI](https://material-ui.com/zh/) 当下流行的React UI框架
- [styled-components](https://www.w3cschool.cn/styledcomponents/) css-in-js，在React中绑定css样式到组件
- [Zustand](https://github.com/pmndrs/zustand) hooks based state management library 状态管理工具
