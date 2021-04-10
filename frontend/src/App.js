import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import Container from "./components/Container";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";

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

  @font-face {
   font-family: Vazir;
   font-style: normal;
   font-weight: normal;
   src: url('fonts/Vazir.eot');
   src: url('fonts/Vazir.eot?#iefix') format('embedded-opentype'), 
   url('fonts/Vazir.woff2') format('woff2'), 
   url('fonts/Vazir.woff') format('woff'), 
   url('fonts/Vazir.ttf') format('truetype');
  }
  @font-face {
   font-family: Vazir;
   font-style: normal;
   font-weight: bold;
   src: url('fonts/Vazir-Bold.eot');
   src: url('fonts/Vazir-Bold.eot?#iefix') format('embedded-opentype'), 
   url('fonts/Vazir-Bold.woff2') format('woff2'), 
   url('fonts/Vazir-Bold.woff') format('woff'), 
   url('fonts/Vazir-Bold.ttf') format('truetype');
  }
   
   
  body{
  font-family: 'Vazir', Arial, sans-serif;
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
          <HomeScreen />
        </Container>
      </Main>
    </>
  );
};

export default App;
