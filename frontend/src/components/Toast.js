import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }

  to {
    transform: translateY(0);
  }
`;

const Main = styled.div`
  position: fixed;
  left: 1rem;
  bottom: 1rem;
  background: rgba(0, 128, 128, 0.8);
  padding: 1rem;
  text-align: center;
  box-shadow: 0 0 5px 1px rgba(0, 128, 128, 0.8);
  border-radius: 5px;
  display: ${({ isOpen }) => `${isOpen ? "block" : "none"}`};
  animation: ${slideUp} 1s;

  & span {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 0.9rem;
    padding: 0 7px;
    transition: color 200ms;

    &:hover {
      cursor: pointer;
      color: pink;
    }
  }

  & a {
    text-decoration: underline;

    &:hover {
      color: pink;
    }
  }

  & p {
    font-size: 0.8rem;
  }
`;

const Toast = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Main isOpen={isOpen}>
      <span onClick={() => setIsOpen(false)}>
        <i className="fas fa-times"></i>
      </span>
      <p>این پروژه در حال تکمیل شدن است.</p>
      <p>درصد پیشرفت پروژه: ۵۰درصد</p>
      <p>
        <a
          href="https://github.com/AbbasMohammadi6/shop"
          target="_blank"
          rel="noreferrer"
        >
          لینک{" "}
        </a>
        پروژه روی گیت هاب
      </p>
    </Main>
  );
};

export default Toast;
