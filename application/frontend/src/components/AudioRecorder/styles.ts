import styled from "styled-components";

export const FormStyle = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 40px;
    align-items: center;
    width: 50%;
    height: 50%;
    padding: 20px;
    border: 1px solid ${({theme})=> theme.primary_light};
    font-size: large;
    border-radius: 4px 4px;
    box-shadow:  ${({theme})=> theme.primary} 0px 0px 0.25em, ${({theme})=> theme.primary} 0px 0.25em 1em;
    background: ${({theme})=> theme.primary_light};
    color: ${({theme})=> theme.text};
`