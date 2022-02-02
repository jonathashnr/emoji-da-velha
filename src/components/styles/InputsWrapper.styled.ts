import styled from "styled-components";

const InputsWrapperStyles = styled.div`
    display: flex;
    margin-bottom:1rem;
    span {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2.5rem;
        min-width: 4.5rem;
        min-height: 4.5rem;
        border: 1px solid #72376e;
        background-color: #e6e6e6;
        border-radius: 0.3rem;
        cursor: pointer;
    }
    .playerNameForm {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        font-size: 0.8rem;
        padding-left: 1rem;

        input {
            padding: 0.4rem;
            font-size: 1.2rem;
            font-family: 'Open Sans', sans-serif;
            color: #72376e;
            border: none;
            border-radius: 0.3rem;
            border-bottom: 1px solid #72376e;
            background-color: #e6e6e6;
            width: 100%;
            &:focus {
                outline: none;
                border-bottom: 3px solid #d33e3e;
            }
        }
    }
`

export default InputsWrapperStyles;