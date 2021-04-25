import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import socket from "../socket";

const Main = styled.div`
  position: fixed;
  right: 1rem;
  bottom: 1rem;
`;

const Icon = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background: #dadada;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
  }

  & i {
    font-size: 2rem;
    color: palevioletred;
  }
`;

const openWindow = keyframes`
  from {
    width: 0;
    height: 0;
  }

  to {
    width: 18rem;
    height: 25rem;
  }
`;

const ChatWindow = styled.div`
  width: 18rem;
  height: 25rem;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  border: 1px solid #dadada;
  position: absolute;
  right: 0;
  bottom: 0;
  animation: ${openWindow} 500ms;

  & form {
    height: 10%;
    width: 100%;
    display: flex;

    & textarea,
    & button {
      border: none;
      outline: none;
      flex: 1;
    }

    & textarea {
      resize: none;
      border-top: 1px solid #dadada;
      flex: 5;
      background: white;
      overflow: auto;
      font-size: 0.9rem;
      font-family: inherit;
    }

    & button {
      background: palevioletred;
      color: white;
      transition: all 200ms;
      border: 1px solid palevioletred;

      &:hover {
        background: white;
        color: palevioletred;
        border: 1px solid #dadada;
      }
    }
  }
`;

const MsgContainer = styled.div`
  height: 90%;
  overflow: auto;
  background: white;
  position: relative;

  & div {
    text-align: center;
    border-bottom: 1px solid #dadada;

    & i {
      position: absolute;
      top: 0;
      right: 0;
      padding: 5px;
      transition: all 200ms;

      &:hover {
        color: red;
        cursor: pointer;
      }
    }

    & h4 {
      padding: 0.5rem 0;
      font-family: "Shabnam", "Vazir", "sans-serif";
    }
  }
`;

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMsg, setCurrentMsg] = useState("");
  const [msgs, setMsgs] = useState([]);

  const handleOpenChat = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      socket.connect();
    } else {
      socket.disconnect();
    }
  }, [isOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    socket.emit("chat message", {
      message: currentMsg,
      from: socket.id,
    });
    /** Todo: see if the message was recieved by the server, then add this to msgs **/
    setMsgs(msgs.concat({ text: currentMsg, fromSelf: true }));
    setCurrentMsg("");
  };

  socket.on("private message", (message) => {
    console.log(message);
    setMsgs(msgs.concat({ text: message, fromSelf: false }));
  });

  return (
    <Main>
      <ChatWindow isOpen={isOpen}>
        <MsgContainer>
          <div>
            <i className="fas fa-times" onClick={handleOpenChat}></i>
            <h4>پاسخگوی سؤالات شما هستیم</h4>
          </div>
          <ul>
            {/* {msgs.map((msg, idx) => (
              <Li key={idx} fromSelf={msg.fromSelf}>
                {msg.text}
              </Li>
            ))} */}

            {/* <Li fromSelf={true}>پاسخگوی سؤالات شما هستیم</Li>

            <Li fromSelf={false}>پاسخگوی سؤالات شما هستیم</Li>

            <Li fromSelf={true}>پاسخگوی سؤالات شما هستیم</Li>

            <Li fromSelf={false}>پاسخگوی سؤالات شما هستیم</Li> */}
          </ul>
        </MsgContainer>
        <form>
          <textarea
            placeholder="پیام شما..."
            value={currentMsg}
            onChange={(e) => setCurrentMsg(e.target.value)}
          ></textarea>

          <button onClick={handleSend}>
            <i className="fas fa-paper-plane"></i>
          </button>
        </form>
      </ChatWindow>

      <Icon onClick={handleOpenChat}>
        <i className="fas fa-comment"></i>
      </Icon>
    </Main>
  );
};

export default Chat;
