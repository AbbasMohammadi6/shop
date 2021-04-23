import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import socket from "../socket";

const Main = styled.div`
  display: flex;
`;

const Aside = styled.aside`
  flex: 1;

  & ul {
    list-style: none;

    & li {
      padding: 0.5rem;
    }

    & li:nth-child(odd) {
      background: #dadada;
    }

    & li:nth-child(even) {
      background: #fafafa;
    }
  }
`;

const Chats = styled.div`
  flex: 3;
`;

const ChatScreen = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.chatUsers);

  socket.on("users", (user) => {});

  return (
    <Main>
      <Aside>
        <ul>
          {users.map((user, idx) => (
            <li key={idx}>{user.userID}</li>
          ))}
        </ul>
      </Aside>

      <Chats></Chats>

      {/* <Form>

    </Form> */}
    </Main>
  );
};

export default ChatScreen;
