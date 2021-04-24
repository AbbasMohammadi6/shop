import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import socket from "../socket";

const Main = styled.div`
  display: flex;
  width: 100%;
`;

const Aside = styled.aside`
  flex: 1;

  & ul {
    list-style: none;
  }
`;

const UserLi = styled.li`
  background: ${({ currentUser }) => currentUser && "springgreen !important"};

  padding: 0.5rem;

  &:hover {
    cursor: pointer;
  }

  &:nth-child(odd) {
    background: #dadada;
  }

  &:nth-child(even) {
    background: #fafafa;
  }
`;

const Chats = styled.div`
  flex: 3;
`;

const MsgLi = styled.li`
  background: ${({ fromSelf }) => (fromSelf ? "springgreen" : "tomato")};
`;

const Form = styled.form`
  position: fixed;
  /* DELETE THIS LATER: because the containers width is 80%, if we want to make the form align with contianer we have to make left 10% and right 10%, if we want the form to be under the Chats section, we have to add that 25% of 80% to the right, so 25% of 80% is 20% of 100% so right becomes 20%+10% = 30%  */
  left: 10%;
  right: 30%;
  bottom: 0;
  display: flex;

  & textarea {
    width: 85%;
  }

  & button {
    width: 15%;
  }
`;

const ChatScreen = () => {
  const [currentMsg, setCurrentMsg] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [msgs, setMsgs] = useState([]);

  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.chatUsers);

  console.log("Chat Users", users.length);

  const handleSend = (e) => {
    e.preventDefault();
    socket.emit("private message", { message: currentMsg, to: currentUser });
    setMsgs(
      msgs.concat({ message: currentMsg, from: socket.id, to: currentUser })
    );
    setCurrentMsg("");
  };

  socket.on("chat message", ({ message, from }) => {
    setMsgs(msgs.concat({ message, from, to: "admin" }));
  });

  return (
    <Main>
      <Aside>
        <ul>
          {users.map((user, idx) => {
            if (!user.isAdmin)
              return (
                <UserLi
                  key={idx}
                  currentUser={currentUser === user.userID}
                  onClick={() => setCurrentUser(user.userID)}
                >
                  {user.userID}
                </UserLi>
              );
            else return null;
          })}
        </ul>
      </Aside>

      <Chats>
        <ul>
          {msgs.map(({ message, from, to }, idx) => {
            if (from === currentUser || to === currentUser)
              return (
                <MsgLi key={idx} fromSelf={from === socket.id}>
                  {message}
                </MsgLi>
              );
            else return null;
          })}
        </ul>
      </Chats>

      <Form>
        <textarea
          value={currentMsg}
          onChange={(e) => setCurrentMsg(e.target.value)}
        />
        <button onClick={handleSend} disabled={!currentUser || !currentMsg}>
          ارسال
        </button>
      </Form>
    </Main>
  );
};

export default ChatScreen;
