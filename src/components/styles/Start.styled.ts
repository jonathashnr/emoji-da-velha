import styled from "styled-components";

const StartStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 30%;
    min-width: 22rem;
    #forms {
        padding: 0 1rem;
        width: 100%;
        margin: 1rem;
        display: flex;
        flex-direction: column;
        .emojisWrapper {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 2rem 0;
        }
        .emojiButton {
            font-size: 3rem;
            width: 5rem;
            height: 5rem;
            padding: 0
        }
        span {
            font-family: 'Bangers', cursive;
            font-weight: 400;
            font-size: 2rem;
            color: #72376e;
        }
        button {
            padding: 0.4rem;
            font-size: 1.2rem;
            font-family: 'Open Sans', sans-serif;
            color: #e6e6e6;
            border: none;
            border-radius: 0.3rem;
            background-color: #72376e;
            cursor: pointer;
            &:hover {
                background-color: #52134e;
            }
        }
    }
    .emojiPickerWrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
    }
`

export default StartStyled;