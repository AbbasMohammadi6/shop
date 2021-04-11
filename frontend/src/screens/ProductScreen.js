import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { device } from "../utils/deviceSizes";
import { getProduct } from "../slices/getProduct";
import Loader from "../components/Loader";

const H1 = styled.h1`
  @media ${device.tablet} {
    font-size: 1.5rem;
  }
  @media ${device.mobileM} {
    font-size: 1rem;
  }
`;

const P = styled.p`
  @media ${device.mobileM} {
    font-size: 0.8rem;
  }
`;

const Img = styled.img`
  width: 70%;

  @media ${device.tablet} {
    width: 100%;
  }
`;

const Div = styled.div`
  display: flex;
  align-items: center;

  & > * {
    flex: 1;
  }

  @media ${device.tablet} {
    flex-direction: column;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  & button {
    padding: 0.5rem 0;
    border: none;
    background: palevioletred;
    color: white;
    outline: none;
    transition: all 200ms;
    border: 1px solid white;

    &:hover:not([disabled]) {
      cursor: pointer;
      color: palevioletred;
      background: white;
      border: 1px solid palevioletred;
    }
  }

  & select {
    padding: 0.5rem 0;
  }

  & > div {
    text-align: center;
    border: 1px solid palevioletred;
    padding: 0.5rem 0;
    color: palevioletred;
  }

  & select,
  & button,
  & > div {
    width: 150px;
    margin-bottom: 1rem;
  }

  @media ${device.tablet} {
    & select,
    & button,
    & > div {
      width: 250px;
      margin-bottom: 2rem;
    }
  }

  @media ${device.mobileL} {
    & select,
    & button,
    & > div {
      width: 150px;
      margin-bottom: 2rem;
    }
  }
`;

const ProductScreen = ({ match }) => {
  const [qty, setQty] = useState(0);

  const id = match.params.id;

  const dispatch = useDispatch();
  const { loading, product, error } = useSelector((state) => state.getProduct);

  useEffect(() => {
    dispatch(getProduct(id));
  }, [id, dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <>
          {product.name && (
            <>
              <H1>{product.name}</H1>

              <Div>
                <div>
                  <Img src={product.imgUrl} />
                </div>
                <BtnContainer>
                  <button disabled={product.countInStock === 0}>
                    افزودن به سبد خرید{" "}
                  </button>
                  {product.countInStock ? (
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    >
                      <option value={0} disabled={true}>
                        تعداد
                      </option>
                      {[...new Array(product.countInStock).keys()].map(
                        (item) => (
                          <option key={item}>{item + 1}</option>
                        )
                      )}
                    </select>
                  ) : (
                    <div>ناموجود</div>
                  )}
                </BtnContainer>
              </Div>

              <P>{product.description}</P>
            </>
          )}
        </>
      )}
    </>
  );
};

export default ProductScreen;
