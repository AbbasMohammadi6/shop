import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../slices/registerUser";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { device } from "../utils/deviceSizes";
import axios from "axios";

const Container = styled.div`
  width: 50%;
  margin: 0 auto;

  @media ${device.tablet} {
    width: 70%;
  }

  @media ${device.mobileL} {
    width: 100%;
  }
`;

const H1 = styled.h1`
  @media ${device.tablet} {
    font-size: 1.7rem;
  }

  @media ${device.mobileL} {
    font-size: 1.5rem;
  }
`;

const Form = styled.form`
  margin-top: 2rem;

  & * {
    display: inline-block;
    width: 100%;
    margin-bottom: 2rem;
    height: 2.5rem;
    padding: 0 1rem;
    border-radius: none;
  }

  input:invalid:required {
    outline: 1px solid potato;
  }

  & button {
    background: palevioletred;
    transition: background 200ms;
    border: 1px solid white;
    color: white;

    &:hover {
      background: white;
      border: 1px solid palevioletred;
      color: palevioletred;
    }
  }
`;

const RegisterScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const { loading, userInfo, error } = useSelector(
    (state) => state.userRegister
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword)
      return setMessage(".رمز و تایید رمز باید یکسان باشند");

    dispatch(registerUser({ name, email, password }));
    setMessage("");
  };

  // const handlePassportRegister = async () => {
  //   try {
  //     await axios.post(
  //       "/api/auth/register",
  //       { name, email, password },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  useEffect(() => {
    if (userInfo?.name) history.push("/");
  }, [history, userInfo]);

  return (
    <Container>
      {message && <Message>{message}</Message>}
      {error && <Message>{error}</Message>}
      {loading ? (
        <Loader />
      ) : (
        <Form onSubmit={handleSubmit}>
          <H1>عضو شوید</H1>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="نام..."
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ایمیل..."
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="رمز..."
            required
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="تایید رمز..."
            required
          />
          <button type="submit">ثبت نام</button>
        </Form>
      )}

      {/* <button onClick={handlePassportRegister}>passportRegister</button> */}
    </Container>
  );
};

export default RegisterScreen;
