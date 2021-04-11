import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Switch, Route } from "react-router-dom";
import Container from "./components/Container";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button, select {
    font-family: inherit;
  }

  html{
    font-family: 'Vazir', sans-serif;
    font-weight:normal;
    direction: rtl;
  }

`;

const Main = styled.main`
  min-height: 80vh;
  margin-bottom: 1rem;
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Main>
        <Container>
          <Switch>
            <Route exact path="/" component={HomeScreen} />
            <Route exact path="/product/:id" component={ProductScreen} />
          </Switch>
        </Container>
      </Main>
    </>
  );
};

export default App;

// @font-face {
//   font-family: Vazir;
//   font-style: normal;
//   font-weight: normal;
//   src: url('fonts/Vazir.eot');
//   src: url('fonts/Vazir.eot?#iefix') format('embedded-opentype'),
//   url('fonts/Vazir.woff2') format('woff2'),
//   url('fonts/Vazir.woff') format('woff'),
//   url('fonts/Vazir.ttf') format('truetype');
//  }
//  @font-face {
//   font-family: Vazir;
//   font-style: normal;
//   font-weight: bold;
//   src: url('fonts/Vazir-Bold.eot');
//   src: url('fonts/Vazir-Bold.eot?#iefix') format('embedded-opentype'),
//   url('fonts/Vazir-Bold.woff2') format('woff2'),
//   url('fonts/Vazir-Bold.woff') format('woff'),
//   url('fonts/Vazir-Bold.ttf') format('truetype');
//  }

// @font-face {
//   font-family: Vazir;
//   src: url('Vazir-Regular.eot');
//   src: url('Vazir-Regular.eot?#iefix') format('embedded-opentype'),
//     url('Vazir-Regular.woff2') format('woff2'),
//     url('Vazir-Regular.woff') format('woff'),
//     url('Vazir-Regular.ttf') format('truetype');
//   font-weight: normal;
//   font-style: normal;
// }
// @font-face {
//   font-family: Vazir;
//   src: url('Vazir-Bold.eot');
//   src: url('Vazir-Bold.eot?#iefix') format('embedded-opentype'),
//     url('Vazir-Bold.woff2') format('woff2'),
//     url('Vazir-Bold.woff') format('woff'),
//     url('Vazir-Bold.ttf') format('truetype');
//   font-weight: bold;
//   font-style: normal;
// }
// @font-face {
//   font-family: Vazir;
//   src: url('Vazir-Black.eot');
//   src: url('Vazir-Black.eot?#iefix') format('embedded-opentype'),
//     url('Vazir-Black.woff2') format('woff2'),
//     url('Vazir-Black.woff') format('woff'),
//     url('Vazir-Black.ttf') format('truetype');
//   font-weight: 900;
//   font-style: normal;
// }
// @font-face {
//   font-family: Vazir;
//   src: url('Vazir-Medium.eot');
//   src: url('Vazir-Medium.eot?#iefix') format('embedded-opentype'),
//     url('Vazir-Medium.woff2') format('woff2'),
//     url('Vazir-Medium.woff') format('woff'),
//     url('Vazir-Medium.ttf') format('truetype');
//   font-weight: 500;
//   font-style: normal;
// }
// @font-face {
//   font-family: Vazir;
//   src: url('Vazir-Light.eot');
//   src: url('Vazir-Light.eot?#iefix') format('embedded-opentype'),
//     url('Vazir-Light.woff2') format('woff2'),
//     url('Vazir-Light.woff') format('woff'),
//     url('Vazir-Light.ttf') format('truetype');
//   font-weight: 300;
//   font-style: normal;
// }
// @font-face {
//   font-family: Vazir;
//   src: url('Vazir-Thin.eot');
//   src: url('Vazir-Thin.eot?#iefix') format('embedded-opentype'),
//     url('Vazir-Thin.woff2') format('woff2'),
//     url('Vazir-Thin.woff') format('woff'),
//     url('Vazir-Thin.ttf') format('truetype');
//   font-weight: 100;
//   font-style: normal;
// }
