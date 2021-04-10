import React from "react";
import styled from "styled-components";

const Div = styled.div`
  width: 80%;
  max-width: 1000px;
  margin: 0 auto;
`;

const Container = ({ children }) => {
  return <Div>{children}</Div>;
};

export default Container;
