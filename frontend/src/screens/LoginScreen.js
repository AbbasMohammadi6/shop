import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../slices/loginUser";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { device } from "../utils/deviceSizes";

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

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const { loading, userInfo, error } = useSelector((state) => state.userLogin);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (userInfo?.user?.name) history.push("/");
  }, [history, userInfo]);

  /** Todo: Could use a simple modal instead of this component  **/

  return (
    <Container>
      <H1>وارد شدن به حساب کاربری</H1>
      {error && <Message>{error}</Message>}
      {loading ? (
        <Loader />
      ) : (
        <Form onSubmit={handleSubmit}>
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

          <button type="submit">ورود</button>
        </Form>
      )}
    </Container>
  );
};

export default LoginScreen;