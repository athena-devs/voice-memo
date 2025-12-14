import styled from "styled-components";

export const Button = styled.button`
    display: flex;
    background: ${({theme})=> theme.primary};
    color: ${({theme})=> theme.text};
    padding: 1.5%;
    border-radius: 6px 6px;
    width: 10vh;
    text-align: center;
    align-items: center;
    justify-content: center;
    font-size: large;
    border: 0;

    &:hover, :focus {
        border: 0.1px solid ${({theme})=> theme.text};
        cursor: pointer;
    }
`