import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { add as addToCart, remove as removeFromCart } from "../slices/cart";
import Message from "../components/Message";
import {
  getPersianPrice,
  getPersianNums,
  convertNumsToPersian,
} from "../utils/helpers";

const Li = styled.li`
  display: flex;
  align-items: center;
  padding: 1rem;
  border: solid #ccc 1px;
  margin-top: -1px;
  transition: background 200ms;
  font-family: "Shabnam", sans-serif;

  &:hover {
    background: #eee;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: inherit;
  }

  @media (max-width: 425px) {
    font-size: 1rem;
  }

  & > div:first-child {
    flex: 4;

    & p:first-child {
      margin-bottom: 0.5rem;
    }

    & p:last-child {
      font-size: 0.8rem;
    }
  }

  & > div:last-child {
    flex: 1;
    font-size: 0.8rem;

    @media (max-width: 768px) {
      display: flex;
      margin-top: 1rem;

      & * {
        width: 50%;
        margin-bottom: 0;
      }
    }

    @media (max-width: 425px) {
      flex-direction: column;
      text-align: center;

      & * {
        width: 100%;
      }
    }

    & > p {
      margin-bottom: 0.5rem;
    }

    & select {
      width: 50%;
    }
  }

  & a {
    transition: color 200ms;
  }

  & a:hover {
    color: palevioletred;
  }
`;

const I = styled.i`
  color: tomato;
  display: inline-block;
  margin-left: 1rem;
  transition: transform 200ms;

  &:hover {
    cursor: pointer;
    transform: scale(1.2);
  }
`;

const ContinueDiv = styled.div`
  text-align: end;
  font-family: "Shabnam", sans-serif;
  margin-top: 2rem;

  & button {
    border: none;
    outline: none;
    background: palevioletred;
    display: inline-block;
    margin-top: 1rem;
    color: white;
    padding: 0.5rem 1rem;
    transition: all 200ms;
    border: white solid 1px;

    &:hover {
      background: white;
      color: palevioletred;
      border: palevioletred solid 1px;
      cursor: pointer;
    }
  }
`;

const H1 = styled.h1`
  margin-bottom: 1rem;
`;

const CartScreen = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.cart);

  const getTotalPrice = () => {
    return products.reduce(
      (acc, item) => (acc += item.product.price * item.qty),
      0
    );
  };

  return (
    <>
      {products.length ? (
        <>
          <H1>سبد خرید شما</H1>
          <ul>
            {products.map(({ product, qty }) => (
              <Li key={product._id}>
                <div>
                  <I
                    className="fas fa-trash"
                    onClick={() => dispatch(removeFromCart(product._id))}
                  ></I>
                  <Link to={`/product/${product._id}`}>
                    {convertNumsToPersian(product.name)}
                  </Link>
                </div>

                <div>
                  <p>قیمت: {getPersianPrice(product.price * qty)}</p>
                  <div>
                    تعداد:{" "}
                    <select
                      value={qty}
                      onChange={(e) =>
                        dispatch(addToCart({ product, qty: e.target.value }))
                      }
                    >
                      {[...new Array(product.countInStock).keys()].map(
                        (item) => (
                          <option key={item} value={item + 1}>
                            {getPersianNums(item + 1)}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>
              </Li>
            ))}
          </ul>

          <ContinueDiv>
            <p>قیمت کل: {getPersianPrice(getTotalPrice())}</p>
            <button>ادامه خرید</button>
          </ContinueDiv>
        </>
      ) : (
        <Message variant="info">هنوز آیتمی به سبد خرید اضافه نشده است.</Message>
      )}
    </>
  );
};

export default CartScreen;
