import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import products from "../products";
import { device } from "../utils/deviceSizes";

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

  @media ${device.mobileM} {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Card = styled.div`
  border: 1px solid #ccc;
  padding: 1rem;
  padding-bottom: 2rem;
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

const RatingContianer = styled.div`
  direction: ltr;
  position: absolute;
  bottom: 5px;
  right: 50%;
  transform: translateX(50%);
`;

const HomeScreen = () => {
  return (
    <Main>
      {products.map((product) => (
        <Card key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Img src={product.imgUrl} />
          </Link>
          <P>
            <Link to={`/product/${product.id}`}>
              <strong>{product.name}</strong>
            </Link>
          </P>
          <RatingContianer>
            <Rating
              name="read-only"
              value={product.rating}
              readOnly
              size="small"
              precision={0.5}
            />
          </RatingContianer>
        </Card>
      ))}
    </Main>
  );
};

export default HomeScreen;
