import styled, { keyframes } from "styled-components";
import Card from '@material-ui/core/Card';

export const ArrayHolder = styled.div`
  display: flex;
  height: 175px;
  align-items: center;
  padding: 15px;
  overflow: auto;
`;

export const ArrayItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  width: 50px;
  height: 50px;
  box-shadow: 0 5px 30px 0 rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  flex-shrink: 0;
`;

export const CircleItem = styled(Card)`
  display:flex;
  justify-content: center;
  aligh-items: center;
  align-content: center;
  border: 2px solid black;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-left: 3px;
  margin-right: 3px;
`;

export const swapAnimation = (distance, swapColor) => keyframes`
  0%{
    background-color: ${swapColor};
  }
  10%{
    transform: translate(0px, 0px);
    background-color: ${swapColor};
  }
  30% {
    transform: translate(0px, -50px);
    background-color: ${swapColor};
  }
  70% {
    transform: translate(-${distance * 50}px, -50px);
    background-color: ${swapColor};
  }
  99% {
    transform: translate(-${distance * 50}px, 0px);
    background-color: ${swapColor};
  }
  100%{
    transform: translate(-${distance * 50}px, 0px);
  }
`;

export const moveAnimation = () => keyframes`
  0%{
    transform: translate(0px, 0px);
  }
  100%{
    transform: translate(50px, 0px);
  }
`;

export const destinationAnimation = (distance, swapColor) => keyframes`
  0%{
    background-color: ${swapColor};
  }
  40%{
    transform: translate(0px, 0px);
    background-color: ${swapColor};
  }
  60% {
    transform: translate(0px, 50px);
    background-color: ${swapColor};
  }
  80% {
    transform: translate(-${distance * 50}px, 50px);
    background-color: ${swapColor};
  }
  99% {
    transform: translate(-${distance * 50}px, 0px);
    background-color: ${swapColor};
  }
  100%{
    transform: translate(-${distance * 50}px, 0px);
    background-color: none;
  }
`;

export const sourceAnimation = (distance, swapColor) => keyframes`
  0%{
    background-color: ${swapColor};
  }
  40%{
    transform: translate(0px, 0px);
    background-color: ${swapColor};
  }
  60% {
    transform: translate(0px, -50px);
    background-color: ${swapColor};
  }
  80% {
    transform: translate(${distance * 50}px, -50px);
    background-color: ${swapColor};
  }
  99% {
    transform: translate(${distance * 50}px, 0px);
    background-color: ${swapColor};
  }
  100%{
    transform: translate(${distance * 50}px, 0px);
    background-color: none;
  }
`;

export const dequeueAnimation = (distance, color) => keyframes`
  0% {
    background-color: ${color};
  }
  10% {
    transform: translate(0px, 0px);
    background-color: ${color};
  }
  30% {
    transform: translate(0px, 100px);
    background-color: ${color};
  }
  70% {
    transform: translate(-${distance * 50}px, 100px);
    background-color: ${color};
  }
  99% {
    transform: translate(-${distance * 50}px, 100px);
    background-color: ${color};
  }
  100% {
    transform: translate(-${distance * 50}px, 100px);
  }
`;