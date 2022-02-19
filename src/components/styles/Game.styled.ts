import styled from "styled-components";

const GameStyles = styled.div`
  width: 30%;
  min-width: 20rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  #ph2 {
    justify-content: flex-end;
    div {
      text-align: end;
    }
  }
  @media only screen and (max-width: 1080px) {
    header {
      flex-direction: column;
    }
  }
  #game {
    display: grid;
    justify-content: center;
    width: 19rem;
    grid-template-columns: repeat(3, 6rem);
    grid-auto-rows: 6rem;
    background-color: #72376e;
    grid-gap: 0.5rem;
    button {
      background-color: #e6d3de;
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      cursor: pointer;
      span {
        font-size: 3.5rem;
      }
    }
  }
  .pulsar {
    animation: pulsar 1.5s ease-in-out;
  }
  .opctLow {
    opacity: 0.3;
  }
  .opctHalf {
    opacity: 0.6;
  }
  @keyframes pulsar {
    from {
      transform: scale(1);
      transform-origin: center center;
      animation-timing-function: ease-out;
    }
    10% {
      transform: scale(0.91);
      animation-timing-function: ease-in;
    }
    17% {
      transform: scale(0.98);
      animation-timing-function: ease-out;
    }
    33% {
      transform: scale(0.87);
      animation-timing-function: ease-in;
    }
    45% {
      transform: scale(1);
      animation-timing-function: ease-out;
    }
  }
`;

export default GameStyles;
