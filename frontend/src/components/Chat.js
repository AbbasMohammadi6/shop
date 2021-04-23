import React, { useState, useEffect } from "react";
import styled from "styled-components";
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

const ChatWindow = styled.div`
  height: 15rem;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};

  & form {
    height: 100%;
    display: flex;
    flex-direction: column;

    & textarea {
      height: 90%;
      resize: none;
    }
  }
`;

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleOpenChat = () => {
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
    socket.emit("chat message", { message, from: socket.id, to: "admin" });
  };

  return (
    <Main>
      <ChatWindow isOpen={isOpen}>
        <form>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button onClick={handleSend}>ارسال</button>
        </form>
      </ChatWindow>

      <Icon onClick={handleOpenChat}>
        <i className="fas fa-comment"></i>
      </Icon>
    </Main>
  );
};

export default Chat;
