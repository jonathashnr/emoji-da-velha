import styled from "styled-components";

const ScoreboardStyles = styled.header`

font-family: 'Bangers', cursive;
font-weight: 400;
font-size: 3rem;
margin-bottom: 3rem;
display: flex;
justify-content: center;

.grid {
  display: grid;
  grid-template-columns: repeat(3, 5rem);
  grid-auto-rows: 5rem;
  grid-column-gap: 1.5rem;
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #d33e3e;
  }
  .pointer {
    font-size: 2rem;
    animation: shake 3s cubic-bezier(0.455, 0.030, 0.515, 0.955) infinite both;
  }
  .emojiBoard {
    border-width: 1.5px;
    border-style: solid;
    border-bottom-style: dashed;
    border-color: #72376e;
    border-radius: 10px 10px 0 0;
    background-color: #e6e6e6;
  }
  .scores {
    border-width: 0 1.5px 1.5px 1.5px;
    border-style: solid;
    border-color: #72376e;
    background-color: #f7f7f7;
    animation: swingAni 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  }
}
@keyframes swingAni {
  0% {
    transform: rotateX(-180deg);
    transform-origin: top;
  }
  100% {
    transform: rotateX(0);
    transform-origin: top;
  }
}
@keyframes shake {
  0%,
  100% {
    transform: translateY(0);
  }
  10%,
  30%,
  50%,
  70% {
    transform: translateY(-6px);
  }
  20%,
  40%,
  60% {
    transform: translateY(6px);
  }
  80% {
    transform: translateY(4.4px);
  }
  90% {
    transform: translateY(-4.4px);
  }
}

`

export default ScoreboardStyles;