import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import socket from "../socket";
import { reset, addUsers, addOneUser, removeUser } from "../slices/chatUsers";
import Message from "../components/Message";

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
  border-radius: 0.8rem;
  padding: 0.5rem;
  text-align: center;
  margin-bottom: 0.5rem;
  color: #333;

  @media (max-width: 600px) {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 3rem;
  }

  &:hover {
    cursor: pointer;
  }

  &:nth-child(odd) {
    background: beige;
  }

  &:nth-child(even) {
    background: antiquewhite;
  }
`;

const Chats = styled.div`
  flex: 3;

  & ul {
    padding-right: 1rem;
    list-style: none;
  }
`;

const MsgLi = styled.li`
  background: ${({ fromSelf }) => (fromSelf ? "#56e29c" : "#f38572")};
  margin: 1rem 0;
  margin-right: ${({ fromSelf }) => (fromSelf ? "auto" : "0")};
  width: 15rem;
  padding: 1rem;
  border-radius: 5px;
  position: relative;

  @media (max-width: 450px) {
    width: 10rem;
  }

  & span {
    position: absolute;
    top: 2px;
    left: 5px;
    font-size: 0.7rem;
    color: #666;
  }
`;

const Form = styled.form`
  position: fixed;
  left: 10%;
  right: 10%;
  bottom: 0;
  max-width: 1000px; /* equal to Container's max-width */
  margin: auto; /* for when screen width is more than 1000px */
  height: 3rem;
  display: flex;
  border: solid 1px #ccc;
  border-radius: 2rem;
  overflow: hidden;

  & input {
    width: 92%;
    border: none;
    outline: none;
    resize: none;
    font-family: inherit;
    font-size: 0.85rem;
    overflow: auto;
    padding-right: 1.5rem;

    @media (max-width: 800px) {
      width: 88%;
    }
  }

  & button {
    width: 8%;
    border: none;
    outline: none;
    border-right: 1px solid #ccc;
    color: palevioletred;
    background: white;
    transition: all 200ms;
    font-size: 1.2rem;

    @media (max-width: 800px) {
      width: 12%;
    }

    &:hover:not[disabled] {
      background: palevioletred;
      color: white;
    }

    &:disabled {
      color: #777;
    }
  }
`;

const ChatScreen = ({ history }) => {
  // this is very important, if you remove it, each event gets fired multiple times, becauce it sets an event listener on each render
  socket.removeAllListeners();

  const [currentMsg, setCurrentMsg] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [msgs, setMsgs] = useState([]);

  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.chatUsers);
  const { userInfo } = useSelector((state) => state.userRegister);

  const handleSend = (e) => {
    e.preventDefault();
    socket.emit("private message", { message: currentMsg, to: currentUser });
    setMsgs(
      msgs.concat({ message: currentMsg, from: socket.id, to: currentUser })
    );
    setCurrentMsg("");
  };

  const getNotAdminsCount = () => {
    let count = 0;
    users.forEach((user) => {
      if (!user.isAdmin) count++;
    });
    return count;
  };

  socket.on("chat message", ({ message, from }) => {
    setMsgs(msgs.concat({ message, from, to: "admin" }));
  });

  useEffect(() => {
    if (!userInfo?.user?.name) history.push("/");
    else if (!socket.connected) {
      dispatch(reset());
      socket.auth = { isAdmin: true };
      socket.connect();
    }
  }, [history, userInfo, dispatch]);

  socket.on("users", (users) => {
    dispatch(addUsers(users));
  });

  socket.on("messages", (messages) => {
    setMsgs(messages);
  });

  socket.on("user connected", (user) => {
    dispatch(addOneUser(user));
  });

  socket.on("user disconnected", (user) => {
    dispatch(removeUser(user));
    setMsgs(msgs.filter((m) => m.from !== user.userID && m.to !== user.userID));
  });

  return (
    <>
      {!getNotAdminsCount() ? (
        <Message variant="info">هنوز کاربری وارد چت نشده است</Message>
      ) : (
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
                      <span>{from === socket.id ? "admin" : "user"}</span>
                    </MsgLi>
                  );
                else return null;
              })}
            </ul>
          </Chats>
          <Form onSubmit={handleSend}>
            <input
              value={currentMsg}
              onChange={(e) => setCurrentMsg(e.target.value)}
            />
            <button type="submit" disabled={!currentUser || !currentMsg}>
              <i className="fas fa-paper-plane"></i>
            </button>
          </Form>
        </Main>
      )}
    </>
  );
};

export default ChatScreen;
