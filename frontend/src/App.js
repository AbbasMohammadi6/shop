import React, { useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Switch, Route } from "react-router-dom";
import Container from "./components/Container";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import CartScreen from "./screens/CartScreen";
import Chat from "./components/Chat";
import { useSelector } from "react-redux";
import socket from "./socket";
import ChatScreen from "./screens/ChatScreen";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button, select, input {
    font-family: inherit;
  }

  html{
    font-family: 'Vazir', sans-serif;
    font-weight:normal;
    direction: rtl;
  }

`;

const Main = styled.main`
  min-height: 80vh;
  margin-bottom: 1rem;
`;

const App = () => {
  const { userInfo } = useSelector((state) => state.userRegister);

  useEffect(() => {
    if (userInfo.user?.name && userInfo.user.isAdmin) {
      socket.auth = { isAdmin: true };
      socket.connect();
    }
  }, [userInfo]);

  return (
    <>
      <GlobalStyle />
      <Header />
      <Main>
        <Container>
          <Switch>
            <Route exact path="/" component={HomeScreen} />
            <Route exact path="/product/:id" component={ProductScreen} />
            <Route exact path="/register" component={RegisterScreen} />
            <Route exact path="/login" component={LoginScreen} />
            <Route exact path="/cart" component={CartScreen} />
            <Route exact path="/chat" component={ChatScreen} />
          </Switch>

          <Chat />
        </Container>
      </Main>
    </>
  );
};

export default App;
