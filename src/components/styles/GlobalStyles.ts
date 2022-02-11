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
.textShadow {
    text-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
}
.boxShadow {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
}
`
export default GlobalStyles;