import { AudioRecorder } from "../../components/AudioRecorder"
import { Title } from "../../components/Title/styles"
import { Container, Content } from "./styles"

export const Home = () =>{
    return(
        <>
            <Container>
                <Content>
                    <Title>Voice Memo</Title>
                    <AudioRecorder />
                </Content>
            </Container>
        </>
    )
}