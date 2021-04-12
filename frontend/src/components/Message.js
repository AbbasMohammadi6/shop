import React from "react";
import styled from "styled-components";

const P = styled.p`
  padding: 1rem 1rem;
  border: solid 1px #ccc;
  margin: 1rem 0;
  border: ${(props) => `solid 1px ${props.color}`};
  border-right-width: 5px;
  color: ${(props) => props.color};
`;

const Message = ({ children, variant }) => {
  const color =
    variant === "info"
      ? "dodgerblue"
      : variant === "success"
      ? "springgreen"
      : "tomato";

  return <P color={color}>{children}</P>;
};

export default Message;
