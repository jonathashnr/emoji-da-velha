import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
body { 
    margin: 0;
    font-family: 'Open Sans', sans-serif;
    background-color: #e6d3de;
    color: #72376e;
}

*,*::after,*::before {
    box-sizing: border-box;
}
`
export default GlobalStyles;