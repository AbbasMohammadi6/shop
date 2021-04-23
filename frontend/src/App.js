import React from "react";
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
import { useDispatch } from "react-redux";
import { addUsers, addOneUser, removeUser } from "./slices/chatUsers";
import socket from "./socket";

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
  const dispatch = useDispatch();

  socket.on("users", (users) => {
    dispatch(addUsers(users));
  });

  socket.on("user connected", (user) => {
    dispatch(addOneUser(user));
  });

  socket.on("user disconnected", (user) => {
    console.log(user);
    dispatch(removeUser(user));
  });

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
          </Switch>

          <Chat />
        </Container>
      </Main>
    </>
  );
};

export default App;
