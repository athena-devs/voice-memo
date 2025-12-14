import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background: ${({theme})=> theme.background};
`
export const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`

export const Main = styled.div`
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