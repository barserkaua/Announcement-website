import {Container, Row, Col} from "react-bootstrap";

function Footer () {
    return (
        <footer className="bg-dark text-white">
            <Container>
                <Row>
                    <Col className="text-center py-3">Copyright &copy; Announcement(test task)</Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer;