import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Container from "./Container";
import { useSelector } from "react-redux";
import { getPersianNums } from "../utils/helpers";

const Main = styled.div`
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Links = styled.div`
  color: #fff;
  display: flex;
  align-items: center;
  position: relative;
  transition: height 300ms, z-index 200ms;

  @media (max-width: 700px) {
    z-index: ${({ isOpen }) => (isOpen ? "0" : "-10")};
    height: ${({ isOpen }) => (isOpen ? "3rem" : "0")};
  }

  @media (max-width: 350px) {
    flex-direction: column;
    height: ${({ isOpen }) => (isOpen ? "12rem" : "0")};
  }

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

    /* If I don't do this, the number of cart items that is above the cart icon, will get showed under the navbar */
    @media (max-width: 350px) {
      background: ${({ isOpen }) => (isOpen ? "palevioletred" : "white")};
    }
  }
`;

const Menu = styled.div`
  width: 20px;
  display: none;
  flex-direction: column;
  margin-left: 1rem;
  position: absolute;
  left: 0;
  top: 1rem;

  @media (max-width: 700px) {
    display: flex;
  }

  &:hover {
    cursor: pointer;
  }

  &:hover span {
    background: palevioletred;
  }

  & span {
    height: 2px;
    width: 25px;
    background: #fff;
    margin: 3px;
    transition: background 200ms;
  }
`;

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { userInfo } = useSelector((state) => state.userRegister);
  const { products } = useSelector((state) => state.cart);

  return (
    <Main>
      <Container>
        <Nav>
          <Logo>
            <Link to="/">eShop</Link>
          </Logo>

          <Links isOpen={isOpen}>
            <Link to="/cart">
              <I className="fas fa-shopping-cart" isOpen={isOpen}>
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
                {userInfo.user.isAdmin && <Link to="/chat">چت</Link>}
              </>
            ) : (
              <>
                <Link to="/register">ثبت نام </Link>
                <Link to="/login">ورود</Link>
              </>
            )}
          </Links>

          <Menu onClick={() => setIsOpen(!isOpen)}>
            <span />
            <span />
            <span />
          </Menu>
        </Nav>
      </Container>
    </Main>
  );
};

export default Header;
