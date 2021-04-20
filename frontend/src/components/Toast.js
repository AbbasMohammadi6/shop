import React, { useState } from "react";
import styled from "styled-components";

const Div = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  background: rgba(0, 128, 128, 0.7);
  padding: 1rem;
  color: #333;
  text-align: center;
  display: ${({ isOpen }) => `${isOpen ? "block" : "none"}`};

  & span {
    position: absolute;
    right: 4px;
    top: -6px;
    color: red;
    font-size: 1.3rem;

    &:hover {
      cursor: pointer;
    }
  }

  & a {
    color: red;
    text-decoration: underline;
  }

  & p {
    font-size: 0.8rem;
  }
`;

const Toast = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Div isOpen={isOpen}>
      <span onClick={() => setIsOpen(false)}>x</span>
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
    </Div>
  );
};

export default Toast;
