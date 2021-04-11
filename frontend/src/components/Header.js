import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Container from "./Container";

const Div = styled.div`
  background: #333;
  margin-bottom: 1rem;

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

// const Menu = styled.div`
//   width: 20px;
//   display: flex;
//   flex-direction: column;
//   margin-left: 1rem;

//   &:hover {
//     cursor: pointer;
//   }

//   &:hover span {
//     background: palevioletred;
//   }

//   & span {
//     height: 2px;
//     width: 25px;
//     background: #fff;
//     margin: 3px;
//     transition: background 200ms;
//   }
// `;

const Header = () => {
  return (
    <Div>
      <Container>
        <Nav>
          <Logo>
            <Link to="/">OliShop</Link>
          </Logo>

          <Links>
            <Link to="/register">ثبت نام </Link>
            <Link to="/login">ورود</Link>
          </Links>

          {/* <Menu>
            <span />
            <span />
            <span />
          </Menu> */}
        </Nav>
      </Container>
    </Div>
  );
};

export default Header;
