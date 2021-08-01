import React from 'react';
import styled from "styled-components";

import { NavBar } from "./sort/NavBar";
import { Controller } from "./sort/Controller";
import { AlgoDisplay } from "./sort/AlgoDisplay";

const Container = styled.div`
  margin: 0 10px;
  position: relative;
  margin-bottom: 50px;
  min-height: calc(100vh - 50px);
`;


export default function Sort(){
  return(
    <Container>
      <NavBar/>
      <Controller/>
      <AlgoDisplay/>
    </Container>
);}