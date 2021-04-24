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
    height: 50%;
    display: flex;
    flex-direction: column;

    & textarea {
      height: 90%;
      resize: none;
    }
  }
`;

const MsgContainer = styled.div`
  border: 1px solid #dadada;
  height: 50%;
`;

const Li = styled.li`
  background: ${({ fromSelf }) => (fromSelf ? "springgreen" : "tomato")};
`;

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMsg, setCurrentMsg] = useState("");
  const [msgs, setMsgs] = useState([]);

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
    socket.emit("chat message", {
      message: currentMsg,
      from: socket.id,
    });
    /** Todo: see if the message was recieved by the server, then add this to msgs **/
    setMsgs(msgs.concat({ text: currentMsg, fromSelf: true }));
  };

  socket.on("private message", (message) => {
    console.log(message);
    setMsgs(msgs.concat({ text: message, fromSelf: false }));
  });

  return (
    <Main>
      <ChatWindow isOpen={isOpen}>
        <MsgContainer>
          <ul>
            {msgs.map((msg, idx) => (
              <Li key={idx} fromSelf={msg.fromSelf}>
                {msg.text}
              </Li>
            ))}
          </ul>
        </MsgContainer>
        <form>
          <textarea
            value={currentMsg}
            onChange={(e) => setCurrentMsg(e.target.value)}
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
