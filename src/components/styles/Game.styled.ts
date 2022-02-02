import styled from "styled-components";

const GameStyles = styled.div`
width: 60%;
display: flex;
flex-direction: column;
align-items: center;
header {
    display: flex;
    width: 100%;
}
.playerHeader {
    display: flex;
    width: 100%;
    .headerEmoji {
        display: flex;
        font-size: 2.5rem;
        cursor: pointer;
    }
    .headerPlayerWrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
}
#ph2 {
    justify-content: flex-end;
    .headerPlayerWrapper {
        div {
            text-align: end;
        }
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
    div {
        background-color: #e6d3de;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        span {
            font-size: 3.5rem;
        }
    }
}
`

export default GameStyles