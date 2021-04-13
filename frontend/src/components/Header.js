import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Container from "./Container";
import { useSelector } from "react-redux";
import { getPersianNums } from "../utils/helpers";

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

const I = styled.i`
  padding: 0.7rem;
  position: relative;

  &:hover span {
    color: palevioletred;
    background: white;
    width: 20px;
    height: 20px;
    line-height: 26px;
  }

  & span {
    font-family: "Shabnam", sans-serif;
    transition: all 300ms;
    position: absolute;
    top: 0;
    right: 0;
    width: 17px;
    height: 17px;
    line-height: 20px;
    text-align: center;

    display: inline-block;
    background: palevioletred;
    border-radius: 100%;
    color: white;
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
  const { userInfo } = useSelector((state) => state.userRegister);
  const { products } = useSelector((state) => state.cart);

  return (
    <Div>
      <Container>
        <Nav>
          <Logo>
            <Link to="/">OliShop</Link>
          </Logo>

          <Links>
            <Link to="/cart">
              <I className="fas fa-shopping-cart">
                {products.length ? (
                  <span>{getPersianNums(products.length)}</span>
                ) : (
                  ""
                )}
              </I>
            </Link>
            {userInfo?.user?.name ? (
              <>
                <Link to="/me">{userInfo.user.name}</Link>
              </>
            ) : (
              <>
                <Link to="/register">ثبت نام </Link>
                <Link to="/login">ورود</Link>
              </>
            )}
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
