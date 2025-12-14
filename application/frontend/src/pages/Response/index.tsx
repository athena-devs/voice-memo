import { useLocation, useNavigate } from "react-router-dom"
import { Container, Content, Main } from "./styles"
import { Button } from "../../components/Button/styles"

export const Response = () =>{
    const { state } = useLocation()
    const navigate = useNavigate()
    return(
        <>
            <Container>
                <Content>
                    <Main>
                        <h1>
                            {state.mail}
                        </h1>
                        <Button onClick={() => navigate('/')}>Voltar</Button>
                    </Main>
                </Content>
            </Container>
        </>
    )
}