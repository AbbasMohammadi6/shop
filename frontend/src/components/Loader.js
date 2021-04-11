import React from "react";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to{
    transform: rotate(360deg);
  }
`;

const Div = styled.div`
  width: ${(props) => (props.size ? props.size : "100px")};
  height: ${(props) => (props.size ? props.size : "100px")};
  border: 5px solid palevioletred;
  border-left-color: transparent;
  border-radius: 100%;
  animation: ${rotate} 1.5s linear infinite;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const Loader = ({ size }) => {
  return (
    <Container>
      <Div size={size} />
    </Container>
  );
};

export default Loader;
