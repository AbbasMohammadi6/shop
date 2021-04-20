import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import { useDispatch, useSelector } from "react-redux";
import { device } from "../utils/deviceSizes";
import { getAllProducts } from "../slices/getAllProducts";
import Loader from "../components/Loader";
import { convertNumsToPersian, getPersianPrice } from "../utils/helpers";
import Toast from "../components/Toast";

/* Todo: Change all of the breakpoints the custome numbers (where it starts to look bad) */
const Main = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: auto;
  gap: 1rem;

  @media ${device.laptop} {
    grid-template-columns: repeat(3, 1fr);
  }

  @media ${device.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 450px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Card = styled.div`
  border: 1px solid #ccc;
  padding: 1rem;
  padding-bottom: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Img = styled.img`
  width: 100%;
`;

const P = styled.p`
  font-size: 0.7rem;
  margin-top: 0.5rem;
`;

const CardFooter = styled.div`
  position: absolute;
  bottom: 5px;
  right: 50%;
  transform: translateX(50%);
`;

const RatingContianer = styled.div`
  direction: ltr;
`;

const HomeScreen = () => {
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector(
    (state) => state.getAllProducts
  );

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <Main>
          {products.map((product) => (
            <Card key={product._id}>
              <Link to={`/product/${product._id}`}>
                <Img src={product.imgUrl} />
              </Link>

              <P>
                <Link to={`/product/${product.id}`}>
                  <strong>{convertNumsToPersian(product.name)}</strong>
                </Link>
              </P>

              <CardFooter>
                <P>قیمت: {getPersianPrice(product.price)}</P>
                <RatingContianer>
                  <Rating
                    name="read-only"
                    value={product.rating}
                    readOnly
                    size="small"
                    precision={0.5}
                  />
                </RatingContianer>
              </CardFooter>
            </Card>
          ))}

          <Toast />
        </Main>
      )}
    </>
  );
};

export default HomeScreen;
