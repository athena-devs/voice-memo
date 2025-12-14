import styled from "styled-components";

export const Input = styled.input`
    display: flex;
    background: ${({theme})=> theme.background};
    color: ${({theme})=> theme.text};
    padding: 1.5%;
    border-radius: 4px 4px;
    width: 80%;
    text-align: center;
    align-items: center;
    justify-content: center;
    font-size: large;
    border: 1px solid ${({theme})=> theme.primary};
    &::placeholder{
        color: ${({theme})=> theme.text};
    }

    &:hover, :focus{
        border: 1px solid ${({theme})=> theme.text};
    }

`