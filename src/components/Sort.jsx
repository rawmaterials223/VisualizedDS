import React from "react";
import styled from "styled-components";
import { SortNavBar } from "./NavBar";
import { SortController } from "./Controller";
import { SortAlgoDisplay } from "./AlgoDisplay";

const Container = styled.div`
  margin: 0 10px;
  min-height: calc(100vh - 50px);
  position: relative;
  margin-bottom: 50px;
`;

export default function Sort() {
  return (
    <Container>
      <SortNavBar />
      <SortController />
      <SortAlgoDisplay />
    </Container>
  );
}
