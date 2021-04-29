import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../slices/loginUser";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { device } from "../utils/deviceSizes";
import { Link } from "react-router-dom";

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

  & input,
  & button,
  & > a {
    display: inline-block;
    width: 100%;
    height: 2.5rem;
    padding: 0 1rem;
    font-size: 0.85rem;
  }

  input {
    margin-bottom: 2rem;
  }

  input:invalid:required {
    outline: 1px solid potato;
  }

  & button,
  & > a {
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

  & > a {
    display: flex;
    justify-content: center;
    align-items: center;

    & i {
      margin-right: 1rem;
    }
  }

  & hr {
    margin-bottom: 2rem;
    border: none;
    height: 1px;
    background: #ccc;
  }

  & small {
    font-size: 0.6rem;
    text-align: left;
    display: block;
    margin: 0.5rem 0 1rem;

    & a:hover {
      color: palevioletred;
    }
  }
`;

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const { loading, success, error } = useSelector((state) => state.userLogin);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (success) history.push("/");
  }, [history, success]);

  /** Todo: Could use a simple modal instead of this component  **/

  return (
    <Container>
      {error && <Message>{error}</Message>}
      {loading ? (
        <Loader />
      ) : (
        <Form onSubmit={handleSubmit}>
          <H1>ورود به حساب کاربری</H1>
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
          <small>
            حساب کاربری ندارید؟<Link to="/register"> عضو شوید</Link>
          </small>

          <hr />

          <a
            href={`${
              process.env.NODE_env === "production"
                ? "https://aria-shop.herokuapp.com/api/auth/google/"
                : "http://localhost:5000/api/auth/google/"
            }`}
          >
            <span>ورود با گوگل</span> <i className="fab fa-google"></i>
          </a>
        </Form>
      )}
    </Container>
  );
};

export default LoginScreen;
