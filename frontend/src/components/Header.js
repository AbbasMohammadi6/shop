import React from "react";
import styled from "styled-components";
import Container from "./Container";

const Div = styled.div`
  background: #333;

  & a {
    transition: color 200ms;
  }

  & a:hover {
    color: palevioletred;
  }
`;

const Logo = styled.h1`
  color: #fff;
  padding: 0 1rem;
  letter-spacing: 1px;
  font-size: 2rem;
`;

const Nav = styled.nav`
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Links = styled.div`
  color: #fff;

  & a {
    padding: 1rem;
    margin: 0 0.5rem;
  }
`;

const Header = () => {
  return (
    <Div>
      <Container>
        <Nav>
          <Links>
            <a href="#">عضو شدن </a>
            <a href="#">وارد شدن</a>
          </Links>

          <Logo>
            <a href="#">OliShop</a>
          </Logo>
        </Nav>
      </Container>
    </Div>
  );
};

export default Header;
