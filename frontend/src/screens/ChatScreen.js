import React, { useState } from "react";
import styled from "styled-components";
import socket from "../socket";

const Main = div`
  display: flex;
`;

const Aside = styled.aside`
  flex: 1;
`;

const Chats = styled.div`
  flex: 3;
`;

const ChatScreen = () => {
  const [users, setUsers] = useState([]);

  socket.on("users", (user) => {});

  return (
    <Main>
      <Aside></Aside>

      <Chats></Chats>

      {/* <Form>

    </Form> */}
    </Main>
  );
};

export default ChatScreen;
