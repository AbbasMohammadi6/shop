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
import { useDispatch, useSelector } from "react-redux";
import { addUsers, addOneUser, removeUser } from "./slices/chatUsers";
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
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userRegister);

  socket.on("users", (users) => {
    console.log("111Users", users.length);
    dispatch(addUsers(users));
  });

  socket.on("user connected", (user) => {
    console.log("222User", user);
    dispatch(addOneUser(user));
  });

  socket.on("user disconnected", (user) => {
    dispatch(removeUser(user));
  });

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
