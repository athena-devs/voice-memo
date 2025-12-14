import styled from "styled-components";

export const ErrorMessage = styled.p`
    display: flex;
    text-align: left;
    align-self: start;
    margin-left: 10%;
    font-size: medium;
    margin-bottom: -15px;
    color: ${({theme})=> theme.warning_title};;
`